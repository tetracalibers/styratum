import { Address } from '../../classes/Address'
import { TokenDefinition } from '../../classes/Token'

/* ANYWHERE ----------------------------------------------------------------- */

const stringTokens = {
  /**
   * @example teststring
   */
  lower: {
    kind: 'STRING',
    text: /[a-z]+/g,
  },
  /**
   * @example TestString
   */
  capital: {
    kind: 'STRING',
    text: /([A-Z][a-z])+/g,
  },
  /**
   * @example testString
   */
  camel: {
    kind: 'STRING',
    text: /[a-z]+([A-Z][a-z])*/g,
  },
  /**
   * @example test-string
   */
  param: {
    kind: 'STRING',
    text: /[a-z]+([a-z]+-)*[a-z]+/g,
  },
  number: {
    kind: 'NUMBER',
    text: /[0-9]+([0-9]+)/g,
  },
}

/* SYRM ------------------------------------------------------------------- */

const syrmTokens = {
  BEGIN_cascade: {
    kind: 'SCOPE_BEGIN_DELIMITER',
    text: '<Cascade>',
    scope: {
      before: 'syrm',
      after: 'syrm.cascade',
    },
  },
  END_cascade: {
    kind: 'SCOPE_END_DELIMITER',
    text: '</Cascade>',
    scope: {
      before: 'syrm.cascade',
      after: 'syrm',
    },
  },
  BEGIN_structure: {
    kind: 'SCOPE_BEGIN_DELIMITER',
    text: '<Structure>',
    scope: {
      before: 'syrm',
      after: 'syrm.structure',
    },
  },
  END_structure: {
    kind: 'SCOPE_END_DELIMITER',
    text: '</Structure>',
    scope: {
      before: 'syrm.structure',
      after: 'syrm',
    },
  },
  BEGIN_inject: {
    kind: 'SCOPE_BEGIN_DELIMITER',
    text: '<Inject>',
    scope: {
      before: 'syrm',
      after: 'syrm.inject',
    },
  },
  END_inject: {
    kind: 'SCOPE_END_DELIMITER',
    text: '</Inject>',
    scope: {
      before: 'syrm.inject',
      after: 'syrm',
    },
  },
}

/* SYRM_CASCADE ------------------------------------------------------------- */

const syrmCascadeTokens = {
  /**
   * @context cascade_selector THIS
   */
  BEGIN_cascade_declarations: {
    kind: 'CASCADE__SCOPE_BEGIN_DELIMITER',
    text: '{',
    scope: {
      before: 'syrm.cascade',
      after: 'syrm.cascade.declarations',
    },
  },
  END_cascade_declarations: {
    kind: 'CASCADE__SCOPE_END_DELIMITER',
    text: '}',
    scope: {
      before: 'syrm.cascade.declarations',
      after: 'syrm.cascade',
    },
  },
  cascade_selector: {
    _root: {
      kind: 'CASCADE__SELECTOR',
      text: '&',
    },
    _universal: {
      kind: 'CASCADE__SELECTOR',
      text: '*',
    },
    _attribute: {
      kind: 'CASCADE__SELECTOR',
      text: ['[', stringTokens.param, '=', stringTokens.lower, ']'],
    },
  },
  /**
   * @context cascade_selector THIS cascade_selector
   */
  cascade_selector_combinator: {
    _delimiter: {
      kind: 'CASCADE__SELECTOR_DELIMITER',
      text: ',',
    },
    _adjacent_sibling: {
      kind: 'CASCADE__SELECTOR_COMBINATOR',
      text: '+',
    },
    _general_sibling: {
      kind: 'CASCADE__SELECTOR_COMBINATOR',
      text: '~',
    },
    _child: {
      kind: 'CASCADE__SELECTOR_COMBINATOR',
      text: '>',
    },
    _column: {
      kind: 'CASCADE__SELECTOR_COMBINATOR',
      text: '||',
    },
  },
  /**
   * @context cascade_selectorTHIS
   */
  cascade_selector_pseudo: {
    _active: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':active',
    },
    _any_link: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':any-link',
    },
    _checked: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':checked',
    },
    _default: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':default',
    },
    _disabled: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':dis_disabled:',
    },
    _empty: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':empty',
    },
    _enabled: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':enabled',
    },
    _first: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':first',
    },
    _first_child: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':first-child',
    },
    _first_of_type: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':first-of-type',
    },
    _fullscreen: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':fullscreen',
    },
    _future: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':future',
    },
    _focus: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':focus',
    },
    _focus_visible: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':focus-visible',
    },
    _focus_within: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':focus-within',
    },
    _hover: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':hover',
    },
    _indeterminate: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':indeterminate',
    },
    _in_range: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':in-range',
    },
    _invalid: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':invalid',
    },
    _last_child: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':last-child',
    },
    _last_of_type: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':last-of-type',
    },
    _link: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':link',
    },
    _only_child: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':only-child',
    },
    _only_of_type: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':only-of-type',
    },
    _optional: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':optional',
    },
    _out_of_range: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':out-of-range',
    },
    _read_only: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':read-only',
    },
    _read_write: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':read-write',
    },
    _required: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':required',
    },
    _scope: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':scope',
    },
    _target: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':target',
    },
    _valid: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':valid',
    },
    _visited: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: ':visited',
    },
    _after: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: '::after',
    },
    _backdrop: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: '::backdrop',
    },
    _before: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: '::before',
    },
    _first_letter: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: '::first-letter',
    },
    _first_line: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: '::first-line',
    },
    _marker: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: '::marker',
    },
    _placeholder: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: '::placeholder',
    },
    _selection: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: '::selection',
    },
  },
  cascade_selector_pseudo_func: {
    _dir: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: [':dir(', 'ltr' || 'rtl', ')'],
    },
    _lang: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: [':lang(', stringTokens.param, ')'],
    },
    _not: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      text: [
        ':not(',
        // TODO selector listを定義
        'selector list',
        ')',
      ],
    },
    _nth_child: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      // TODO 本当はnumberじゃなくてnth
      text: [':nth-child(', stringTokens.number, ')'],
    },
    _nth_last_child: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      // TODO 本当はnumberじゃなくてnth
      text: [':nth-last-child(', stringTokens.number, ')'],
    },
    _nth_last_of_type: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      // TODO 本当はnumberじゃなくてnth
      text: [':nth-last-of-type(', stringTokens.number, ')'],
    },
    _nth_of_type: {
      kind: 'CASCADE__SELECTOR_PSEUDO',
      // TODO 本当はnumberじゃなくてnth
      text: [':nth-of-type(', stringTokens.number, ')'],
    },
  },
}
