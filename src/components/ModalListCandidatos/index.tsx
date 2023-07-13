import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {
  Tr,
  Td,
  TableContainer,
  Checkbox,
  HStack,
  Input,
  IconButton,
  Icon,
  ButtonGroup,
} from '@chakra-ui/react'
import BaseModal from 'components/Modal'
import TableBase from 'components/Table'
import { useState } from 'react'
import { fetcherUsersCandidato } from '../../services/queries/users'
import useSWR from 'swr'
import { IPropsModalListCandidatos } from './interfaces/modalListCandidatos'
import { useToastHook } from '../../hooks/useToast'
import Pagination from 'components/Pagination'
import AlertComponent from 'components/Alert'
import WrapFormInput from 'components/Form/WrapFormInput'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiRefreshCcw } from 'react-icons/fi'
import { useForm } from 'react-hook-form'

const ModalListCandidatos: ForwardRefRenderFunction<
  any,
  IPropsModalListCandidatos
> = ({ onClose, isOpen, uuidUser, uuidProva, linkUsersInProva }, ref) => {
  const [offset, setOffset] = useState<number>(0)
  const limit = 8
  const [search, setSearch] = useState<string>('')
  const {
    data,
    error,
    isLoading,
    mutate: mutateUsersCandidato,
  } = useSWR(
    uuidUser && uuidProva
      ? `users/${uuidUser}/${uuidProva}?offset=${offset}&limit=${limit}&search=${search}`
      : null,
    fetcherUsersCandidato
  )

  const { register, handleSubmit, resetField } = useForm<{ email: string }>()

  const refetchUsersCandidato = () => {
    mutateUsersCandidato()
  }

  useImperativeHandle(ref, refetchUsersCandidato)

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

  const sendSearch = (data: { email: string }) => {
    if (data.email) {
      setSearch(data.email)
    }
  }

  return (
    <BaseModal
      modalTitle={'Lista de Candidatos'}
      isOpen={isOpen}
      onClose={onClose}
      modalSize={'4xl'}
      linkUsers={sendUsersArr}
    >
      <HStack
        justifyContent={'flex-end'}
        mb={2}
        as={'form'}
        onSubmit={handleSubmit(sendSearch)}
      >
        <WrapFormInput>
          <Input
            type="email"
            placeholder="Insira o e-mail para pesquisar"
            {...register('email')}
          />
        </WrapFormInput>
        <ButtonGroup>
          <IconButton
            aria-label="Pesquisar"
            icon={<Icon as={AiOutlineSearch} />}
            colorScheme={'blue'}
            type="submit"
          />
          <IconButton
            aria-label="Restaurar"
            icon={<Icon as={FiRefreshCcw} />}
            colorScheme={'blue'}
            onClick={() => {
              resetField('email')
              setSearch('')
            }}
          />
        </ButtonGroup>
      </HStack>
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
