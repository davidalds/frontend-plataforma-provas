import { ReactNode } from 'react'

type size = 'sm' | 'md' | 'lg' | '2xl' | '3xl' | '4xl'

interface IPropsBaseModal {
  isOpen: boolean
  onClose: () => void
  modalTitle: string
  children: ReactNode
  confirmAction?: () => void
  linkUsers?: () => void
  modalSize?: size
}

export type { IPropsBaseModal }
