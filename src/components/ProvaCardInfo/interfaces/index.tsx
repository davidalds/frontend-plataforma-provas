import { ReactElement, ReactNode } from 'react'

interface ProvaCardInfoContent {
  heading: string
  text: string
}

export interface IProvaCardInfo {
  cardTitle: string
  button?: ReactElement
  children: ReactElement[]
}
