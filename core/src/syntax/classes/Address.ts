import E from 'fp-ts/Either'
import { isNewlineChar } from '../../util/regexp'

export class Address {
  private _line: number
  private _character: number

  public get line(): number {
    return this._line
  }
  public get character(): number {
    return this._character
  }

  constructor(line = 0, character = 0) {
    this._line = line
    this._character = character
  }

  next(nextChar: string) {
    if (isNewlineChar(nextChar)) {
      return new Address(this._line + 1, 0)
    }
    return new Address(this._line, this._character + 1)
  }
}

export type AddressE = E.Either<string, Address>
