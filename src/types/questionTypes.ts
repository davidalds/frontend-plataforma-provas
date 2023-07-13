type optionType = {
  option_id?: number
  option_title: string
  option_letter: string
  iscorrect: boolean
}

export type questionType = {
  question_id?: number
  question_title: string
  peso: number
  options: optionType[]
}
