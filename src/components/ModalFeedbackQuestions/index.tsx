import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import BaseModal from 'components/Modal'
import { IPropsModalFeedbackQuestions } from './types/modalFeedbackQuestions'
import useSWR from 'swr'
import { fetcherQuestionsFeedback } from '../../services/queries/questions'
import Question from 'components/Question'

const ModalFeedbackQuestions = ({
  isOpen,
  onClose,
  uuidProva,
  uuidUser,
}: IPropsModalFeedbackQuestions) => {
  const { data, error, isLoading } = useSWR(
    uuidProva && uuidUser
      ? `questions/feedback/${uuidProva}/${uuidUser}`
      : null,
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
            {data?.questions.map((q, index) => (
              <TabPanel key={q.question_id}>
                <Question
                  ind={index + 1}
                  idQuestion={q.question_id}
                  title={q.question_title}
                  peso={q.peso}
                  options={q.options}
                  isFeedback={true}
                  markedOptionId={q.option_answered_id}
                />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </BaseModal>
    </>
  )
}

export default ModalFeedbackQuestions
