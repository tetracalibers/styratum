import shell from 'shelljs'
import babelParser from '@babel/parser'
import { dumpJson } from '@syrm-dev/json-helper'

const { cat } = shell

const code = cat('src/sample/Stack/Stack.tsx').toString()

const result = babelParser.parse(code, {
  plugins: ['jsx', 'typescript'],
  sourceType: 'module',
})
dumpJson(result)('tmp/babel-parse.json')
