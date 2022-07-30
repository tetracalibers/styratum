import { SourceRange } from './Range'

export interface Node {
  type: string
  location: {
    uri: string
    range: SourceRange
  }
  [K: string]: unknown
}
