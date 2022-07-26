import { pipe } from 'fp-ts/lib/function'
import { DocumentStream } from './DocumentStream'

class Recorder {}

const tokenizer = (docStream: DocumentStream) => {
  docStream.take()
}
