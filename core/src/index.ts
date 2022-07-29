import shell from 'shelljs'
import { parseSyrm } from './grammer/Syrm'

const { cat } = shell

const sampleCode = cat('src/sample-code/sampleC.syrm').toString()

const parseResult = parseSyrm(sampleCode)
//console.log('🚀 ~ file: index.ts ~ line 9 ~ parseResult', parseResult)
