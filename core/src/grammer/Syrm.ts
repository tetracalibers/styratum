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
  close: TerminalNode,
  type?: string
) => {
  const startIdx = open.source.endIdx + 1
  const endIdx = close.source.startIdx - 1
  const range = new Region(fullcode, startIdx, endIdx)
  return [
    {
      type: type ? type : inner.ctorName,
      location: {
        uri: '',
        range: range.position,
      },
      children: inner.children.map(child => child.ast),
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
    Namespace: (___, _tagName, open, _, inner, __, close, __tagName, ____) => {
      return BlockToAst(raw_syrm, open, inner, close)
    },
    RuleSet(slist, dblock) {
      const { startIdx, endIdx } = this.source
      const range = new Region(raw_syrm, startIdx, endIdx)
      return [
        {
          type: this.ctorName,
          selector: slist.ast,
          declarations: dblock.ast,
          location: {
            uri: '',
            range: range.position,
          },
        },
      ]
    },
    _iter(...children) {
      return children.map(child => child.ast)
    },
  })
  const match = parser.grammar.match(raw_syrm)
  return parser.semantics(match).ast
}
