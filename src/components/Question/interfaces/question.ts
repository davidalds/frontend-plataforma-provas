type Options = {
  option_id: number
  option_title: string
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
  addOption: (e: Option) => void
}

export type { IPropsQuestion }
