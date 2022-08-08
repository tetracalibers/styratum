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
import * as platformPath from 'path'

const { dirname } = platformPath
const { cat } = shell

/**
  @see https://github.com/babel/babel/issues/13855
 */
const traverser = _traverser as typeof _traverser & { default: unknown }
const traverse = traverser.default as typeof _traverser

const syrmcode = cat('src/sample/Stack/Stack.syrm').toString()
const syrmast = parseSyrm('build')(syrmcode)

const tsxpath = 'src/sample/Stack/Stack.tsx'

const jsreact = transformFileSync(tsxpath, {
  presets: ['@babel/preset-typescript'],
  ast: true,
})

const jsreactcode = jsreact?.code as string
const jsreactast = jsreact?.ast as t.File

type JSXChildren = t.JSXElement['children']

const getJsxCode = (jsreactAst: t.File) => {
  let isCloseTag = false
  const close = () => (isCloseTag = true)

  let jsxNodes: JSXChildren = []
  traverse(jsreactAst, {
    enter(path) {
      if (t.isJSXIdentifier(path.node, { name: 'Syrm' })) {
        if (isCloseTag) {
          return
        }
        const jsxElemNode = path.parentPath?.parent as t.JSXElement
        jsxNodes = jsxElemNode.children.filter(child => {
          if (t.isJSXText(child)) {
            const text = child.value
            return text.trim().length > 0
          }
          return true
        })
        close()
      }
    },
  })

  return jsxNodes.map(node => new CodeGenerator(node).generate().code).join('')
}

const jsxCode = getJsxCode(jsreactast)
console.log('🚀 ~ file: index.ts ~ line 47 ~ jsxCode', jsxCode)

const js = transformFileSync(tsxpath, {
  presets: [
    ['@babel/preset-react', { development: true, runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  ast: true,
  sourceMaps: true,
})

const jscode = js?.code
const jsast = js?.ast as t.File
const jsmap = js?.map

const getRootTagName = (jsxTagNames: string[]) => {
  return _.first(jsxTagNames)
}

const getSyrmOptions = (jsAst: t.File) => {
  let jsxTagNames: string[] = []
  let jsxFilePath = ''
  let syrmFilePath = ''
  let props: string[] = []
  traverse(jsAst, {
    enter(path) {
      if (t.isIdentifier(path.node, { name: '_jsxFileName' })) {
        const parentNode = path.parent
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
        const parentNode = path.parent
        if (!t.isCallExpression(parentNode)) {
          return
        }
        const args = parentNode.arguments
        const [tagNameArg, propsArg] = args

        // Syrmタグのpropsとして指定された情報取得
        if (t.isIdentifier(tagNameArg, { name: 'Syrm' })) {
          const syrmOptionArg = propsArg as t.ObjectExpression
          syrmOptionArg.properties.forEach(_property => {
            const property = _property as t.ObjectProperty
            const keyNode = property.key as t.Identifier
            const key = keyNode.name
            match(key)
              .with('place', () => {
                const valueNode = property.value as t.StringLiteral
                const relativePath = valueNode.value
                syrmFilePath = platformPath.resolve(
                  dirname(jsxFilePath),
                  relativePath
                )
              })
              .with('props', () => {
                const valueNode = property.value as t.ArrayExpression
                const value = valueNode.elements.map(_elemNode => {
                  const elemNode = _elemNode as t.Identifier
                  return elemNode.name
                })
                props = value
              })
              .otherwise(() => {
                return
              })
          })
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
    props,
    root: getRootTagName(jsxTagNames),
    path: {
      jsx: jsxFilePath,
      syrm: syrmFilePath,
    },
  }
}

const options = getSyrmOptions(jsast)

dumpJson(syrmast)('src/sample/Stack/tmp/syrmast.json')

dump(jsreactcode as string)('src/sample/Stack/tmp/jsreactcode.js')
dumpJson(jsreactast as object)('src/sample/Stack/tmp/jsreactast.json')

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
