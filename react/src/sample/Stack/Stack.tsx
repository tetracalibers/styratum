import { FC, ReactNode, HTMLAttributes } from 'react'
import Syrm from '../../components/Syrm'

type DivProps = HTMLAttributes<HTMLDivElement>

type Props = {
  children: ReactNode
  space: string
  recursive: boolean
  separateFrom?: number
  isList: boolean
} & DivProps

const Balloon: FC<Props> = ({
  children,
  space = '1.7rem',
  recursive = false,
  separateFrom,
  isList = false,
  ...divProps
}) => {
  return (
    <Syrm place='./Stack.syrm' props={[space, recursive, separateFrom, isList]}>
      <div {...divProps}>{children}</div>
    </Syrm>
  )
}

export default Balloon
