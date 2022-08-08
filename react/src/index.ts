import shell from 'shelljs'
import { parse } from '@babel/parser'
import { CodeGenerator } from '@babel/generator'
import { transformFileSync } from '@babel/core'
import _traverser from '@babel/traverse'
import * as t from '@babel/types'
import { dumpJson } from '@syrm-dev/json-helper'
import { parseSyrm, AstNode } from '@syrm/core'
import { dump } from './util/dump'
import { match } from 'ts-pattern'
import _ from 'lodash'

const { cat, ShellString } = shell

const syrmcode = cat('src/sample/Stack/Stack.syrm').toString()
const tsxcode = cat('src/sample/Stack/Stack.tsx').toString()

const syrmast = parseSyrm('build')(syrmcode)

const js = transformFileSync('src/sample/Stack/Stack.tsx', {
  presets: [
    ['@babel/preset-react', { development: true, runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  ast: true,
  sourceMaps: true,
})

const jscode = js?.code
const jsast = js?.ast as t.Node
const jsmap = js?.map

/**
  @see https://github.com/babel/babel/issues/13855
 */
const traverser = _traverser as typeof _traverser & { default: unknown }
const traverse = traverser.default as typeof _traverser

type SyrmOptionKey = 'place' | 'props'
type SyrmOptionValue<K extends SyrmOptionKey> = K extends 'place'
  ? string
  : K extends 'props'
  ? string[]
  : never
type SyrmOptionRecord = {
  [K in SyrmOptionKey]: SyrmOptionValue<K>
}

const getRootTagName = (jsxTagNames: string[]) => {
  return _.first(jsxTagNames)
}

const getSyrmOptions = (ast: t.Node) => {
  let jsxTagNames: string[] = []
  let jsxFilePath = ''
  let syrmOptions: SyrmOptionRecord = {
    place: '',
    props: [],
  }
  traverse(ast, {
    enter(path) {
      if (t.isIdentifier(path.node, { name: '_jsxFileName' })) {
        const parentNode = path.parentPath?.node
        if (t.isVariableDeclarator(parentNode)) {
          const init = parentNode.init as t.StringLiteral
          jsxFilePath = init.value
        }
      }

      if (
        t.isIdentifier(path.node, {
          name: '_jsxDEV',
        })
      ) {
        const parentNode = path.parentPath?.node
        if (!t.isCallExpression(parentNode)) {
          return
        }
        const args = parentNode.arguments
        const [tagNameArg, propsArg] = args

        // Syrmタグのpropsとして指定された情報取得
        if (t.isIdentifier(tagNameArg, { name: 'Syrm' })) {
          const syrmOptionArg = propsArg as t.ObjectExpression
          syrmOptions = syrmOptionArg.properties.reduce((prev, _property) => {
            const property = _property as t.ObjectProperty
            const keyNode = property.key as t.Identifier
            const key = keyNode.name
            return match(key)
              .with('place', () => {
                const valueNode = property.value as t.StringLiteral
                const value = valueNode.value
                prev.place = value
                return prev
              })
              .with('props', () => {
                const valueNode = property.value as t.ArrayExpression
                const value = valueNode.elements.map(_elemNode => {
                  const elemNode = _elemNode as t.Identifier
                  return elemNode.name
                })
                prev.props = value
                return prev
              })
              .otherwise(() => {
                return prev
              })
          }, syrmOptions)
        }

        // JSXタグ名の一覧取得
        if (t.isIdentifier(tagNameArg) && tagNameArg.name !== 'Syrm') {
          jsxTagNames = [...jsxTagNames, tagNameArg.name]
        }
        if (t.isStringLiteral(tagNameArg)) {
          jsxTagNames = [...jsxTagNames, tagNameArg.value]
        }
      }
    },
  })
  return {
    ...syrmOptions,
    root: getRootTagName(jsxTagNames),
    path: {
      jsx: jsxFilePath,
    },
  }
}

const options = getSyrmOptions(jsast)
console.log('🚀 ~ file: index.ts ~ line 131 ~ options', options)

//const ast = parse(jscode, {
//  sourceType: 'module',
//})
//
//const output = new CodeGenerator(ast, {}, jscode).generate().code

dumpJson(syrmast)('src/sample/Stack/tmp/syrmast.json')
dump(jscode as string)('src/sample/Stack/tmp/jscode.js')
dumpJson(jsast as object)('src/sample/Stack/tmp/jsast.json')
dumpJson(jsmap as object)('src/sample/Stack/tmp/jsmap.json')

import { get } from 'spectacles-ts'

interface SyrmBlockStorage {
  cascade: AstNode[]
  waiaria: AstNode[]
}

const syrmBlockStorage = syrmast.reduce(
  (prev: SyrmBlockStorage, curr: AstNode) => {
    return match(curr.type)
      .with('CascadeBlock', () => {
        prev['cascade'] = curr.children as AstNode[]
        return prev
      })
      .with('WaiariaBlock', () => {
        prev['waiaria'] = curr.children as AstNode[]
        return prev
      })
      .otherwise(() => {
        return prev
      })
  },
  {} as SyrmBlockStorage
)
