import { NonterminalNode, TerminalNode } from 'ohm-js'
import { dumpJson } from '../util/json'
import * as NS from './def/build/Syrm.ohm-bundle'
import { locationCalculator } from './helper/locationCalculator'
import { SyrmParser } from './types/SyrmParser'
import { Nodes } from './types/Nodes'

export const parseSyrm = (raw_syrm: string) => {
  const parser = {} as SyrmParser
  const getLocation = locationCalculator(raw_syrm)

  const excludingBoundary = (open: TerminalNode, close: TerminalNode) => {
    const startIdx = open.source.endIdx + 1
    const endIdx = close.source.startIdx - 1
    const range = getLocation(startIdx, endIdx).range
    return range
  }

  const BlockToAst = (
    open: TerminalNode,
    inner: NonterminalNode,
    close: TerminalNode
  ): Nodes => {
    return {
      type: inner.ctorName,
      location: {
        uri: '',
        range: excludingBoundary(open, close),
      },
      children: inner.children.map(child => child.ast),
    }
  }

  parser.grammar = NS.default.Syrm
  parser.semantics = parser.grammar.createSemantics()
  parser.semantics.addAttribute('ast', {
    CascadeBlock: (open, __, inner, ___, close) => {
      return BlockToAst(open, inner, close)
    },
    CollectionBlock: (open, __, inner, ___, close) => {
      return BlockToAst(open, inner, close)
    },
    Namespace: (___, _tagName, open, _, inner, __, close, __tagName, ____) => {
      return BlockToAst(open, inner, close)
    },
    RuleSet(slist, dblock) {
      const { startIdx, endIdx } = this.source
      const range = getLocation(startIdx, endIdx).range
      return {
        type: this.ctorName,
        selector: slist.ast,
        declarations: dblock.ast,
        location: {
          uri: '',
          range: range,
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
