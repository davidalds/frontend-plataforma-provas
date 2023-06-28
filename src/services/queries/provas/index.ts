import api from '../../../services'

type ProvasData = {
  prova_id: number
  title: string
  description: string
  initial_date: Date
  end_date: Date
  uuid: string
  done: boolean
}

export type ProvaResponse = {
  provas: ProvasData[]
}

type ProvaScore = {
  provascore_id: number
  correct_questions: number
  score: number
}

type ProvaScoreResponse = {
  prova_title: string
  prova_score: number
  score: ProvaScore
  total_questions: number
  questions_answers: { option_id: number; option_letter: string }[]
}

type UsersProvaResponse = {
  users: {
    username: string
    email: string
    uuid: string
  }[]
}

type ProvaInfoResponse = {
  prova: {
    title: string
    description: string
    initial_date: Date
    end_date: Date
    total_score: number
    total_question: number
  }
}

const fetcherProvas = async (url: string): Promise<ProvaResponse> => {
  const res = await api.get(url)
  return res.data
}

const fetcherProvaScore = async (url: string): Promise<ProvaScoreResponse> => {
  const res = await api.get(url)
  return res.data
}

const fetcherUsersByProva = async (
  url: string
): Promise<UsersProvaResponse> => {
  const res = await api.get(url)
  return res.data
}

const fetcherProvaInfo = async (url: string): Promise<ProvaInfoResponse> => {
  const res = await api.get(url)
  return res.data
}

export {
  fetcherProvas,
  fetcherProvaScore,
  fetcherUsersByProva,
  fetcherProvaInfo,
}
