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
import BreadCrumb from 'components/Breadcrumb'
import ErrorAlertPage from 'components/ErrorAlertPage'
import AlertInfoContent from 'components/AlertInfoContent'

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
        <ErrorAlertPage
          errorTitle="Ocorreu um erro ao carregar resultado da prova"
          error={error}
        >
          <ModalFeedbackQuestions
            uuidProva={router.query.uuid ? router.query.uuid : ''}
            isOpen={isOpen}
            onClose={onClose}
            uuidUser={session ? session?.user.uuid : ''}
          />
          <BreadCrumb
            links={[
              {
                path: router.asPath,
                pageName: 'Prova Resultado',
                isCurrent: true,
              },
            ]}
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
                {data.score === undefined ? (
                  <AlertInfoContent>
                    Não foram encontradas respostas suas na prova. Provavelmente
                    você ainda não enviou as suas respostas na área de prova, o
                    tempo de prova expirou ou você abandonou a área de prova sem
                    finalizar a prova.
                  </AlertInfoContent>
                ) : (
                  <></>
                )}

                <BoxStack heading={'Valor da prova'}>
                  <Text fontSize="md">{data.prova_score} ponto(s)</Text>
                </BoxStack>
                <BoxStack heading={'Questões acertadas'}>
                  <Text fontSize="md">
                    {data.score?.correct_questions !== undefined
                      ? data.score.correct_questions
                      : 0}{' '}
                    de {data.total_questions}
                  </Text>
                </BoxStack>
                <BoxStack heading={'Nota obtida'}>
                  <Text fontSize="md">
                    {data.score?.score !== undefined ? data.score.score : 0}{' '}
                    ponto(s)
                  </Text>
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
        </ErrorAlertPage>
      </Layout>
    </RequireAuth>
  )
}

export default ProvaScore
