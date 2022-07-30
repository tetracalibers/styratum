import { NonterminalNode, TerminalNode } from 'ohm-js'
import { dumpJson } from '../util/json'
import * as NS from './def/build/Syrm.ohm-bundle'
import { Position } from './helper/Position'
import { Region } from './helper/Region'

interface Range {
  start: Position
  end: Position
}

interface Node {
  type: string
  location: {
    uri: string
    range: Range
  }
  [K: string]: unknown
}

type Nodes = Node | Node[]

const BlockToAst = (
  fullcode: string,
  open: TerminalNode,
  inner: NonterminalNode,
  close: TerminalNode,
  type?: string
): Nodes => {
  const startIdx = open.source.endIdx + 1
  const endIdx = close.source.startIdx - 1
  const range = new Region(fullcode, startIdx, endIdx)
  return {
    type: type ? type : inner.ctorName,
    location: {
      uri: '',
      range: range.position as Range,
    },
    children: inner.children.map(child => child.ast),
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
      return {
        type: this.ctorName,
        selector: slist.ast,
        declarations: dblock.ast,
        location: {
          uri: '',
          range: range.position as Range,
        },
      }
    },
    _iter(...children) {
      return children.map(child => child.ast)
    },
  })
  const match = parser.grammar.match(raw_syrm)
  return parser.semantics(match).ast
}
