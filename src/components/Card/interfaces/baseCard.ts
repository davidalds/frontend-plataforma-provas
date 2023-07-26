import { ReactElement, ReactNode } from 'react'
import { IconType } from 'react-icons'

interface IPropsBaseCard {
  cardTitle: string
  children: ReactNode
  buttons: ReactElement | ReactElement[]
}

export type { IPropsBaseCard }
