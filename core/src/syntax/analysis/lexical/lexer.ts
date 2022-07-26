import E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { match, P } from 'ts-pattern'
import { isBoundaryChar, peelOffWrapString } from '../../../util/regexp'
import { Address } from '../../classes/Address'
import { Token, TokenDefinition } from '../../classes/Token'
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
}

class SyrmTokenizer extends Tokenizer {
  private openAngleBracket(startAddress: Address) {
    const builder = TokenDefinition.Builder.uri(this.uri)
      .firstLetter('<')
      .start(startAddress)
    const nextCharE = this.stream.peek()

    if (E.isLeft(nextCharE)) {
      return builder.kind('operator').build()
    }

    const nextChar = nextCharE.right
    // prettier-ignore
    return match(nextChar)
      .with(P.when(c => isBoundaryChar(c as string)),() => {
        return builder.kind('operator').build()
      })
      .with('/', () => {
        this.stream.takeAndSkip()
        return builder
          .kind('punctuation.closeTagBegin')
          .appendChar(nextChar)
          .build()
      })
      .otherwise(() => {
        return builder.kind('punctuation.openTagBegin').build()
      })
  }
}
