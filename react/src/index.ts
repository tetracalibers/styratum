import shell from 'shelljs'
import { parse } from '@babel/parser'
import { CodeGenerator } from '@babel/generator'
import { transformFileSync, transformSync } from '@babel/core'
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
const jsast = js?.ast
const jsmap = js?.map

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
console.log(
  '🚀 ~ file: index.ts ~ line 62 ~ syrmBlockStorage ~ syrmBlockStorage',
  syrmBlockStorage
)
