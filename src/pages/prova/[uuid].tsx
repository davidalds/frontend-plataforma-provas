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
import RequireAuth from 'context/RequireAuth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import api from 'services'
import { fetcherQuestions } from 'services/queries/questions'
import useSWR from 'swr'

type Options = {
  option_question_id: number
  option_id: number
}

const Prova = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { data, error, isLoading } = useSWR(
    `prova/${router.query.uuid}`,
    fetcherQuestions
  )

  const [optionsArr, setOptionsArr] = useState<Options[]>([])
  const [emptyQuestionsIndex, setEmptyQuestionsIndex] = useState<number[]>([])

  const { isOpen, onClose, onOpen } = useDisclosure()

  const [tabIndex, setTabIndex] = useState(0)

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
      router.push('/')
    } catch (err) {
      console.log(err)
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

  return (
    <RequireAuth>
      <Layout title="Prova">
        <ConfirmQuestionModal
          isOpen={isOpen}
          onClose={onClose}
          questionsEmptyList={emptyQuestionsIndex}
          sendProva={sendProva}
        />
        <VStack>
          <QuestionHeader provaTitle={data?.prova_title || 'Título da prova'} />
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
                    ({ question_id, question_title, options, peso }, index) => (
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
                        ? 'Finalizar prova'
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
      </Layout>
    </RequireAuth>
  )
}

export default Prova
