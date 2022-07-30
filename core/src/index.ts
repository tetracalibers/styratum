import shell from 'shelljs'
import { parseSyrm } from './grammer/Syrm'
import { dumpJson } from './util/json'

const { cat } = shell

const sampleCode = cat('src/sample-code/sampleC.syrm').toString()

const parseResult = parseSyrm(sampleCode)
dumpJson(parseResult)('tmp/syrmParseResult.json')
