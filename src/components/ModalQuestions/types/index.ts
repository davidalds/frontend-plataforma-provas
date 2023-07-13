import { questionType } from '../../../types/questionTypes'

export interface IPropsModalQuestions {
  isOpen: boolean
  uuidProva: string
  uuidUser: string
  onClose(): void
  resetProvaInfo(): void
}

export type formModalQuestion = {
  questions: questionType[]
}
