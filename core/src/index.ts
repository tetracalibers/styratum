import { flashError } from './util/error'
import type { CssInJs } from '@syrm-dev/css-helper'
import _ from 'lodash'
import * as AryDiff from 'fast-array-diff'
import * as dot from 'dot-prop'
import * as charP from 'character-parser'
import { dumpJson, logJson, toJson } from './util/json'
import { stypSentence, jsxSentence } from './syntax/formatter/parseLogCleansing'
import { alphanumericId, numberId } from './util/id'
import * as prefixs from './syntax/config/prefix.json'

/* -------------------------------------------------------------------------- */

import * as EITHER from 'fp-ts/Either'
import * as ARRAY from 'fp-ts/Array'
import { match, P } from 'ts-pattern'

class Context {
  constructor() {
    this._pendings = [] as string[]
  }

  private _pendings
  public get pendings() {
    return this._pendings
  }

  public set pendings(value) {
    this._pendings = value
  }

  get recent() {
    return _.last(this._pendings)
  }

  waitResolve = (id: string) => (this._pendings = [...this._pendings, id])
  resolve = () => ARRAY.dropRight(1)(this._pendings)
}
class Pointor {
  constructor(traceSeq: StylePatch.Sentence[], pos = 0) {
    this._pos = pos
    this._traceSeq = traceSeq
  }

  private _pos
  public get pos() {
    return this._pos
  }

  public set pos(value) {
    this._pos = value
  }

  private _traceSeq
  public get traceSeq() {
    return this._traceSeq
  }

  public set traceSeq(value) {
    this._traceSeq = value
  }

  peek = (pos: number) => this._traceSeq[pos]
  traced = (_: void) => this.peek(this._pos)
  seek = (p: number) => new Pointor(this._traceSeq, p)
  next = (_: void) => this.seek(this._pos + 1)
}

class Walker {
  constructor(traceSeq: StylePatch.Sentence[]) {
    this._pointor = new Pointor(traceSeq)
    this._context = new Context()
  }

  private _pointor
  public get pointor() {
    return this._pointor
  }

  public set pointor(value) {
    this._pointor = value
  }

  private _context
  public get context() {
    return this._context
  }

  public set context(value) {
    this._context = value
  }
}

type CssBlock = [string, CssInJs]

// prettier-ignore
const cssBuilder =
  (prevState: [CssBlock[], Pointor]): [CssBlock[], Pointor] => {
    const [cssBlocks, currPointer] = prevState
    const [archive, [prevCss]] =
    cssBlocks.length > 0
      ? ARRAY.splitAt(cssBlocks.length - 1)(cssBlocks)
      : [[], [['&', {}] as CssBlock]]
    const [prevSelector, prevProperties] = prevCss
    const { classify, tokens } = currPointer.traced()
    const [name] = tokens
    const nextPointer = currPointer.next()
    return match(classify)
      .with('CSS_property', () => {
        const { tokens: valueTokens } = nextPointer.traced()
        const value = ARRAY.dropRight(1)(valueTokens).join(' ')
        const properties = dot.setProperty(prevProperties, name, value)
        return cssBuilder([[...archive, [prevSelector, properties]], nextPointer.next()])
      })
      .with('CSS_BEGIN_nesting', () => {
        const validSelectorName = name
          .replaceAll('__', '::')
          .replaceAll('_', ':')
          .replaceAll('_at_', '@')
          .replace(/^:/, '&:')
        return cssBuilder([[...cssBlocks, [validSelectorName, {}]], nextPointer])
      })
      .with('CSS_END_nesting', () => {
        return cssBuilder([cssBlocks, nextPointer])
      })
      .otherwise(() => [cssBlocks, nextPointer])
  }

const jsSetter = (prevState: [string, Pointor]): [string, Pointor] => {
  const [accumulator, pointor] = prevState
  const { classify, tokens } = pointor.traced()
  return match(classify)
    .with(P.union('BEGIN_tag', 'END_tag'), () => {
      return [accumulator, pointor] as [string, Pointor]
    })
    .otherwise(() => {
      const updatedAccumulator = [accumulator, tokens.join('')].join('')
      return jsSetter([updatedAccumulator, pointor.next()])
    })
}

type Tag = {
  name?: string
  className?: unknown[]
  props?: string
  styp?: CssBlock[]
  js?: string[]
}

const propsParser = (props: string[]) => {
  const classStartIdx = _.indexOf(props, 'className')
  const [beforeProps, sinceClassNameProps] = ARRAY.splitAt(classStartIdx)(props)
  // prettier-ignore
  const [_propName, _equal, _openingBracket, ...sinceClassNameValue] = sinceClassNameProps
  // prettier-ignore
  const classNameValue = charP.parseUntil(sinceClassNameValue.join(''), '}')
  const [, afterProps] = ARRAY.splitAt(classNameValue.end + 1)([
    ...sinceClassNameValue.join(''),
  ])
  const otherProps = [beforeProps.join(''), afterProps.join('')].join(' ')

  return [otherProps, classNameValue.src]
}
// prettier-ignore
const sentenceTraverser =
  (prevState: [Map<string, Tag>, Walker]): [Map<string, Tag>, Walker] => {
    const [archive, walkers] = prevState
    const { tokens, classify } = walkers.pointor.traced()
    const tagMeta = {} as Tag

    return match(classify)
      .with('BEGIN_tag', (): [Map<string, Tag>, Walker] => {
        const [_gourmet, tagName, ...rest] = tokens
        walkers.pointor = walkers.pointor.next()
        if (tagName === 'StylePatch') {
          return sentenceTraverser([new Map(), walkers])
        }
        dot.setProperty(tagMeta, 'name', tagName)
        if (rest.length > 1) {
          const props = ARRAY.dropRight(1)(rest)
          if (props.includes('className')) {
            const [otherProps, classNames] = propsParser(props)
            dot.setProperty(tagMeta, 'props', otherProps)
            dot.setProperty(tagMeta, 'className', classNames)
          }
        }
        if (walkers.pointor.traced().classify === 'BEGIN_css') {
          const cssStart = walkers.pointor.next()
          const [cssBlocks, nextPointorAfterCss] = cssBuilder([[], cssStart])
          dot.setProperty(tagMeta, 'styp', cssBlocks)
          walkers.pointor = nextPointorAfterCss
        }
        const id = prefixs.styp + alphanumericId()
        walkers.context.waitResolve(id)
        return sentenceTraverser([archive.set(id, tagMeta), walkers])
      })
      .with('END_tag', () => {
        const [_gourmet, _slash, tagName] = tokens
        walkers.pointor = walkers.pointor.next()
        if (tagName === 'StylePatch') {
          return [archive, walkers] as [Map<string, Tag>, Walker]
        }
        const openTagId = walkers.context.recent
        const openTag = archive.get(openTagId as string)
        if (openTag === undefined) {
          flashError('[Syntax Error] The start and end tags do not correspond.')
        }
        const thisId = `end_${openTagId}`
        walkers.context.resolve()
        return sentenceTraverser([archive.set(thisId, {
          name: openTag?.name
        }), walkers])
      })
      .with(P.when((t) => /^JS_/g.test(t as string)), () => {
        const [jsTokens, nextPointorAfterJs] = jsSetter(['', walkers.pointor])
        const id = prefixs.js + alphanumericId()
        walkers.pointor = nextPointorAfterJs
        dot.setProperty(tagMeta, 'js', jsTokens)
        return sentenceTraverser([archive.set(id, tagMeta), walkers])
      })
      .otherwise(() => [archive, walkers])
  }

const [result_styp] = sentenceTraverser([
  new Map() as Map<string, Tag>,
  new Walker(stypSentence),
])
console.log('🚀 ~ file: index.ts ~ line 206 ~ result_styp', result_styp)
const [result_jsx] = sentenceTraverser([
  new Map() as Map<string, Tag>,
  new Walker(jsxSentence),
])
console.log('🚀 ~ file: index.ts ~ line 211 ~ result_jsx', result_jsx)

/* -------------------------------------------------------------------------- */

// onst comparePredicate = (
// jsxRecord: StylePatch.ClassifyTokens,
// stypRecord: StylePatch.ClassifyTokens
// => {
// return jsxRecord.tokens.join('') === stypRecord.tokens.join('')
//
//
// onst diff = AryDiff.diff(jsxTokens, stypTokens, comparePredicate)
// umpJson(diff)('tmp/diff.json')

/* -------------------------------------------------------------------------- */
/*

const END_tag = (_node: AstNode) => {
  currentSelector = currentSelector.slice(-1)
  return undefined
}

const controller = (node: AstNode) => {
  const { classification } = node
  return match(classification)
    .with('BEGIN_stypFile', () => skip(node))
    .with('BEGIN_htmlTag', () => BEGIN_htmlTag(node))
    .with('BEGIN_css', () => skip(node))
    .with('CSS_property', () => CSS_property(node))
    .with('CSS_value', () => CSS_value(node))
    .with('BEGIN_nesting', () => skip(node))
    .with('END_nesting', () => skip(node))
    .with('END_css', () => skip(node))
    .with('END_tag', () => END_tag(node))
    .with('END_stypFile', () => skip(node))
    .otherwise(() => skip(node))
}

/* -------------------------------------------------------------------------- */

/**
const jsxRegexp = /<(StylePatch)>(?<jsx>.*?)<\/\1>/

const { cat } = shell

const oldSrc = cat(componentRootPath).toString()

const oldJsx = jsxRegexp.exec(oldSrc.replace(/\r?\n/g, ''))?.groups?.jsx

const newSrc =
  oldJsx !== undefined ? oldSrc.replace(_.trim(oldJsx), newJsx) : oldSrc

*/
// dumpJson(newSrc)(
//  componentRootPath.replace(
//    basename(componentRootPath),
//    'generated/' + basename(componentRootPath)
//  )
// )
