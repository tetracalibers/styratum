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

const parseSyrmRegions = (code: string) => {
  type Parser = {
    grammar: NS.SyrmGrammar
    semantics: NS.SyrmSemantics
  }
  const parser = {} as Parser
  parser.grammar = NS.default.Syrm
  parser.semantics = parser.grammar.createSemantics()
  parser.semantics.addOperation('regions', {
    Root: rs => rs.children.map(child => child.regions()),
    Cascade: (open, __, _inner, ___, close) => {
      const region = new Region(
        code,
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
    Collection: (open, __, _inner, ___, close) => {
      const region = new Region(
        code,
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
  const match = parser.grammar.match(code)
  return parser.semantics(match).regions()
}

const parseSyrmCascadeInner = (code: string) => {
  type Parser = {
    grammer: NS.SyrmCascadeGrammar
    semantics: NS.SyrmCascadeSemantics
  }
  const parser = {} as Parser
  parser.grammer = NS.default.SyrmCascade
  parser.semantics = parser.grammer.createSemantics()
  parser.semantics.addOperation('blocks', {
    _terminal() {
      return [this.sourceString]
    },
    _iter(this, ...children) {
      return children.map(child => child.blocks())
    },
    kebabCase(_, __) {
      return [this.sourceString]
    },
    jsIdentifier(_, __) {
      return [this.sourceString]
    },
    numeralOnly(_) {
      return [this.sourceString]
    },
    PseudoClass(_, __) {
      return [this.sourceString]
    },
    Root: bs => bs.children.map(child => child.blocks()),
    Block: bs => {
      return bs.children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(bs.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    DeclarationsBlockWithPrefix: (p, b) => {
      const children = [p, b]
      return children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(child.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    DeclarationsBlock: (ss, _, ds, __) => {
      const children = [ss, ds]
      return children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(child.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    SelectorList: (s1, _, s2) => {
      const children = [s1, s2]
      return children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(child.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    Selector: (first, rest) => {
      const children = [first, rest]
      return children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(child.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    SelectorElem_edge: (c, s) => {
      const children = [c, s]
      return children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(child.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    Declaration: (pname, _, pvalue, __) => {
      const children = [pname, pvalue]
      return children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(child.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    propsFunc: (func, _, arg, __) => {
      const children = [func, arg]
      return children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(child.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    PropertyValueFunc: (name, _, fml1, __, fml2, ___) => {
      const children = [name, fml1, fml2]
      return children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(child.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    PseudoFunc_class: (p, _, a, __) => {
      const children = [p, a]
      return children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(child.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    nth_inject: (n, plus, props) => {
      const children = [n, plus, props]
      return children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(child.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    numeralWithUnit: (n, unit) => {
      const children = [n, unit]
      return children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(child.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    Formula_recursive: (e1, o, e2) => {
      const children = [e1, o, e2]
      return children.map(child => {
        const { contents, startIdx, endIdx } = child.source
        const range = new Region(child.sourceString, startIdx, endIdx)
        return {
          type: child.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: child.blocks(),
        }
      })
    },
    truthyKeyword(_at, _word, _, val, __) {
      const { contents, startIdx, endIdx } = this.source
      const range = new Region(this.sourceString, startIdx, endIdx)
      return [
        {
          type: this.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: val.blocks(),
        },
      ]
    },
    falsyKeyword(_at, _falsy, _, val, __) {
      const { contents, startIdx, endIdx } = this.source
      const range = new Region(this.sourceString, startIdx, endIdx)
      return [
        {
          type: this.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: val.blocks(),
        },
      ]
    },
    existKeyword(_at, _exist, _, val, __) {
      const { contents, startIdx, endIdx } = this.source
      const range = new Region(this.sourceString, startIdx, endIdx)
      return [
        {
          type: this.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
          children: val.blocks(),
        },
      ]
    },
    elseKeyword(_at, _else) {
      const { contents, startIdx, endIdx } = this.source
      const range = new Region(this.sourceString, startIdx, endIdx)
      return [
        {
          type: this.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
        },
      ]
    },
    collectionKeyword(_at, _collection) {
      const { contents, startIdx, endIdx } = this.source
      const range = new Region(this.sourceString, startIdx, endIdx)
      return [
        {
          type: this.ctorName,
          text: contents,
          location: {
            uri: '',
            range: range.position,
          },
        },
      ]
    },
  })
  const match = parser.grammer.match(code)
  return parser.semantics(match).blocks()
}

export const parseSyrm = (raw_syrm: string) => {
  const regions = parseSyrmRegions(raw_syrm)
  return regions.map((rs: Token[]) => {
    const [region] = rs
    if (region.type === 'CASCADE') {
      region.children = parseSyrmCascadeInner(region.text)
    }
    return region
  })
}
