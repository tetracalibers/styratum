import { DocumentStream } from './DocumentStream'

export abstract class Tokenizer {
  protected stream: DocumentStream
  protected uri: string
  protected accumulator: string[]

  constructor(text: string, uri: string) {
    this.stream = new DocumentStream(text)
    this.uri = uri
    this.accumulator = []
  }
}
