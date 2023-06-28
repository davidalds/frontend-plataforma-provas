import api from '../../../services'

export type UsersCandidatoResponse = {
  users: {
    username: string
    email: string
    uuid: string
  }[]
  total_users: number
}

const fetcherUsersCandidato = async (
  url: string
): Promise<UsersCandidatoResponse> => {
  const res = await api.get(url)
  return res.data
}

export { fetcherUsersCandidato }
