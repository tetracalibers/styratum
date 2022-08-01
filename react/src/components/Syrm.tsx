import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  place: string
  props: unknown[]
}

const Syrm: FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default Syrm
