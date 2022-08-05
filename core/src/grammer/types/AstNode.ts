import { SourceRange } from './Range'

export interface AstNode {
  type: string
  location?: {
    uri: string
    range: SourceRange
  }
  children?: AstNode[]
  [K: string]: unknown
}
