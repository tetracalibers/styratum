import { SyrmGrammar, SyrmSemantics } from './def/build/Syrm.ohm-bundle'
import * as NS from './def/build/Syrm.ohm-bundle'

const parseSyrmRegions = (code: string) => {
  type Parser = {
    grammar: SyrmGrammar
    semantics: SyrmSemantics
  }
  const parser = {} as Parser
  parser.grammar = NS.default.Syrm
  parser.semantics = parser.grammar.createSemantics()
  parser.semantics.addOperation('regions', {
    Root: rs => rs.children.map(child => child.regions()),
    inner: rs => rs.children.map(child => child.inner()),
    Cascade: (_, __, inner, ___, ____) => {
      console.log(inner)
      return inner.children.map(child => {
        return { region: 'CASCADE', type: child.type, children: child.children }
      })
    },
    Collection: (_, __, inner, ___, ____) =>
      inner.children.map(child => {
        return {
          region: 'COLLECTION',
          type: child.type,
          children: child.children,
        }
      }),
  })
  const match = parser.grammar.match(code)
  return parser.semantics(match).regions()
}

export const parseSyrm = (raw_syrm: string) => {
  const regions = parseSyrmRegions(raw_syrm)
  return regions
}
