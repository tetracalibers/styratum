import shell from 'shelljs'
import { parse } from '@babel/parser'
import { CodeGenerator } from '@babel/generator'
import { transformFileSync, transformSync } from '@babel/core'
import _traverser from '@babel/traverse'
import * as t from '@babel/types'
import { dumpJson } from '@syrm-dev/json-helper'
import { parseSyrm, AstNode } from '@syrm/core'
import { dump } from './util/dump'
import { match } from 'ts-pattern'

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
  @bug https://github.com/babel/babel/issues/13855
 */
const traverser = _traverser as typeof _traverser & { default: unknown }
const traverse = traverser.default as typeof _traverser

traverse(jsast, {
  enter(path) {
    if (
      t.callExpression(
        {
          type: 'Identifier',
          name: '_jsxDEV',
        },
        [
          {
            type: 'Identifier',
            name: 'Syrm',
          },
        ]
      )
    ) {
      console.log(path.node)
    }
  },
})

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
import { Traverse } from 'fp-ts/lib/Traversable'

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
console.log(
  '🚀 ~ file: index.ts ~ line 62 ~ syrmBlockStorage ~ syrmBlockStorage',
  syrmBlockStorage
)
