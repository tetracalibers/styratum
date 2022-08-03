import shell from 'shelljs'
import { parse } from '@babel/parser'
import { CodeGenerator } from '@babel/generator'
import { transformFileSync, transformSync } from '@babel/core'
import { dumpJson } from '@syrm-dev/json-helper'
import { dump } from './util/dump'

const { cat, ShellString } = shell

const tsxcode = cat('src/sample/Stack/Stack.tsx').toString()

const js = transformFileSync('src/sample/Stack/Stack.tsx', {
  presets: [
    ['@babel/preset-react', { development: true }],
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

dump(jscode as string)('tmp/jscode.js')
dumpJson(jsast as object)('tmp/jsast.json')
dumpJson(jsmap as object)('tmp/jsmap.json')
