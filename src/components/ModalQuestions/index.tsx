import React, { useEffect, useRef, useState } from 'react'
import BaseModal from 'components/Modal'
import { IPropsModalQuestions, formModalQuestion } from './types'
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react'
import WrapInputs from 'components/Form/WrapInputs'
import WrapFormInput from 'components/Form/WrapFormInput'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import useSWR from 'swr'
import { fetcherQuestions } from '../../services/queries/questions'
import { useForm, useFieldArray } from 'react-hook-form'
import { Entry } from '../../types/entriesType'
import HeadingForm from 'components/Form/HeadingForm'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../../schemas/editQuestionSchema'
import { useToastHook } from '../../hooks/useToast'
import api from '../../services'
import ConfirmDeleteQuestion from 'components/ConfirmDeleteQuestion'
import { useSession } from 'next-auth/react'

const defaultQuestion = {
  question_title: '',
  peso: 0,
  options: [
    {
      option_letter: 'A',
      option_title: '',
      iscorrect: false,
    },
    {
      option_letter: 'B',
      option_title: '',
      iscorrect: false,
    },
    {
      option_letter: 'C',
      option_title: '',
      iscorrect: false,
    },
    {
      option_letter: 'D',
      option_title: '',
      iscorrect: false,
    },
  ],
}

const ModalQuestions = ({
  isOpen,
  uuidProva,
  uuidUser,
  onClose,
  resetProvaInfo,
}: IPropsModalQuestions) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const { data: session } = useSession()

  const toast = useToastHook()

  const {
    data,
    isLoading,
    error,
    mutate: refetchQuestions,
  } = useSWR(
    uuidProva && session
      ? `questions/${session?.user.uuid}/${uuidProva}?isFeedback=true`
      : null,
    fetcherQuestions
  )

  const {
    isOpen: isOpenConfirmModal,
    onClose: onCloseConfirmModal,
    onOpen: onOpenConfirmModal,
  } = useDisclosure()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<formModalQuestion>({ resolver: yupResolver(schema) })

  const { fields, append, remove } = useFieldArray({
    name: 'questions',
    control,
  })
  const [tabIndex, setTabIndex] = useState<number>(0)

  const [questionToBeRemoved, setQuestionToBeRemoved] = useState<{
    index: number
    questionId?: number
  }>({
    index: 0,
  })

  useEffect(() => {
    if (data) {
      type entryObject = Entry<formModalQuestion>
      const questions = Object.entries(data) as Array<entryObject>
      questions.map(([key, value]) => {
        setValue(key, value)
      })
    }
  }, [data])

  const checkAnswersTypes = (data: formModalQuestion): boolean => {
    const arr_answers_types = data.questions
      .map(({ options }) => {
        return options.filter(({ iscorrect }) =>
          typeof iscorrect === 'string'
            ? iscorrect === 'true'
            : iscorrect === true
        )
      })
      .flat()

    return arr_answers_types.length === data.questions.length
  }

  const checkProvaScoreTotal = (data: formModalQuestion) => {
    const sum_peso_questions = data.questions.reduce(
      (acc, { peso }) => acc + peso,
      0
    )

    return sum_peso_questions > 0 && sum_peso_questions <= 10
  }

  const submit = async (data: formModalQuestion) => {
    try {
      if (fields.length === 0) {
        toast({
          status: 'error',
          title: 'A prova deve possuir no mínimo uma questão',
        })
        return
      }

      if (!checkAnswersTypes(data)) {
        toast({
          status: 'error',
          title: `Cada questão deve possuir 1(uma) opção correta e as restantes incorretas.
          Corrija os tipos de respostas nas opções das questões e tente editar novamente`,
        })
        return
      }

      if (!checkProvaScoreTotal(data)) {
        toast({
          status: 'error',
          title: `A soma do peso das questões deve possuir no total geral entre 1 e 10 pontos`,
        })
        return
      }

      await api.put(`questions/${uuidUser}/${uuidProva}`, data)

      resetProvaInfo()
      refetchQuestions()
      toast({ status: 'success', title: 'Questões editadas com sucesso' })
      onClose()
    } catch (error) {
      toast({ status: 'error', title: 'Ocorreu um erro ao editar questões' })
    }
  }

  const handleSubmitBtnClick = () => {
    if (btnRef) {
      btnRef.current?.click()
    }
  }

  const deleteQuestion = async (question_id: number) => {
    try {
      await api.delete(`question/${uuidUser}/${question_id}`)
    } catch (error) {
      throw error
    }
  }

  const handleRemoveQuestion = async (index: number, question_id?: number) => {
    try {
      if (question_id) {
        await deleteQuestion(question_id)
      }

      remove(index)

      clearQuestionToBeRemoved()
      setTabIndex(0)
      resetProvaInfo()
      onCloseConfirmModal()
      toast({ status: 'success', title: 'Questão excluída com sucesso' })
    } catch (error) {
      toast({ status: 'error', title: 'Ocorreu um erro ao deletar questão' })
    }
  }

  const clearQuestionToBeRemoved = () => {
    setQuestionToBeRemoved({
      index: 0,
    })
  }

  const handleOpenConfirmDeleteModal = (index: number, questionId?: number) => {
    if (questionId) {
      setQuestionToBeRemoved({
        index,
        questionId,
      })
    } else {
      setQuestionToBeRemoved({ index })
    }
    onOpenConfirmModal()
  }

  return (
    <>
      <BaseModal
        modalSize={'4xl'}
        isOpen={isOpen}
        modalTitle="Questões da Prova"
        onClose={onClose}
        confirmAction={handleSubmitBtnClick}
      >
        <ConfirmDeleteQuestion
          isOpen={isOpenConfirmModal}
          onClose={onCloseConfirmModal}
          removeQuestion={() =>
            handleRemoveQuestion(
              questionToBeRemoved.index,
              questionToBeRemoved.questionId
            )
          }
        />
        <Tabs
          isFitted
          variant={'soft-rounded'}
          colorScheme={'blue'}
          index={tabIndex}
          onChange={(index) => setTabIndex(index)}
          as={'form'}
          onSubmit={handleSubmit(submit)}
        >
          <HStack spacing={2}>
            <TabList flex={1}>
              {fields.map((_, index) =>
                errors.questions?.[index] ||
                errors.questions?.[index]?.options ? (
                  <Tab
                    key={index}
                    bg={'salmon'}
                    color={'white'}
                    _selected={{ bg: 'salmon', color: 'white' }}
                  >
                    {index + 1}
                  </Tab>
                ) : (
                  <Tab key={index}>{index + 1}</Tab>
                )
              )}
            </TabList>
            <IconButton
              size={'sm'}
              colorScheme="blue"
              aria-label="Adicionar nova questão"
              icon={<Icon as={AiOutlinePlus} />}
              onClick={() => append(defaultQuestion)}
            />
          </HStack>
          <TabPanels>
            {fields.map(({ options, question_id }, index) => (
              <TabPanel key={index}>
                <Stack direction={'column'}>
                  <HStack justifyContent={'space-between'} py={4}>
                    <HeadingForm>Questão {index + 1}</HeadingForm>
                    <Button
                      size={'sm'}
                      color={'mainBlue.600'}
                      leftIcon={<Icon as={AiOutlineMinus} />}
                      onClick={() =>
                        handleOpenConfirmDeleteModal(index, question_id)
                      }
                    >
                      Remover
                    </Button>
                  </HStack>
                  <WrapFormInput
                    label="Título questão"
                    errors={errors.questions?.[index]?.question_title}
                  >
                    <Input
                      type="text"
                      variant={'flushed'}
                      {...register(
                        `questions.${index}.question_title` as const
                      )}
                    />
                  </WrapFormInput>
                  <WrapFormInput
                    label="Peso questão"
                    errors={errors.questions?.[index]?.peso}
                  >
                    <Input
                      type="number"
                      {...register(`questions.${index}.peso` as const)}
                      variant={'flushed'}
                    />
                  </WrapFormInput>
                  <Box py={4}>
                    <HeadingForm>Opções da questão</HeadingForm>
                  </Box>
                  {options.map((_, ind) => (
                    <WrapInputs cols={[1, 3]} key={ind}>
                      <WrapFormInput label="Opção" isReadOnly>
                        <Input
                          type="text"
                          {...register(
                            `questions.${index}.options.${ind}.option_letter` as const
                          )}
                          variant={'flushed'}
                        />
                      </WrapFormInput>
                      <WrapFormInput
                        label="Título opção"
                        errors={
                          errors.questions?.[index]?.options?.[ind]
                            ?.option_title
                        }
                      >
                        <Input
                          type="text"
                          {...register(
                            `questions.${index}.options.${ind}.option_title` as const
                          )}
                          variant={'flushed'}
                        />
                      </WrapFormInput>
                      <WrapFormInput
                        label="Tipo de resposta"
                        errors={
                          errors.questions?.[index]?.options?.[ind]?.iscorrect
                        }
                      >
                        <Select
                          {...register(
                            `questions.${index}.options.${ind}.iscorrect` as const
                          )}
                          variant={'flushed'}
                        >
                          <option value="">Selecione uma opção</option>
                          <option value="false">Incorreta</option>
                          <option value="true">Correta</option>
                        </Select>
                      </WrapFormInput>
                    </WrapInputs>
                  ))}
                </Stack>
              </TabPanel>
            ))}
          </TabPanels>
          <Button type="submit" hidden ref={btnRef}>
            Submit form
          </Button>
        </Tabs>
      </BaseModal>
    </>
  )
}

export default ModalQuestions
