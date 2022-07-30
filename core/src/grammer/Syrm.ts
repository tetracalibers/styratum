import { NonterminalNode, TerminalNode } from 'ohm-js'
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

const BlockToAst = (
  fullcode: string,
  open: TerminalNode,
  inner: NonterminalNode,
  close: TerminalNode
) => {
  const startIdx = open.source.endIdx + 1
  const endIdx = close.source.startIdx - 1
  const range = new Region(fullcode, startIdx, endIdx)
  return [
    {
      type: inner.ctorName,
      text: range.source,
      location: {
        uri: '',
        range: range.position,
      },
    },
  ]
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
    CascadeBlock: (open, __, inner, ___, close) => {
      return BlockToAst(raw_syrm, open, inner, close)
    },
    CollectionBlock: (open, __, inner, ___, close) => {
      return BlockToAst(raw_syrm, open, inner, close)
    },
  })
  const match = parser.grammar.match(raw_syrm)
  return parser.semantics(match).ast
}
