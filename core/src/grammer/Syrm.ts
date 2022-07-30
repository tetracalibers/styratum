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

  const ifToAst = (node: NonterminalNode, propVariable: NonterminalNode) => {
    const { startIdx, endIdx } = node.source
    return {
      type: node.ctorName,
      props: propVariable.source.contents,
      location: {
        uri: '',
        range: getLocation(startIdx, endIdx).range,
      },
    }
  }

  const listToAst = (children: NonterminalNode[]): Nodes => {
    return children.map(child => child.ast)
  }

  const atomToAst = (node: TerminalNode): Nodes => {
    const { contents, startIdx, endIdx } = node.source
    return {
      type: node.ctorName,
      text: contents,
      location: {
        uri: '',
        range: getLocation(startIdx, endIdx).range,
      },
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
    RuleSetStatement_if(pre, rules) {
      const { startIdx, endIdx } = this.source
      return {
        type: this.ctorName,
        if: pre.ast,
        ifThen: rules.ast,
        location: {
          uri: '',
          range: getLocation(startIdx, endIdx).range,
        },
      }
    },
    RuleSetStatement_if_else(pre, rule1, _mid, rule2) {
      const { startIdx, endIdx } = this.source
      return {
        type: this.ctorName,
        if: pre.ast,
        ifThen: rule1.ast,
        elseThen: rule2.ast,
        location: {
          uri: '',
          range: getLocation(startIdx, endIdx).range,
        },
      }
    },
    RuleSetStatement_invert(pre, rule1, rule2, _suf) {
      const { startIdx, endIdx } = this.source
      return {
        type: this.ctorName,
        if: pre.ast,
        rule1: rule1.ast,
        rule2: rule2.ast,
        location: {
          uri: '',
          range: getLocation(startIdx, endIdx).range,
        },
      }
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
    DeclarationBlock: (_, list, __) => {
      return listToAst(list.children)
    },
    Declaration(name, _, value, __) {
      const { startIdx, endIdx } = this.source
      return {
        type: this.ctorName,
        property: name.ast,
        value: value.ast,
        location: {
          uri: '',
          range: getLocation(startIdx, endIdx).range,
        },
      }
    },
    SelectorList: (first, _, rest) => {
      return listToAst([first, rest])
    },
    Selector(first, rest) {
      return listToAst([first, rest])
    },
    SelectorElem_edge(comb, selec) {
      return listToAst([comb, selec])
    },
    PropertyValueFunc(name, _, firstArg, __, restArg, ___) {
      const { startIdx, endIdx } = this.source
      return {
        type: this.ctorName,
        name: name.source.contents,
        args: listToAst([firstArg, restArg]),
        location: {
          uri: '',
          range: getLocation(startIdx, endIdx).range,
        },
      }
    },
    Pseudo_class(_, pseudo, __, arg, ___) {
      const { startIdx, endIdx } = this.source
      return {
        type: pseudo.ctorName,
        name: pseudo.source.contents,
        args: arg.ast,
        location: {
          uri: '',
          range: getLocation(startIdx, endIdx).range,
        },
      }
    },
    nth(_n, _plus, val) {
      const { startIdx, endIdx } = this.source
      return {
        type: this.ctorName,
        nPlus: val.ast,
        location: {
          uri: '',
          range: getLocation(startIdx, endIdx).range,
        },
      }
    },
    Formula(first, ope, rest) {
      return listToAst([first, ope, rest])
    },
    numeralWithUnit(num, unit) {
      const { startIdx, endIdx } = this.source
      return {
        type: this.ctorName,
        number: num.ast,
        unit: unit.source.contents,
        location: {
          uri: '',
          range: getLocation(startIdx, endIdx).range,
        },
      }
    },
    props(_props, _, value, ___) {
      const { startIdx, endIdx } = this.source
      return {
        type: this.ctorName,
        value: value.source.contents,
        location: {
          uri: '',
          range: getLocation(startIdx, endIdx).range,
        },
      }
    },
    exist(_at, _exist, _, variable, __) {
      return ifToAst(this, variable)
    },
    truthy(_at, _truthy, _, variable, __) {
      return ifToAst(this, variable)
    },
    falsy(_at, _falsy, _, variable, __) {
      return ifToAst(this, variable)
    },
    number_negative(_, __) {
      return atomToAst(this)
    },
    kebabCase(_, __) {
      return atomToAst(this)
    },
    collectionKeyword(_, __) {
      return atomToAst(this)
    },
    _iter(...children) {
      return listToAst(children)
    },
    _terminal() {
      return atomToAst(this)
    },
  })
  const match = parser.grammar.match(raw_syrm)
  return parser.semantics(match).ast
}
