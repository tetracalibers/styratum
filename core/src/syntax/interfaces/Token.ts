import E from 'fp-ts/Either'

export interface Address {
  line: number
  character: number
}

export type AddressE = E.Either<string, Address>

export interface Token {
  kind: string
  text: string
  location: {
    uri: string
    range: {
      start: Address
      end: Address
    }
  }
  scope: string
}
