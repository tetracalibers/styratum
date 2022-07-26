import E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { match } from 'ts-pattern'
import { isBoundaryChar, peelOffWrapString } from '../../../util/regexp'
import { Address } from '../../classes/Address'
import { Token } from '../../classes/Token'
import { DocumentStream } from './DocumentStream'

class Recorder {}

abstract class Tokenizer {
  protected stream: DocumentStream
  protected uri: string
  protected accumulator: string[]

  constructor(text: string, uri: string) {
    this.stream = new DocumentStream(text)
    this.uri = uri
    this.accumulator = []
  }

  protected tokenBuilder =
    (start: Address) =>
    (kind: string, text: string, end: Address): Token => {
      return {
        kind,
        text,
        location: {
          uri: this.uri,
          range: {
            start,
            end,
          },
        },
      }
    }

  //tokenBuilder () {
  //  const { char, address } = this._stream.take()
  //
  //  return match(char)
  //    .with('<', () => {
  //
  //    })
  //}
}

class SyrmTokenizer extends Tokenizer {
  private openAngleBracket(startAddress: Address) {
    const builder = this.tokenBuilder(startAddress)
    const nextCharE = this.stream.peek()

    const onRight = (nextCharE: E.Right<string>) => {
      const nextChar = peelOffWrapString(nextCharE)
      if (isBoundaryChar(nextChar)) {
        return builder('operator', '<', startAddress)
      }
      return match(nextChar).with('/', () => {
        return builder(
          'punctuation.closeTagBegin',
          '</',
          startAddress.next(nextChar)
        )
      })
    }

    const onLeft = () => {
      return builder('operator', '<', startAddress)
    }

    return E.isRight(nextCharE) ? onRight(nextCharE) : onLeft()
  }
}
