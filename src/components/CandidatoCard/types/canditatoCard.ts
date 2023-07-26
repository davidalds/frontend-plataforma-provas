import { ReactElement } from 'react'

export interface IPropsCandidatoCard {
  username: string
  email: string
  action?: ReactElement
  done?: boolean
}
