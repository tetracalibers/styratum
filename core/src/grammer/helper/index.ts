import ohm from 'ohm-js'
import { toAST } from 'ohm-js/extras'
import { Region } from './Region'

export const makeParser = (code: string) => {
  const grammer = ohm.grammar(code)

  const parser = (source: string, rule: string, _uri: string) => {
    const match = grammer.match(source, rule)
    if (match.failed()) {
      throw new SyntaxError(match.message)
    }
    return match
  }

  return parser
}

export const cstToAst = (
  match: ohm.MatchResult,
  bindings: { [key: string | symbol]: Function }
) => {
  const visitor = Reflect.ownKeys(bindings)
    .map(x => {
      const args = Array.from({ length: bindings[x].length }, (_, i) => `$${i}`)
      const fn = new Function(
        'fn',
        `return function (${args.join(', ')}) { return fn(this, ${args.join(
          ', '
        )}) }`
      )((ctx: { source: any; args: { mapping: any } }, ...args: any[]) => {
        const meta = {
          children: args.map(x => new Region(x.source, '')),
          source: new Region(ctx.source, ''),
        }
        return bindings[x].call(
          meta,
          ...args.map(x => x.toAST(ctx.args.mapping))
        )
      })
      return {
        [x]: fn,
      }
    })
    .reduce((a, b) => Object.assign(a, b), {})

  return toAST(match, visitor)
}
