type option = {
  title: string
  iscorrect: string
  option_letter: string
}

export type question = {
  title: string
  peso: number
  options: option[]
}

export type createProvaForm = {
  title: string
  description: string
  initial_date: Date
  end_date: Date
  questions: question[]
  timer: number
}
