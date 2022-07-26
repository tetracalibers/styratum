import E from 'fp-ts/Either'
import A from 'fp-ts/Array'
import { Address } from './Address'
import _ from 'lodash'
import { isNewlineChar } from '../../util/regexp'

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

/*

@usage
  new People.Builder("Tom", 12).hobby("BaseBall").build().hello();

*/
export class TokenDefinition {
  protected _kind: string | undefined
  protected _firstLetter: string | undefined
  protected _text: string[] = []
  protected _uri: string | undefined
  protected _start: Address | undefined
  protected _end: Address | undefined

  private static _Builder = class extends TokenDefinition {
    constructor() {
      super()
    }

    uri(uri: string) {
      this._uri = uri
      return this
    }

    kind(kind: string) {
      this._kind = kind
      return this
    }

    firstLetter(char: string) {
      this._firstLetter = char
      this.appendChar(char)
      this._end = this._start
      return this
    }

    appendChar(char: string) {
      if (_.isUndefined(this._firstLetter)) {
        this._firstLetter = char
      }
      if (!_.isUndefined(this._start)) {
        this._end = this._start.getNext(char)
      }
      this._text.push(char)
      return this
    }

    start(address: Address) {
      this._start = address
      return this
    }

    build(): Token {
      return {
        kind: this._kind as string,
        text: this._text.join(''),
        location: {
          uri: this._uri as string,
          range: {
            start: this._start as Address,
            end: this._end as Address,
          },
        },
      }
    }
  }

  static Builder = new this._Builder()
}
