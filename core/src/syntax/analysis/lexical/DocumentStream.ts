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
  private _address: Address

  constructor(text: string) {
    this._buffer = [...text]
    this._address = new Address()
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
        this._address.sameLineNext()
        return this.takeAndSkip()
      })
      .with('\n', () => {
        this._address.newLineNext()
        return this.takeAndSkip()
      })
      .with(P.union(' ', '\t'), () => {
        this._address.sameLineNext()
        return this.takeAndSkip()
      })
      .otherwise(() => {
        this._address.sameLineNext()
        return {
          char,
          address: E.right(this._address),
        }
      })
  }
}
