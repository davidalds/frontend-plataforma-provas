import { ReactElement } from 'react'

export interface IPropsErrorsAlert {
  errorTitle?: string
  error: any
  children: ReactElement | ReactElement[]
}
