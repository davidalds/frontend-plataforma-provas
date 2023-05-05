import { ReactNode } from 'react'

interface IPropsBaseModal {
  isOpen: boolean
  onClose: () => void
  modalTitle: string
  children: ReactNode
  confirmAction?: () => void
}

export type { IPropsBaseModal }
