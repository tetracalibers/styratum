// AUTOGENERATED FILE
// This file was generated from Syrm.ohm by `ohm generateBundles`.

import {
  ActionDict,
  Grammar,
  IterationNode,
  Namespace,
  Node,
  NonterminalNode,
  Semantics,
  TerminalNode
} from 'ohm-js';

export interface SkipTokenActionDict<T> extends ActionDict<T> {
  Root?: (this: NonterminalNode, arg0: TerminalNode) => T;
  space?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  comment?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  multiLineComment?: (this: NonterminalNode, arg0: TerminalNode, arg1: IterationNode, arg2: TerminalNode) => T;
  singleLineComment?: (this: NonterminalNode, arg0: TerminalNode, arg1: IterationNode) => T;
  whitespace_verticalTab?: (this: NonterminalNode, arg0: TerminalNode) => T;
  whitespace_formFeed?: (this: NonterminalNode, arg0: TerminalNode) => T;
  whitespace_noBreakSpace?: (this: NonterminalNode, arg0: TerminalNode) => T;
  whitespace_byteOrderMark?: (this: NonterminalNode, arg0: TerminalNode) => T;
  whitespace?: (this: NonterminalNode, arg0: NonterminalNode | TerminalNode) => T;
  lineTerminator?: (this: NonterminalNode, arg0: TerminalNode) => T;
  lineTerminatorSequence?: (this: NonterminalNode, arg0: TerminalNode) => T;
  unicodeSpaceSeparator?: (this: NonterminalNode, arg0: TerminalNode) => T;
}

export interface SkipTokenSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: SkipTokenActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: SkipTokenActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: SkipTokenActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: SkipTokenActionDict<T>): this;
}

export interface SkipTokenGrammar extends Grammar {
  createSemantics(): SkipTokenSemantics;
  extendSemantics(superSemantics: SkipTokenSemantics): SkipTokenSemantics;
}

export interface AtomicActionDict<T> extends SkipTokenActionDict<T> {
  atomic?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  pureAtomic?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  addedAtomic?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  generatedNumber?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  props?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: TerminalNode) => T;
  number_negative?: (this: NonterminalNode, arg0: TerminalNode, arg1: IterationNode) => T;
  number_positive?: (this: NonterminalNode, arg0: IterationNode) => T;
  number?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  unit?: (this: NonterminalNode, arg0: NonterminalNode | TerminalNode) => T;
  operator?: (this: NonterminalNode, arg0: TerminalNode) => T;
  string?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  lowerCase?: (this: NonterminalNode, arg0: IterationNode) => T;
  kebabCase?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode) => T;
  pascalCase?: (this: NonterminalNode, arg0: IterationNode, arg1: IterationNode) => T;
  camelCase?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode) => T;
  jsIdentifier?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode) => T;
}

export interface AtomicSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: AtomicActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: AtomicActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: AtomicActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: AtomicActionDict<T>): this;
}

export interface AtomicGrammar extends Grammar {
  createSemantics(): AtomicSemantics;
  extendSemantics(superSemantics: AtomicSemantics): AtomicSemantics;
}

export interface PrimitiveActionDict<T> extends AtomicActionDict<T> {
  Formula?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  FormulaElements_number?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  FormulaElements_expression?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  FormulaElements?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  AtomicFormula?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  numeral?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  numeralWithUnit?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
}

export interface PrimitiveSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: PrimitiveActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: PrimitiveActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: PrimitiveActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: PrimitiveActionDict<T>): this;
}

export interface PrimitiveGrammar extends Grammar {
  createSemantics(): PrimitiveSemantics;
  extendSemantics(superSemantics: PrimitiveSemantics): PrimitiveSemantics;
}

export interface SyrmedCssInterfaceActionDict<T> extends PrimitiveActionDict<T> {
  pureAtomic?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  addedAtomic?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  SelectorList?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode, arg2: IterationNode) => T;
  Selector?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode) => T;
  SelectorElem_edge?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  SelectorElem_node?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  SelectorElem?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  AtomicSelector_composite?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  AtomicSelector_basic?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  AtomicSelector_omission?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  AtomicSelector?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  basicSelector?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  attributeSelector?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode, arg3: NonterminalNode, arg4: TerminalNode) => T;
  tagSelector?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  htmlTagSelector?: (this: NonterminalNode, arg0: NonterminalNode, arg1: IterationNode) => T;
  jsxTagSelector?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  constantSelector?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  rootSelector?: (this: NonterminalNode, arg0: TerminalNode) => T;
  universalSelector?: (this: NonterminalNode, arg0: TerminalNode) => T;
  PseudoSelector?: (this: NonterminalNode, arg0: IterationNode) => T;
  Pseudo_element?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: IterationNode, arg3: IterationNode, arg4: IterationNode) => T;
  Pseudo_class?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: IterationNode, arg3: IterationNode, arg4: IterationNode) => T;
  Pseudo?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  PseudoArg?: (this: NonterminalNode, arg0: IterationNode | NonterminalNode) => T;
  nth?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: NonterminalNode) => T;
  combinator?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  adjacentSiblijngCombinator?: (this: NonterminalNode, arg0: TerminalNode) => T;
  generalSiblijngCombinator?: (this: NonterminalNode, arg0: TerminalNode) => T;
  childCombinator?: (this: NonterminalNode, arg0: TerminalNode) => T;
  columnCombinator?: (this: NonterminalNode, arg0: TerminalNode) => T;
  PropertyName?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  collectionKeyword?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode) => T;
  PropertyValue?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  PropertyValueFunc?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: NonterminalNode, arg3: IterationNode, arg4: IterationNode, arg5: TerminalNode) => T;
}

export interface SyrmedCssInterfaceSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: SyrmedCssInterfaceActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: SyrmedCssInterfaceActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: SyrmedCssInterfaceActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: SyrmedCssInterfaceActionDict<T>): this;
}

export interface SyrmedCssInterfaceGrammar extends Grammar {
  createSemantics(): SyrmedCssInterfaceSemantics;
  extendSemantics(superSemantics: SyrmedCssInterfaceSemantics): SyrmedCssInterfaceSemantics;
}

export interface DeclarationBlockActionDict<T> extends SyrmedCssInterfaceActionDict<T> {
  DeclarationBlock?: (this: NonterminalNode, arg0: TerminalNode, arg1: NonterminalNode, arg2: TerminalNode) => T;
  DeclarationList?: (this: NonterminalNode, arg0: IterationNode) => T;
  Declaration?: (this: NonterminalNode, arg0: NonterminalNode, arg1: TerminalNode, arg2: IterationNode, arg3: TerminalNode) => T;
}

export interface DeclarationBlockSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: DeclarationBlockActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: DeclarationBlockActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: DeclarationBlockActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: DeclarationBlockActionDict<T>): this;
}

export interface DeclarationBlockGrammar extends Grammar {
  createSemantics(): DeclarationBlockSemantics;
  extendSemantics(superSemantics: DeclarationBlockSemantics): DeclarationBlockSemantics;
}

export interface RuleSetActionDict<T> extends DeclarationBlockActionDict<T> {
  RuleSet?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
}

export interface RuleSetSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: RuleSetActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: RuleSetActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: RuleSetActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: RuleSetActionDict<T>): this;
}

export interface RuleSetGrammar extends Grammar {
  createSemantics(): RuleSetSemantics;
  extendSemantics(superSemantics: RuleSetSemantics): RuleSetSemantics;
}

export interface RuleSetStatementActionDict<T> extends RuleSetActionDict<T> {
  pureAtomic?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  addedAtomic?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  RuleSetStatement_invert?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode, arg3: NonterminalNode) => T;
  RuleSetStatement_if_else?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode, arg2: NonterminalNode, arg3: NonterminalNode) => T;
  RuleSetStatement_if?: (this: NonterminalNode, arg0: NonterminalNode, arg1: NonterminalNode) => T;
  RuleSetStatement?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  ifAnnotation?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  truthy?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: TerminalNode, arg3: NonterminalNode, arg4: TerminalNode) => T;
  falsy?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: TerminalNode, arg3: NonterminalNode, arg4: TerminalNode) => T;
  exist?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode, arg2: TerminalNode, arg3: NonterminalNode, arg4: TerminalNode) => T;
  else?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode) => T;
  invert?: (this: NonterminalNode, arg0: TerminalNode, arg1: TerminalNode) => T;
}

export interface RuleSetStatementSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: RuleSetStatementActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: RuleSetStatementActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: RuleSetStatementActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: RuleSetStatementActionDict<T>): this;
}

export interface RuleSetStatementGrammar extends Grammar {
  createSemantics(): RuleSetStatementSemantics;
  extendSemantics(superSemantics: RuleSetStatementSemantics): RuleSetStatementSemantics;
}

export interface SyrmedCssActionDict<T> extends RuleSetStatementActionDict<T> {
  SyrmedCss?: (this: NonterminalNode, arg0: IterationNode) => T;
}

export interface SyrmedCssSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: SyrmedCssActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: SyrmedCssActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: SyrmedCssActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: SyrmedCssActionDict<T>): this;
}

export interface SyrmedCssGrammar extends Grammar {
  createSemantics(): SyrmedCssSemantics;
  extendSemantics(superSemantics: SyrmedCssSemantics): SyrmedCssSemantics;
}

export interface RegionsActionDict<T> extends SyrmedCssActionDict<T> {
  CascadeRegion?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  CollectionRegion?: (this: NonterminalNode, arg0: IterationNode) => T;
  Namespace?: (this: NonterminalNode, arg0: TerminalNode, arg1: Node, arg2: TerminalNode, arg3: IterationNode, arg4: NonterminalNode, arg5: IterationNode, arg6: TerminalNode, arg7: Node, arg8: TerminalNode) => T;
}

export interface RegionsSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: RegionsActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: RegionsActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: RegionsActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: RegionsActionDict<T>): this;
}

export interface RegionsGrammar extends Grammar {
  createSemantics(): RegionsSemantics;
  extendSemantics(superSemantics: RegionsSemantics): RegionsSemantics;
}

export interface SyrmActionDict<T> extends RegionsActionDict<T> {
  Root?: (this: NonterminalNode, arg0: IterationNode) => T;
  Block?: (this: NonterminalNode, arg0: NonterminalNode) => T;
  CascadeBlock?: (this: NonterminalNode, arg0: TerminalNode, arg1: IterationNode, arg2: NonterminalNode, arg3: IterationNode, arg4: TerminalNode) => T;
  CollectionBlock?: (this: NonterminalNode, arg0: TerminalNode, arg1: IterationNode, arg2: NonterminalNode, arg3: IterationNode, arg4: TerminalNode) => T;
}

export interface SyrmSemantics extends Semantics {
  addOperation<T>(name: string, actionDict: SyrmActionDict<T>): this;
  extendOperation<T>(name: string, actionDict: SyrmActionDict<T>): this;
  addAttribute<T>(name: string, actionDict: SyrmActionDict<T>): this;
  extendAttribute<T>(name: string, actionDict: SyrmActionDict<T>): this;
}

export interface SyrmGrammar extends Grammar {
  createSemantics(): SyrmSemantics;
  extendSemantics(superSemantics: SyrmSemantics): SyrmSemantics;
}

declare const ns: {
  SkipToken: SkipTokenGrammar;
  Atomic: AtomicGrammar;
  Primitive: PrimitiveGrammar;
  SyrmedCssInterface: SyrmedCssInterfaceGrammar;
  DeclarationBlock: DeclarationBlockGrammar;
  RuleSet: RuleSetGrammar;
  RuleSetStatement: RuleSetStatementGrammar;
  SyrmedCss: SyrmedCssGrammar;
  Regions: RegionsGrammar;
  Syrm: SyrmGrammar;
};
export default ns;

