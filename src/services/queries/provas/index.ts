import api from 'services'

type ProvasData = {
  prova_id: number
  title: string
  description: string
  initial_date: Date
  end_date: Date
  uuid: string
  done: boolean
}

type ProvaResponse = {
  provas: ProvasData[]
}

type ProvaScore = {
  provascore_id: number
  score: number
}

type ProvaScoreResponse = {
  score: ProvaScore
}

const fetcherProvas = async (url: string): Promise<ProvaResponse> => {
  const res = await api.get(url)
  return res.data
}

const fetcherProvaScore = async (url: string): Promise<ProvaScoreResponse> => {
  const res = await api.get(url)
  return res.data
}

export { fetcherProvas, fetcherProvaScore }
