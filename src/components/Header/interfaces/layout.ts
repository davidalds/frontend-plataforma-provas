import { ReactNode } from 'react'

interface IProps {
  title?: string
  subtitle?: string
  children: ReactNode
  hiddenHeader?: boolean
}

export type { IProps }
