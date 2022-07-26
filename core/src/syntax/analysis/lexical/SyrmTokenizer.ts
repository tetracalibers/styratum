import E from 'fp-ts/Either'
import { match, P } from 'ts-pattern'
import { isBoundaryChar } from '../../../util/regexp'
import { Address } from '../../classes/Address'
import { TokenDefinition } from '../../classes/Token'
import { Tokenizer } from './Tokenizer'

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
      .with(P.when(c => isBoundaryChar(c as string)), () => {
        return builder.kind('operator').build();
      })
      .with('/', () => {
        this.stream.takeAndSkip();
        return builder
          .kind('punctuation.closeTagBegin')
          .appendChar(nextChar)
          .build();
      })
      .otherwise(() => {
        return builder.kind('punctuation.openTagBegin').build();
      });
  }
}
