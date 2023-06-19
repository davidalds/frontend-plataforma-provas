type Options = {
  option_id: number
  option_title: string
  option_letter: string
  iscorrect?: boolean
}

type Option = {
  option_question_id: number
  option_id: number
}

interface IPropsQuestion {
  ind: number
  idQuestion: number
  title: string
  peso: number
  options: Options[]
  addOption?: (e: Option) => void
  isFeedback?: boolean
}

export type { IPropsQuestion }
