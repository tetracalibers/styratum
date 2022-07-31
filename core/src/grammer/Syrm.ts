import { NonterminalNode, TerminalNode } from 'ohm-js'
import { dumpJson } from '../util/json'
import * as NS from './def/build/Syrm.ohm-bundle'
import { locationCalculator } from './helper/locationCalculator'
import { SyrmParser } from './types/SyrmParser'
import { AstSubTree } from './types/Nodes'
import { AstNode } from './types/AstNode'

console.time('parseSyrm')
export const parseSyrm = (raw_syrm: string) => {
  const parser = {} as SyrmParser
  const getLocation = locationCalculator(raw_syrm)

  const SHOW_LOCATION = false

  const astNodeWithLocation = (node: AstNode) => {
    return (startIdx: number, endIdx: number): AstSubTree => {
      if (SHOW_LOCATION) {
        node.location = {
          uri: '',
          range: getLocation(startIdx, endIdx).range,
        }
      }
      return node as AstSubTree
    }
  }

  const excludingBoundary = (open: TerminalNode, close: TerminalNode) => {
    const startIdx = open.source.endIdx + 1
    const endIdx = close.source.startIdx - 1
    return [startIdx, endIdx]
  }

  const BlockToAst = (
    block: NonterminalNode,
    open: TerminalNode,
    inner: NonterminalNode,
    close: TerminalNode
  ): AstSubTree => {
    const [startIdx, endIdx] = excludingBoundary(open, close)
    return astNodeWithLocation({
      type: block.ctorName,
      children: inner.children.map(child => child.ast),
    })(startIdx, endIdx)
  }

  const ifToAst = (node: NonterminalNode, propVariable: NonterminalNode) => {
    const { startIdx, endIdx } = node.source
    return astNodeWithLocation({
      type: node.ctorName,
      props: propVariable.source.contents,
    })(startIdx, endIdx)
  }

  const listToAst = (children: NonterminalNode[]): AstSubTree => {
    return children.map(child => child.ast)
  }

  const atomToAst = (node: TerminalNode): AstSubTree => {
    const { contents, startIdx, endIdx } = node.source
    return astNodeWithLocation({
      type: node.ctorName,
      text: contents,
    })(startIdx, endIdx)
  }

  parser.grammar = NS.default.Syrm
  parser.semantics = parser.grammar.createSemantics()
  parser.semantics.addAttribute('ast', {
    CascadeBlock(open, __, inner, ___, close) {
      return BlockToAst(this, open, inner, close)
    },
    CollectionBlock(open, __, inner, ___, close) {
      return BlockToAst(this, open, inner, close)
    },
    Namespace(___, tagName, open, _, inner, __, close, __tagName, ____) {
      const [startIdx, endIdx] = excludingBoundary(open, close)
      return astNodeWithLocation({
        type: this.ctorName,
        name: tagName.source.contents,
        children: inner.children.map(child => child.ast),
      })(startIdx, endIdx)
    },
    RuleSetStatement_if(pre, rules) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        if: pre.ast,
        ifThen: rules.ast,
      })(startIdx, endIdx)
    },
    RuleSetStatement_if_else(pre, rule1, _mid, rule2) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        if: pre.ast,
        ifThen: rule1.ast,
        elseThen: rule2.ast,
      })(startIdx, endIdx)
    },
    RuleSetStatement_invert(pre, rule1, rule2, _suf) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        if: pre.ast,
        rule1: rule1.ast,
        rule2: rule2.ast,
      })(startIdx, endIdx)
    },
    RuleSet(slist, dblock) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        selector: slist.ast,
        declarations: dblock.ast,
      })(startIdx, endIdx)
    },
    DeclarationBlock: (_, list, __) => {
      return listToAst(list.children)
    },
    Declaration(name, _, value, __) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        property: name.ast,
        values: value.children.map(child => child.ast),
      })(startIdx, endIdx)
    },
    SelectorList: (first, _, rest) => {
      return listToAst([first, ...rest.children])
    },
    Selector_composite(first, rest) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        selector: first.ast,
        relation: rest.ast,
      })(startIdx, endIdx)
    },
    RelationalSelector_specified(comb, selec) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        combinator: comb.ast,
        to: selec.ast,
      })(startIdx, endIdx)
    },
    AtomicSelector(selec) {
      const { startIdx, endIdx } = this.source
      const kind = selec.ctorName
      const selector = (selec: NonterminalNode) => {
        if (kind === 'basicSelector') {
          return selec.source.contents
        } else {
          return selec.ast
        }
      }
      return astNodeWithLocation({
        type: kind,
        selector: selector(selec),
      })(startIdx, endIdx)
    },
    PropertyValueFunc(name, _, firstArg, __, restArg, ___) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        name: name.source.contents,
        args: listToAst([firstArg, ...restArg.children]),
      })(startIdx, endIdx)
    },
    Pseudo_class(_, pseudo, __, arg, ___) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: pseudo.ctorName,
        name: pseudo.source.contents,
        args: arg.ast,
      })(startIdx, endIdx)
    },
    nth(_n, _plus, val) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        nPlus: val.ast,
      })(startIdx, endIdx)
    },
    Formula_expression(term, apply) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        left: term.ast,
        right: apply.ast,
      })(startIdx, endIdx)
    },
    Apply(ope, term) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        left: ope.ast,
        right: term.ast,
      })(startIdx, endIdx)
    },
    numeralWithUnit(num, unit) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        number: num.ast,
        unit: unit.source.contents,
      })(startIdx, endIdx)
    },
    generatedNumber(num) {
      return num.ast
    },
    number(num) {
      return atomToAst(num)
    },
    props(_props, _, value, ___) {
      const { startIdx, endIdx } = this.source
      return astNodeWithLocation({
        type: this.ctorName,
        value: value.source.contents,
      })(startIdx, endIdx)
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
    operator(_ope) {
      return atomToAst(this)
    },
    kebabCase(_, __) {
      return atomToAst(this)
    },
    pascalCase(_, __) {
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
console.timeEnd('parseSyrm')
