import { ReactNode } from 'react'
import { IconType } from 'react-icons'

interface IPropsBaseCard {
  cardTitle: string
  children: ReactNode
  cardButtonLink?: string
  cardButtonTitle?: string
  cardButtonIcon?: IconType
}

export type { IPropsBaseCard }
