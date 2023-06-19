import {
  TabList,
  Tabs,
  Tab,
  useDisclosure,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import BaseModal from 'components/Modal'
import { IPropsModalFeedbackQuestions } from './types/modalFeedbackQuestions'
import useSWR from 'swr'
import { fetcherQuestionsFeedback } from 'services/queries/questions'
import Question from 'components/Question'

const ModalFeedbackQuestions = ({
  isOpen,
  onClose,
  uuidProva,
}: IPropsModalFeedbackQuestions) => {
  const { data, error, isLoading } = useSWR(
    uuidProva ? `questions/feedback/${uuidProva}` : null,
    fetcherQuestionsFeedback
  )

  return (
    <>
      <BaseModal
        modalTitle={'Gabarito Questões'}
        isOpen={isOpen}
        onClose={onClose}
        modalSize={'4xl'}
      >
        <Tabs isFitted variant={'soft-rounded'} colorScheme={'blue'}>
          <TabList>
            {data?.questions.map(({ question_id }, index) => (
              <Tab key={question_id}>{index + 1}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {data?.questions.map(
              ({ question_id, question_title, peso, options }, index) => (
                <TabPanel key={question_id}>
                  <Question
                    ind={index + 1}
                    idQuestion={question_id}
                    title={question_title}
                    peso={peso}
                    options={options}
                    isFeedback={true}
                  />
                </TabPanel>
              )
            )}
          </TabPanels>
        </Tabs>
      </BaseModal>
    </>
  )
}

export default ModalFeedbackQuestions
