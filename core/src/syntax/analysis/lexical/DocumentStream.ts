import E from 'fp-ts/Either'
import { match, P } from 'ts-pattern'
import { AddressE } from '../../interfaces/Token'

interface CharAddress {
  char: string
  address: AddressE
}

export class DocumentStream {
  private _buffer: string[]
  private _uri: string
  private _line: number
  private _posInline: number

  constructor(text: string, uri: string) {
    this._buffer = [...text]
    this._line = 0
    this._posInline = 0
    this._uri = uri
  }

  public get buffer(): string[] {
    return this._buffer
  }

  public get uri(): string {
    return this._uri
  }

  public get line(): number {
    return this._line
  }

  public get posInline(): number {
    return this._posInline
  }

  public take(): CharAddress {
    if (this._buffer.length === 0) {
      return {
        char: '',
        address: E.left('beyond the EOF.'),
      }
    }
    const [char, ...rest] = this._buffer
    this._buffer = rest
    return match(char)
      .with('\r', () => {
        return this.take()
      })
      .with('\n', () => {
        ++this._line
        this._posInline = 0
        return this.take()
      })
      .with(P.union(' ', '\t'), () => {
        ++this._posInline
        return this.take()
      })
      .otherwise(() => {
        ++this._posInline
        return {
          char,
          address: E.right({
            line: this._line,
            character: this._posInline,
          }),
        }
      })
  }
}
