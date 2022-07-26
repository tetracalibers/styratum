import E from 'fp-ts/Either'

type stringE = string | E.Right<string>

export const peelOffWrapString = (stringE: stringE) => {
  return typeof stringE === 'string' ? stringE : stringE.right
}

export const isBoundaryChar = (charE: stringE) => {
  const char = peelOffWrapString(charE)
  return /[\s\r\n\t]/.test(char)
}

export const isNewlineChar = (charE: string | E.Right<string>) => {
  const char = peelOffWrapString(charE)
  return /[\r\n]/.test(char)
}
