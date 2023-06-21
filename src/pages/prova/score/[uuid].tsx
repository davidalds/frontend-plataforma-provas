import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import BaseCard from 'components/Card'
import Layout from 'components/Layout'
import ModalFeedbackQuestions from 'components/ModalFeedbackQuestions'
import RequireAuth from 'context/RequireAuth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { fetcherProvaScore } from 'services/queries/provas'
import useSWR from 'swr'

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
            <BaseCard cardTitle={data?.prova_title}>
              <Stack divider={<StackDivider />} spacing={2}>
                <Box>
                  <Heading
                    size="xs"
                    color={'mainBlue.700'}
                    textTransform={'uppercase'}
                  >
                    Valor da prova
                  </Heading>
                  <Text pt="2" fontSize="md">
                    {data.prova_score} ponto(s)
                  </Text>
                </Box>
                <Box>
                  <Heading
                    size="xs"
                    color={'mainBlue.700'}
                    textTransform={'uppercase'}
                  >
                    Questões acertadas
                  </Heading>
                  <Text pt="2" fontSize="md">
                    {data.score.correct_questions} de {data.total_questions}
                  </Text>
                </Box>
                <Box>
                  <Heading
                    size="xs"
                    color={'mainBlue.700'}
                    textTransform={'uppercase'}
                  >
                    Nota obtida
                  </Heading>
                  <Text pt="2" fontSize="md">
                    {data.score.score} ponto(s)
                  </Text>
                </Box>
                <Box>
                  <Heading
                    size="xs"
                    color={'mainBlue.700'}
                    textTransform={'uppercase'}
                  >
                    Gabarito da prova
                  </Heading>
                  <HStack spacing={2} pt="2">
                    {data.questions_answers.map((op, index) => (
                      <Flex key={op.option_id}>
                        <Text mr={1} fontWeight={'bold'}>
                          {index + 1}:
                        </Text>
                        <Text>{op.option_letter}</Text>
                      </Flex>
                    ))}
                  </HStack>
                </Box>
              </Stack>
              <Box mt={4}>
                <Button
                  colorScheme={'blue'}
                  size={'lg'}
                  w={'100%'}
                  variant={'outline'}
                  onClick={onOpen}
                >
                  Visualizar Gabarito de Questões
                </Button>
              </Box>
            </BaseCard>
          ) : (
            <></>
          )}
        </Box>
      </Layout>
    </RequireAuth>
  )
}

export default ProvaScore
