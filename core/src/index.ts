import { lexer } from './syntax/lexer/common/Lexer'
import shell from 'shelljs'
import { dumpJson } from './util/json'
import jsTokens from 'js-tokens'

const { cat } = shell

const source = cat('./src/test-data/Card.syrm').toString()
const tokens = Array.from(jsTokens(source, { jsx: true }))
console.log('🚀 ~ file: index.ts ~ line 10 ~ tokens', tokens)

dumpJson(tokens)('tmp/card-syrm.json')
