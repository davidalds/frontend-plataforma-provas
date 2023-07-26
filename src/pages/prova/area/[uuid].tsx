import {
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Button,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'
import ConfirmQuestionModal from 'components/ConfirmQuestionsModal'
import QuestionHeader from 'components/HeaderQuestion'
import Layout from 'components/Layout'
import Question from 'components/Question'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import api from '../../../services'
import RequireAuth from '../../../context/RequireAuth'
import { fetcherQuestions } from '../../../services/queries/questions'
import { useToastHook } from '../../../hooks/useToast'
import ErrorAlertPage from 'components/ErrorAlertPage'
import useCatchErrors from '../../../hooks/useCatchErrors'

type Options = {
  option_question_id: number
  option_id: number
}

const ProvaArea = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [uuid, setUuid] = useState<string>('')
  const { data, error, isLoading } = useSWR(
    uuid && session ? `questions/${session.user.uuid}/${uuid}` : null,
    fetcherQuestions,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const toast = useToastHook()

  const [optionsArr, setOptionsArr] = useState<Options[]>([])
  const [emptyQuestionsIndex, setEmptyQuestionsIndex] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)
  const { handleErrors } = useCatchErrors()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const [tabIndex, setTabIndex] = useState<number>(0)

  const markProvaDone = async () => {
    try {
      await api.put(`prova/done/${session?.user.uuid}/${uuid}`)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (!mounted && uuid && session && data) {
      ;(async () => {
        try {
          await markProvaDone()
        } catch (error) {
          handleErrors(error, 'Ocorreu um erro ao marcar a abertura da prova')
          router.replace('/')
        }
      })()
      setMounted(true)
    }
  }, [uuid, session, data])

  useEffect(() => {
    if (router) {
      if (typeof router.query.uuid === 'string') {
        setUuid(router.query.uuid)
      }
    }
  }, [router])

  const handleNextClickChange = () => {
    if (data?.questions.length === tabIndex + 1) return
    setTabIndex((prevState) => prevState + 1)
  }

  const handleBackClickChange = () => {
    if (tabIndex === 0) return
    setTabIndex((prevState) => prevState - 1)
  }

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  const addOption = (option: Options) => {
    if (optionsArr.length) {
      setOptionsArr((prevState) => {
        const index = prevState.findIndex(
          (op) => op.option_question_id === option.option_question_id
        )

        if (index !== -1) {
          prevState.splice(index, 1, option)
        } else {
          prevState.push(option)
        }

        return [...prevState]
      })
    } else {
      setOptionsArr((prevState) => [...prevState, option])
    }
  }

  const sendProva = async () => {
    try {
      await api.post(`questionverify/${session?.user.uuid}`, {
        prova_id: data?.prova_id,
        options: optionsArr,
      })
      onClose()
      router.replace('/')
      toast({ status: 'success', title: 'Prova respondida com sucesso' })
    } catch (error) {
      onClose()
      handleErrors(error, 'Ocorreu um erro ao responder prova')
    }
  }

  const checkMarkedOptions = () => {
    const arr: number[] = []
    data?.questions.forEach(({ question_id }, index) => {
      if (
        !optionsArr.length ||
        !optionsArr.find(
          ({ option_question_id }) => option_question_id === question_id
        )
      ) {
        arr.push(index + 1)
      }
    })
    setEmptyQuestionsIndex(arr)
  }

  const handleSendProva = () => {
    setEmptyQuestionsIndex([])
    if (data) {
      if (optionsArr.length < data.questions.length) {
        checkMarkedOptions()
      }
      onOpen()
    }
  }

  const forceEndProva = useCallback(() => {
    if (router) {
      router.replace('/')
    }
  }, [router])

  return (
    <RequireAuth>
      <Layout title="Prova Área" hiddenHeader>
        <ErrorAlertPage
          errorTitle="Ocorreu um erro ao carregar área da prova"
          error={error}
        >
          <ConfirmQuestionModal
            isOpen={isOpen}
            onClose={onClose}
            questionsEmptyList={emptyQuestionsIndex}
            sendProva={sendProva}
          />
          <VStack>
            <QuestionHeader
              provaTitle={data?.prova_title || 'Título da prova'}
              timer={data?.timer}
              forceEndProva={forceEndProva}
            />
            {isLoading ? (
              <Spinner size={'xl'} />
            ) : (
              <>
                <Tabs
                  variant="soft-rounded"
                  colorScheme="blue"
                  isFitted
                  isManual
                  index={tabIndex}
                  onChange={handleTabsChange}
                >
                  <TabList>
                    {data?.questions.map(({ question_id }, index) => {
                      if (emptyQuestionsIndex.includes(index + 1)) {
                        return (
                          <Tab
                            key={question_id}
                            bg={'salmon'}
                            color={'white'}
                            _selected={{ bg: 'salmon', color: 'white' }}
                          >
                            {index + 1}
                          </Tab>
                        )
                      }
                      return <Tab key={question_id}>{index + 1}</Tab>
                    })}
                  </TabList>
                  <TabPanels>
                    {data?.questions.map(
                      (
                        { question_id, question_title, options, peso },
                        index
                      ) => (
                        <TabPanel key={question_id}>
                          <Question
                            ind={index + 1}
                            idQuestion={question_id}
                            addOption={addOption}
                            title={question_title}
                            options={options}
                            peso={peso}
                          />
                        </TabPanel>
                      )
                    )}
                  </TabPanels>
                </Tabs>
                <HStack justifyContent={'end'}>
                  {data?.questions.length ? (
                    <>
                      {tabIndex ? (
                        <Button
                          colorScheme={'gray'}
                          onClick={handleBackClickChange}
                        >
                          Anterior
                        </Button>
                      ) : (
                        <></>
                      )}
                      <Button
                        colorScheme={'green'}
                        onClick={
                          data?.questions.length === tabIndex + 1
                            ? handleSendProva
                            : handleNextClickChange
                        }
                      >
                        {data?.questions.length === tabIndex + 1
                          ? 'Finalizar Prova'
                          : 'Próximo'}
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </HStack>
              </>
            )}
          </VStack>
        </ErrorAlertPage>
      </Layout>
    </RequireAuth>
  )
}

export default ProvaArea
