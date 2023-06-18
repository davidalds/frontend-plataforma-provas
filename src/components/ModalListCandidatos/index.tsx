import {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from 'react'
import { Tr, Td, TableContainer, Checkbox } from '@chakra-ui/react'
import BaseModal from 'components/Modal'
import TableBase from 'components/Table'
import { useState } from 'react'
import { fetcherUsersCandidato } from 'services/queries/users'
import useSWR from 'swr'
import { IPropsModalListCandidatos } from './interfaces/modalListCandidatos'
import { useToastHook } from 'hooks/useToast'
import Pagination from 'components/Pagination'
import AlertComponent from 'components/Alert'

const ModalListCandidatos: ForwardRefRenderFunction<
  any,
  IPropsModalListCandidatos
> = ({ onClose, isOpen, uuidUser, uuidProva, linkUsersInProva }, ref) => {
  const [offset, setOffset] = useState<number>(0)
  const limit = 8

  const {
    data,
    error,
    isLoading,
    mutate: mutateUsersCandidato,
  } = useSWR(
    uuidUser && uuidProva
      ? `users/${uuidUser}/${uuidProva}?offset=${offset}&limit=${limit}`
      : null,
    fetcherUsersCandidato
  )

  useImperativeHandle(ref, mutateUsersCandidato)

  const [uuidUsers, setUuidUsers] = useState<string[]>([])

  const toast = useToastHook()

  const handleCheckUsers = (uuid: string) => {
    let arr = uuidUsers

    if (arr.includes(uuid)) {
      arr = arr.filter((value) => value !== uuid)
    } else {
      arr.push(uuid)
    }

    setUuidUsers(arr)
  }

  const clearUsersArr = () => {
    setUuidUsers([])
  }

  const sendUsersArr = () => {
    if (!uuidUsers.length) {
      toast({
        status: 'error',
        title: 'Selecione um ou mais usuários para vincular',
      })
      return
    }

    linkUsersInProva(uuidUsers).then(() => {
      mutateUsersCandidato()
      clearUsersArr()
      onClose()
    })
  }

  return (
    <BaseModal
      modalTitle={'Lista de Candidatos'}
      isOpen={isOpen}
      onClose={onClose}
      modalSize={'4xl'}
      linkUsers={sendUsersArr}
    >
      <TableContainer overflowY={'auto'} maxH={'400px'} minH={'400px'}>
        {data?.users.length === 0 && !error ? (
          <AlertComponent
            title={'Não existem candidatos para serem vinculados'}
            statusType={'info'}
          />
        ) : (
          <TableBase headers={['Selecione', 'Nome de Usuário', 'E-mail']}>
            {data?.users.map(({ username, email, uuid }) => (
              <Tr key={uuid}>
                <Td>
                  <Checkbox
                    defaultChecked={uuidUsers.includes(uuid)}
                    colorScheme={'blue'}
                    onChange={() => handleCheckUsers(uuid)}
                  />
                </Td>
                <Td>{username}</Td>
                <Td>{email}</Td>
              </Tr>
            ))}
          </TableBase>
        )}
      </TableContainer>
      {data?.total_users ? (
        <Pagination
          totalDataElements={data?.total_users}
          limitPerPage={limit}
          totalShowedButtonsInPagination={4}
          offsetFc={setOffset}
        />
      ) : (
        <></>
      )}
    </BaseModal>
  )
}

export default forwardRef(ModalListCandidatos)
