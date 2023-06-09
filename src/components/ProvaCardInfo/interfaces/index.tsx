import { ReactElement } from 'react'

export interface IProvaCardInfo {
  cardTitle: string
  button?: ReactElement
  children: ReactElement | ReactElement[]
}
