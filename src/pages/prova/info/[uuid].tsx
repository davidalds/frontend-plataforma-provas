import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Input,
  Stack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import WrapFormInput from 'components/Form/WrapFormInput'
import WrapInputs from 'components/Form/WrapInputs'
import Layout from 'components/Layout'
import ModalListCandidatos from 'components/ModalListCandidatos'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import useSWR, { KeyedMutator } from 'swr'
import { useForm } from 'react-hook-form'
import { AiOutlineMinus, AiOutlineOrderedList } from 'react-icons/ai'
import HeaderProvaInfo from 'components/HeaderProvaInfo'
import UserCard from 'components/CandidatoCard'
import { UsersCandidatoResponse } from '../../../services/queries/users'
import {
  fetcherProvaInfo,
  fetcherUsersByProva,
} from '../../../services/queries/provas'
import { FormProvaInfo } from '../../../types/provaInfoTypes'
import { useToastHook } from '../../../hooks/useToast'
import api from '../../../services'
import RequireAuth from '../../../context/RequireAuth'
import BreadCrumb from 'components/Breadcrumb'
import ErrorAlertPage from 'components/ErrorAlertPage'
import ModalQuestions from 'components/ModalQuestions'
import { BiPencil } from 'react-icons/bi'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../../../schemas/editProva'
import { Entry } from '../../../types/entriesType'
import { formatDateToString } from '../../../utils/dateToString'

type ModalRefType = {
  refetchUsersCandidato(): void
}

const ProvaInfo = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [uuidProva, setUuidProva] = useState<string>('')
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
    mutate: mutateProvaInfo,
  } = useSWR(
    uuidProva && session
      ? `prova/${session?.user.uuid}/${router.query.uuid}`
      : null,
    fetcherProvaInfo
  )

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormProvaInfo>({
    resolver: yupResolver(schema),
  })

  const toast = useToastHook()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    isOpen: isOpenModalQuestions,
    onClose: onCloseModalQuestions,
    onOpen: onOpenModalQuestions,
  } = useDisclosure()
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
      toast({
        status: 'error',
        title: 'Ocorreu um erro ao vincular usuários',
      })
      return Promise.reject()
    }
  }

  const deslinkUsersInProva = async (uuidDeslinkUser: string) => {
    try {
      if (session) {
        await api.delete(
          `provas/deslink/${session.user.uuid}/${router.query.uuid}/${uuidDeslinkUser}`
        )

        mutateUsersByProva()
        modalRef.current?.refetchUsersCandidato()

        toast({
          status: 'success',
          title: 'Candidato desvinculado com sucesso',
        })
      }
    } catch (error) {
      toast({
        status: 'error',
        title: 'Ocorreu um erro ao desvincular candidato da prova',
      })
    }
  }

  const submit = async (data: FormProvaInfo) => {
    try {
      await api.put(`prova/${session?.user.uuid}/${uuidProva}`, data)

      toast({
        status: 'success',
        title: 'Informações da prova editadas com sucesso',
      })
      mutateProvaInfo()
    } catch (error) {
      toast({
        status: 'error',
        title: 'Ocorreu um erro ao editar informações da prova',
      })
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
      type entries = Array<Entry<FormProvaInfo>>

      const data = Object.entries(dataProvaInfo.prova) as entries
      data.forEach(([key, value]) => {
        if (key === 'initial_date' || key === 'end_date') {
          setValue(key, formatDateToString(value))
        } else {
          setValue(key, value)
        }
      })
    }
  }, [dataProvaInfo, setValue])

  return (
    <>
      <RequireAuth>
        <Layout title="Prova info">
          <ErrorAlertPage
            errorTitle="Ocorreu um erro ao carregar informações da prova"
            error={error}
          >
            <ModalQuestions
              isOpen={isOpenModalQuestions}
              onClose={onCloseModalQuestions}
              uuidProva={uuidProva}
              uuidUser={session?.user.uuid!}
              resetProvaInfo={mutateProvaInfo}
            />
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
            <BreadCrumb
              links={[
                {
                  path: router.asPath,
                  pageName: 'Informações da Prova',
                  isCurrent: true,
                },
              ]}
            />
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
                as={'form'}
                onSubmit={handleSubmit(submit)}
              >
                <HeaderProvaInfo
                  title={'Informações da Prova'}
                  buttonIcon={AiOutlineOrderedList}
                  buttonTitle={'Visualizar Questões'}
                  onClickFunction={onOpenModalQuestions}
                />
                <VStack mt={4} spacing={4} flex={1} justifyContent={'center'}>
                  <WrapInputs cols={[1]}>
                    <WrapFormInput
                      label="Título da prova"
                      errors={errors.title}
                    >
                      <Input
                        type="text"
                        variant={'flushed'}
                        {...register('title')}
                      />
                    </WrapFormInput>
                  </WrapInputs>
                  <WrapInputs cols={[1]}>
                    <WrapFormInput
                      label="Descrição da prova"
                      errors={errors.description}
                    >
                      <Input
                        type="text"
                        variant={'flushed'}
                        {...register('description')}
                      />
                    </WrapFormInput>
                  </WrapInputs>
                  <WrapInputs cols={[1, 2]}>
                    <WrapFormInput
                      label="Data inicial"
                      errors={errors.initial_date}
                    >
                      <Input
                        type="datetime-local"
                        variant={'flushed'}
                        {...register('initial_date')}
                      />
                    </WrapFormInput>
                    <WrapFormInput label="Data final" errors={errors.end_date}>
                      <Input
                        type="datetime-local"
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
                <ButtonGroup w={'100%'}>
                  <Button
                    bgColor={'mainBlue.100'}
                    leftIcon={<Icon as={BiPencil} />}
                    flex={1}
                    isDisabled={!isDirty}
                    type="submit"
                  >
                    Confirmar Edição
                  </Button>
                </ButtonGroup>
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
                    <UserCard
                      key={uuid}
                      username={username}
                      email={email}
                      action={
                        <IconButton
                          onClick={() => deslinkUsersInProva(uuid)}
                          aria-label="desvincular"
                          bg={'mainBlue.100'}
                          size={'sm'}
                          icon={<Icon as={AiOutlineMinus} />}
                          title="Desvincular"
                        />
                      }
                    />
                  ))}
                </Stack>
              </GridItem>
            </Grid>
          </ErrorAlertPage>
        </Layout>
      </RequireAuth>
    </>
  )
}

export default ProvaInfo
