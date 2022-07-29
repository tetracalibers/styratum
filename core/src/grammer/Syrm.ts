import * as NS from './def/build/Syrm.ohm-bundle'
import { Offset } from './helper/Offset'
import { Region } from './helper/Region'

interface Token {
  type: string
  text: string
  children: unknown[]
  location: {
    uri: string
    range: Offset
  }
}

const parseSyrmRegions = (code: string) => {
  type Parser = {
    grammar: NS.SyrmGrammar
    semantics: NS.SyrmSemantics
  }
  const parser = {} as Parser
  parser.grammar = NS.default.Syrm
  parser.semantics = parser.grammar.createSemantics()
  parser.semantics.addOperation('regions', {
    Root: rs => rs.children.map(child => child.regions()),
    inner: rs => rs.children.map(child => child.inner()),
    Cascade: (_, __, inner, ___, ____) => {
      return inner.children.map(child => {
        const { startIdx, endIdx } = child.source
        const region = new Region(code, startIdx, endIdx)
        return {
          type: 'CASCADE',
          text: region.source,
          children: child.children,
          location: {
            uri: '',
            range: region.position,
          },
        }
      })
    },
    Collection: (_, __, inner, ___, ____) =>
      inner.children.map(child => {
        const { startIdx, endIdx } = child.source
        const region = new Region(code, startIdx, endIdx)
        return {
          type: 'COLLECTION',
          text: region.source,
          children: child.children,
          location: {
            uri: '',
            range: region.position,
          },
        }
      }),
  })
  const match = parser.grammar.match(code)
  return parser.semantics(match).regions()
}

const parseSyrmCascadeInner = (code: string) => {
  type Parser = {
    grammer: NS.SyrmCascadeGrammar
    semantics: NS.SyrmCascadeSemantics
  }
  const parser = {} as Parser
  parser.grammer = NS.default.SyrmCascade
  parser.semantics = parser.grammer.createSemantics()
  parser.semantics.addOperation('blocks', {})
  const match = parser.grammer.match(code)
  return parser.semantics(match).blocks()
}

export const parseSyrm = (raw_syrm: string) => {
  const regions = parseSyrmRegions(raw_syrm)
  return regions.map((region: Token) => {
    if (region.type === 'CASCADE') return parseSyrmCascadeInner(region.text)
    return region
  })
}
