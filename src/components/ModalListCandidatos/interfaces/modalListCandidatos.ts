import { UsersCandidatoResponse } from 'services/queries/users'
import { KeyedMutator } from 'swr'

export interface IPropsModalListCandidatos {
  isOpen: boolean
  onClose: () => void
  uuidUser: string
  uuidProva: string
  linkUsersInProva: (uuidUsersArr: string[]) => Promise<any>
}
