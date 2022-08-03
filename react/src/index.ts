import shell from 'shelljs'
import babelParser from '@babel/parser'

const { cat } = shell

const code = cat('src/sample/Stack/Stack.tsx').toString()

const result = babelParser.parse(code, {
  plugins: ['jsx', 'typescript'],
  sourceType: 'module',
})
console.log('🚀 ~ file: index.ts ~ line 12 ~ result', result)
