import E from 'fp-ts/Either'
import A from 'fp-ts/Array'
import { Address } from './Address'
import _ from 'lodash'

export type Token = {
  kind: string
  text: string
  location: {
    uri: string
    range: {
      start: Address
      end: Address
    }
  }
}

export class TokenDefinition {
  protected _kind: string | undefined
  protected _firstLetter: string | undefined
  protected _text: string[] = []
  protected _uri: string | undefined
  protected _start: Address | undefined
  protected _end: Address | undefined

  static Builder = class extends TokenDefinition {
    constructor(uri: string) {
      super()
      this._uri = uri
    }

    kind(kind: string) {
      this._kind = kind
    }

    firstLetter(char: string) {
      this._firstLetter = char
      this.appendChar(char)
    }

    appendChar(char: string) {
      if (this._firstLetter === undefined) {
        this._firstLetter = char
      }
      this._text.push(char)
    }

    address = (start: Address) => {
      this._start = start
      return (end: Address | ((start: Address) => Address)) => {
        const _start = this._start as Address
        this._end = typeof end === 'function' ? end(_start) : end
      }
    }

    build(): E.Either<string, Token> {
      const allMember = [this._kind, this._firstLetter, this._start, this._end]
      if (A.exists(_.isUndefined)(allMember)) {
        return E.left('Incomplete value setting')
      }
      return E.right({
        kind: this._kind as string,
        text: this._text.join(''),
        location: {
          uri: this._uri as string,
          range: {
            start: this._start as Address,
            end: this._end as Address,
          },
        },
      })
    }
  }
}
