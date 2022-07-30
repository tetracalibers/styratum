import { dumpJson } from '../util/json'
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

export const parseSyrm = (raw_syrm: string) => {
  type Parser = {
    grammar: NS.SyrmGrammar
    semantics: NS.SyrmSemantics
  }
  const parser = {} as Parser
  parser.grammar = NS.default.Syrm
  parser.semantics = parser.grammar.createSemantics()
  parser.semantics.addAttribute('ast', {
    Root: rs => rs.children.map(child => child.ast),
    CascadeBlock: (open, __, _inner, ___, close) => {
      const region = new Region(
        raw_syrm,
        open.source.endIdx + 1,
        close.source.startIdx - 1
      ) as Region
      return [
        {
          type: 'CASCADE',
          text: region.source,
          location: {
            uri: '',
            range: region.position,
          },
        },
      ]
    },
    CollectionBlock: (open, __, _inner, ___, close) => {
      const region = new Region(
        raw_syrm,
        open.source.endIdx + 1,
        close.source.startIdx - 1
      )
      return [
        {
          type: 'COLLECTION',
          text: region.source,
          location: {
            uri: '',
            range: region.position,
          },
        },
      ]
    },
  })
  const match = parser.grammar.match(raw_syrm)
  return parser.semantics(match).ast
}
