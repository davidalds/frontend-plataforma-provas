import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import Layout from 'components/Layout'
import ModalFeedbackQuestions from 'components/ModalFeedbackQuestions'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import RequireAuth from '../../../context/RequireAuth'
import { fetcherProvaScore } from '../../../services/queries/provas'
import ProvaCardInfo from 'components/ProvaCardInfo'
import BoxStack from 'components/ProvaCardInfo/BoxStack'

const ProvaScore = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { data, error, isLoading } = useSWR(
    session ? `prova/score/${router.query.uuid}/${session?.user.uuid}` : null,
    fetcherProvaScore
  )

  return (
    <RequireAuth>
      <Layout title="Prova">
        <ModalFeedbackQuestions
          uuidProva={router.query.uuid ? router.query.uuid : ''}
          isOpen={isOpen}
          onClose={onClose}
          uuidUser={session ? session?.user.uuid : ''}
        />
        <Box m={4}>
          {data ? (
            <ProvaCardInfo
              cardTitle={data?.prova_title}
              button={
                <Button
                  colorScheme={'blue'}
                  size={'lg'}
                  w={'100%'}
                  variant={'outline'}
                  onClick={onOpen}
                >
                  Visualizar Gabarito de Questões
                </Button>
              }
            >
              <BoxStack heading={'Valor da prova'}>
                <Text fontSize="md">{data.prova_score} ponto(s)</Text>
              </BoxStack>
              <BoxStack heading={'Questões acertadas'}>
                <Text fontSize="md">
                  {data.score.correct_questions} de {data.total_questions}
                </Text>
              </BoxStack>
              <BoxStack heading={'Nota obtida'}>
                <Text fontSize="md">{data.score.score} ponto(s)</Text>
              </BoxStack>
              <BoxStack heading={'Gabarito da prova'}>
                <HStack spacing={2}>
                  {data.questions_answers.map((op, index) => (
                    <Flex key={op.option_id}>
                      <Text mr={1} fontWeight={'bold'}>
                        {index + 1}:
                      </Text>
                      <Text>{op.option_letter}</Text>
                    </Flex>
                  ))}
                </HStack>
              </BoxStack>
            </ProvaCardInfo>
          ) : (
            <></>
          )}
        </Box>
      </Layout>
    </RequireAuth>
  )
}

export default ProvaScore
