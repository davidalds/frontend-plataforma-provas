import React from 'react'
import Layout from 'components/Layout'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { createProvaForm, question } from './../../../types/createProvaTypes'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../../../schemas/createProvaSchema'
import {
  Button,
  Divider,
  HStack,
  Icon,
  Input,
  Select,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { IoIosAdd } from 'react-icons/io'
import { AiOutlineMinus } from 'react-icons/ai'
import { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'
import WrapInputs from 'components/Form/WrapInputs'
import WrapFormInput from 'components/Form/WrapFormInput'
import HeadingForm from 'components/Form/HeadingForm'
import api from '../../../services'
import RequireAuth from '../../../context/RequireAuth'
import BreadCrumb from 'components/Breadcrumb'
import timerOpts from '../../../utils/timerOptions'
import useCatchErrors from '../../../hooks/useCatchErrors'

const arr_options_letter = ['A', 'B', 'C', 'D']

const CreateProva = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<createProvaForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      questions: [
        {
          title: '',
          peso: 0,
          options: [],
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'questions',
    control,
  })

  const { handleErrors } = useCatchErrors()

  const { data: session } = useSession()
  const { mutate } = useSWRConfig()

  const router = useRouter()

  const toast = useToast({
    duration: 4000,
    isClosable: true,
    position: 'top',
  })

  const checkAnswersTypes = (arr_questions: question[]): boolean => {
    const arr_answers_types = arr_questions
      .map(({ options }) => {
        return options.filter(({ iscorrect }) => iscorrect === 'true')
      })
      .flat()

    return arr_answers_types.length === arr_questions.length
  }

  const submit = async (data: createProvaForm) => {
    try {
      if (data.questions.length === 0) {
        toast({
          status: 'error',
          title: 'A prova deve conter pelo menos uma questão cadastrada',
        })
        return
      }

      if (!checkAnswersTypes(data.questions)) {
        toast({
          status: 'error',
          title: `Cada questão deve possuir 1(uma) opção correta e as restantes incorretas.
            Corrija os tipos de respostas nas opções das questões e tente cadastrar novamente`,
        })
        return
      }

      const url = `provas/${session?.user.uuid}`
      await api.post<createProvaForm>(url, data)
      mutate(url)

      toast({
        status: 'success',
        title: 'Prova criada com sucesso',
      })

      router.replace('/')
    } catch (error) {
      handleErrors(error, 'Ocorreu um erro ao tentar salvar prova')
    }
  }

  return (
    <>
      <RequireAuth>
        <Layout title="Criar prova">
          <BreadCrumb
            links={[
              {
                path: router.asPath,
                pageName: 'Cadastrar Prova',
                isCurrent: true,
              },
            ]}
          />
          <VStack w={'100%'}>
            <VStack
              as={'form'}
              onSubmit={handleSubmit(submit)}
              boxShadow={'md'}
              w={'80%'}
              p={4}
              m={4}
              spacing={4}
            >
              <HeadingForm>Informações da prova</HeadingForm>
              <WrapInputs cols={[1]}>
                <WrapFormInput errors={errors.title}>
                  <Input
                    type="text"
                    variant="flushed"
                    placeholder="Título da prova"
                    {...register('title')}
                  />
                </WrapFormInput>
              </WrapInputs>
              <WrapInputs cols={[1]}>
                <WrapFormInput errors={errors.description}>
                  <Input
                    type="text"
                    variant="flushed"
                    placeholder="Descrição da prova"
                    {...register('description')}
                  />
                </WrapFormInput>
              </WrapInputs>
              <WrapInputs cols={[1, 2, 3]}>
                <WrapFormInput errors={errors.timer} label="Tempo de prova">
                  <Select variant="flushed" {...register('timer')}>
                    {timerOpts.map(({ label, value }, index) => (
                      <option value={value} key={index}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </WrapFormInput>
                <WrapFormInput
                  label={'Data abertura'}
                  errors={errors.initial_date}
                >
                  <Input
                    type="datetime-local"
                    variant="flushed"
                    {...register('initial_date')}
                  />
                </WrapFormInput>
                <WrapFormInput
                  label={'Data fechamento'}
                  errors={errors.end_date}
                >
                  <Input
                    type="datetime-local"
                    variant="flushed"
                    {...register('end_date')}
                  />
                </WrapFormInput>
              </WrapInputs>
              <Divider />
              <HeadingForm>Questões da prova</HeadingForm>
              <HStack w={'100%'} justifyContent={'flex-end'}>
                <Button
                  size={'sm'}
                  colorScheme={'blue'}
                  leftIcon={<Icon as={IoIosAdd} />}
                  onClick={() => append({ title: '', peso: 0, options: [] })}
                >
                  Nova questão
                </Button>
              </HStack>
              {fields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <Stack w={'100%'} direction={'column'}>
                    <HStack justifyContent={'space-between'}>
                      <Text
                        fontSize={'md'}
                        color={'mainBlue.600'}
                        fontWeight={'bold'}
                      >
                        Questão {index + 1}
                      </Text>
                      {index > 0 ? (
                        <Button
                          size={'sm'}
                          color={'mainBlue.600'}
                          leftIcon={<Icon as={AiOutlineMinus} />}
                          onClick={() => remove(index)}
                        >
                          Remover
                        </Button>
                      ) : (
                        <></>
                      )}
                    </HStack>
                    <WrapInputs cols={[1, 2]}>
                      <WrapFormInput errors={errors?.questions?.[index]?.title}>
                        <Input
                          type="text"
                          variant="flushed"
                          placeholder="Título da questão"
                          {...register(`questions.${index}.title` as const)}
                        />
                      </WrapFormInput>
                      <WrapFormInput errors={errors?.questions?.[index]?.peso}>
                        <Input
                          type="number"
                          variant="flushed"
                          placeholder="Peso da questão"
                          {...register(`questions.${index}.peso` as const)}
                        />
                      </WrapFormInput>
                    </WrapInputs>
                    {arr_options_letter.map((letter, ind) => (
                      <WrapInputs cols={[1, 2, 3]} key={ind}>
                        <WrapFormInput label={'Opção'}>
                          <Input
                            type="text"
                            variant="flushed"
                            {...register(
                              `questions.${index}.options.${ind}.option_letter` as const
                            )}
                            value={letter}
                            readOnly
                          />
                        </WrapFormInput>
                        <WrapFormInput
                          label={'Título opção'}
                          errors={
                            errors?.questions?.[index]?.options?.[ind]?.title
                          }
                        >
                          <Input
                            type="text"
                            variant="flushed"
                            placeholder="Título opção"
                            {...register(
                              `questions.${index}.options.${ind}.title` as const
                            )}
                          />
                        </WrapFormInput>
                        <WrapFormInput
                          label={'Tipo de resposta'}
                          errors={
                            errors?.questions?.[index]?.options?.[ind]
                              ?.iscorrect
                          }
                        >
                          <Select
                            variant="flushed"
                            {...register(
                              `questions.${index}.options.${ind}.iscorrect` as const
                            )}
                          >
                            <option value="">Selecione uma opção</option>
                            <option value="false">Incorreta</option>
                            <option value="true">Correta</option>
                          </Select>
                        </WrapFormInput>
                      </WrapInputs>
                    ))}
                  </Stack>
                  <Divider />
                </React.Fragment>
              ))}
              <HStack justifyContent={'flex-end'} w={'100%'}>
                <Button type="submit" colorScheme={'green'}>
                  Cadastrar prova
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </Layout>
      </RequireAuth>
    </>
  )
}

export default CreateProva
