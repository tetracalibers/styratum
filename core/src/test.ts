import shell from 'shelljs'
import { parseSyrm } from './grammer/Syrm'
import { dumpJson } from '@syrm-dev/json-helper'

const { cat } = shell

const sampleCode = cat('src/sample-code/sampleC.syrm').toString()

const parseResult = parseSyrm('build')(sampleCode)
dumpJson(parseResult)('tmp/syrmParseResult.json')
