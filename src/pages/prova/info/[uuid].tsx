import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import WrapFormInput from 'components/Form/WrapFormInput'
import WrapInputs from 'components/Form/WrapInputs'
import Layout from 'components/Layout'
import ModalListCandidatos from 'components/ModalListCandidatos'
import { useToastHook } from 'hooks/useToast'
import RequireAuth from 'context/RequireAuth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineMinus } from 'react-icons/ai'
import { IoIosAdd } from 'react-icons/io'
import api from 'services'
import { fetcherProvaInfo, fetcherUsersByProva } from 'services/queries/provas'
import { UsersCandidatoResponse } from 'services/queries/users'
import useSWR, { KeyedMutator } from 'swr'
import { useForm } from 'react-hook-form'
import { FormProvaInfo } from 'types/provaInfoTypes'
import { AiOutlineOrderedList } from 'react-icons/ai'
import HeaderProvaInfo from 'components/HeaderProvaInfo'
import CandidatoCard from 'components/CandidatoCard'

type ModalRefType = {
  mutateListUsersCandidato: KeyedMutator<UsersCandidatoResponse>
}

const ProvaInfo = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [uuidProva, setUuidProva] = useState<string>()
  const {
    data,
    error,
    isLoading,
    mutate: mutateUsersByProva,
  } = useSWR(
    session ? `provas/link/${session.user.uuid}/${router.query.uuid}` : null,
    fetcherUsersByProva
  )

  const {
    data: dataProvaInfo,
    error: errorProvaInfo,
    isLoading: isLoadingProvaInfo,
  } = useSWR(uuidProva ? `prova/${router.query.uuid}` : null, fetcherProvaInfo)

  const { register, setValue } = useForm<FormProvaInfo>()

  const toast = useToastHook()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const modalRef = useRef<ModalRefType>(null)

  const linkUsersInProva = async (uuidUsersArr: string[]) => {
    try {
      if (session) {
        const obj = {
          link_users_uuid: uuidUsersArr,
          link_prova_uuid: router.query.uuid,
        }

        await api.post(`provas/link/${session.user.uuid}`, obj)

        mutateUsersByProva()

        toast({
          status: 'success',
          title: 'Candidatos vinculados com sucesso',
        })

        return Promise.resolve()
      }
    } catch (error) {
      console.log(error)
      return Promise.reject()
    }
  }

  const deslinkUsersInProva = async (uuidDeslinkUser: string) => {
    try {
      if (session) {
        await api.delete(
          `provas/deslink/${session.user.uuid}/${router.query.uuid}/${uuidDeslinkUser}`
        )

        toast({
          status: 'success',
          title: 'Candidato desvinculado com sucesso',
        })

        mutateUsersByProva()
        modalRef.current?.mutateListUsersCandidato()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router) {
      if (typeof router.query.uuid === 'string') {
        setUuidProva(router.query.uuid)
      }
    }
  }, [router])

  useEffect(() => {
    if (dataProvaInfo) {
      Object.entries(dataProvaInfo.prova).forEach(([key, value]) => {
        setValue(key as any, value)
      })
    }
  }, [dataProvaInfo, setValue])

  return (
    <>
      <RequireAuth>
        {router && session ? (
          <ModalListCandidatos
            ref={modalRef}
            uuidUser={session?.user.uuid}
            uuidProva={router.query.uuid as string}
            isOpen={isOpen}
            onClose={onClose}
            linkUsersInProva={linkUsersInProva}
          />
        ) : (
          <></>
        )}
        <Layout title="Prova info">
          <Grid
            p={4}
            minH={'100vh'}
            gap={4}
            templateColumns={{ sm: '1fr', md: '3fr 2fr' }}
          >
            <GridItem
              boxShadow={'lg'}
              p={4}
              display={'flex'}
              flexDir={'column'}
            >
              <HeaderProvaInfo
                title={'Informações da Prova'}
                buttonIcon={AiOutlineOrderedList}
                buttonTitle={'Visualizar Questões'}
                onClickFunction={() => false}
              />
              <VStack
                mt={4}
                spacing={4}
                as={'form'}
                flex={1}
                justifyContent={'center'}
              >
                <WrapInputs cols={[1]}>
                  <WrapFormInput label="Título da prova" isReadOnly>
                    <Input
                      type="text"
                      variant={'flushed'}
                      {...register('title')}
                    />
                  </WrapFormInput>
                </WrapInputs>
                <WrapInputs cols={[1]}>
                  <WrapFormInput label="Descrição da prova" isReadOnly>
                    <Input
                      type="text"
                      variant={'flushed'}
                      {...register('description')}
                    />
                  </WrapFormInput>
                </WrapInputs>
                <WrapInputs cols={[1, 2]}>
                  <WrapFormInput label="Data inicial" isReadOnly>
                    <Input
                      type="text"
                      variant={'flushed'}
                      {...register('initial_date')}
                    />
                  </WrapFormInput>
                  <WrapFormInput label="Data final" isReadOnly>
                    <Input
                      type="text"
                      variant={'flushed'}
                      {...register('end_date')}
                    />
                  </WrapFormInput>
                </WrapInputs>
                <WrapInputs cols={[1, 2]}>
                  <WrapFormInput label="Pontuação da prova" isReadOnly>
                    <Input
                      type="number"
                      variant={'flushed'}
                      {...register('total_score')}
                    />
                  </WrapFormInput>
                  <WrapFormInput label="Quantidade de questões" isReadOnly>
                    <Input
                      type="number"
                      variant={'flushed'}
                      {...register('total_question')}
                    />
                  </WrapFormInput>
                </WrapInputs>
              </VStack>
            </GridItem>
            <GridItem boxShadow={'lg'} p={4}>
              <HeaderProvaInfo
                title={'Candidatos Vinculados'}
                buttonIcon={IoIosAdd}
                buttonTitle={'Vincular Novo'}
                onClickFunction={onOpen}
              />
              <Stack
                direction={'column'}
                mt={4}
                spacing={1}
                overflowY={'auto'}
                maxH={'100vh'}
              >
                {data?.users.map(({ username, email, uuid }) => (
                  <CandidatoCard
                    key={uuid}
                    username={username}
                    email={email}
                    deslinkUser={() => deslinkUsersInProva(uuid)}
                  />
                ))}
              </Stack>
            </GridItem>
          </Grid>
        </Layout>
      </RequireAuth>
    </>
  )
}

export default ProvaInfo
