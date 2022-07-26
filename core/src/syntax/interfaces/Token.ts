export interface Token {
  kind: string
  text: string
  location: {
    uri: string
    range: {
      start: {
        line: number
        character: number
      }
      end: {
        line: number
        character: number
      }
    }
  }
  scope: string
}
