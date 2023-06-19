import api from 'services'

type QuestionData = {
  question_id: number
  question_title: string
  peso: number
  options: {
    option_id: number
    option_title: string
    option_letter: string
  }[]
}

type QuestionDataFeedback = {
  question_id: number
  question_title: string
  peso: number
  options: {
    option_id: number
    option_title: string
    option_letter: string
    iscorrect: boolean
  }[]
}

type QuestionResponse = {
  prova_id: number
  prova_title: string
  questions: QuestionData[] | QuestionDataFeedback[]
}

const fetcherQuestions = async (url: string): Promise<QuestionResponse> => {
  const res = await api.get(url)
  return res.data
}

const fetcherQuestionsFeedback = async (
  url: string
): Promise<QuestionResponse> => {
  const res = await api.get(url)
  return res.data
}

export { fetcherQuestions, fetcherQuestionsFeedback }
