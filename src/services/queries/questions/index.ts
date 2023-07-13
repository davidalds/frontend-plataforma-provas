import api from '../../../services'

interface Question {
  question_id: number
  question_title: string
  peso: number
}

interface QuestionData extends Question {
  options: {
    option_id: number
    option_title: string
    option_letter: string
    iscorrect?: boolean
  }[]
}

interface QuestionDataFeedback extends Question {
  options: {
    option_id: number
    option_title: string
    option_letter: string
    iscorrect: boolean
  }[]
  option_answered_id: number
}

type QuestionResponse = {
  prova_id: number
  prova_title: string
  questions: QuestionData[]
}

type QuestionResponseFeedback = {
  prova_id: number
  prova_title: string
  questions: QuestionDataFeedback[]
}

const fetcherQuestions = async (url: string): Promise<QuestionResponse> => {
  const res = await api.get(url)
  return res.data
}

const fetcherQuestionsFeedback = async (
  url: string
): Promise<QuestionResponseFeedback> => {
  const res = await api.get(url)
  return res.data
}

export { fetcherQuestions, fetcherQuestionsFeedback }
