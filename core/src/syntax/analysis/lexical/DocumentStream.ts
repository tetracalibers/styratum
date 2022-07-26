import E from 'fp-ts/Either'
import { match, P } from 'ts-pattern'
import { isInvalid } from '../../../util/conditions'
import { Address, AddressE } from '../../classes/Address'

interface CharAddress {
  char: string
  address: AddressE
}

export class DocumentStream {
  private _buffer: string[]
  private _line: number
  private _posInline: number

  constructor(text: string) {
    this._buffer = [...text]
    this._line = 0
    this._posInline = 0
  }

  public peek() {
    const [, nextChar] = this._buffer
    return isInvalid(nextChar)
      ? E.left('EOF already reached')
      : E.right(nextChar)
  }

  public takeAndSkip(): CharAddress {
    if (this._buffer.length === 0) {
      return {
        char: '',
        address: E.left('EOF already reached'),
      }
    }
    const [char, ...rest] = this._buffer
    this._buffer = rest
    return match(char)
      .with('\r', () => {
        return this.takeAndSkip()
      })
      .with('\n', () => {
        ++this._line
        this._posInline = 0
        return this.takeAndSkip()
      })
      .with(P.union(' ', '\t'), () => {
        ++this._posInline
        return this.takeAndSkip()
      })
      .otherwise(() => {
        ++this._posInline
        return {
          char,
          address: E.right(new Address(this._line, this._posInline)),
        }
      })
  }
}
