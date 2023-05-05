import { ReactNode } from 'react'

interface IPropsBaseCard {
  cardTitle: string
  children: ReactNode
  cardButtonLink: string
  cardButtonTitle: string
}

export type { IPropsBaseCard }
