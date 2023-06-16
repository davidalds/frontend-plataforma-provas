import { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

type cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type sizes = 'sm' | 'md' | 'lg'

interface IPropsWrapInputs {
  children: ReactNode
  cols: cols[]
}

interface IPropsFormInput {
  label?: string
  children: ReactNode
  errors?: FieldError
  isReadOnly?: boolean
}

interface IPropsHeadingForm {
  size?: sizes
  children: ReactNode
}

export type { IPropsWrapInputs, IPropsFormInput, IPropsHeadingForm }
