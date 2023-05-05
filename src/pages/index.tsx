import {
  Divider,
  HStack,
  Heading,
  SimpleGrid,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import BaseCard from 'components/Card'
import Layout from 'components/Layout'
import { fetcherProvas } from 'services/queries/provas'
import useSWR from 'swr'
import RequireAuth from 'context/RequireAuth'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  const { data, error, isLoading } = useSWR(
    session ? `provas/${session.user.uuid}` : null,
    fetcherProvas
  )
  const { data: data2 } = useSWR(
    session ? `provas/${session.user.uuid}?done=true` : null,
    fetcherProvas
  )

  return (
    <>
      <RequireAuth>
        <Layout>
          {isLoading ? (
            <VStack>
              <Spinner size={'lg'} />
            </VStack>
          ) : (
            <>
              <HStack p={4} w={'100%'}>
                <Heading
                  size={'lg'}
                  color={'mainBlue.600'}
                  fontWeight={'medium'}
                >
                  Provas em aberto
                </Heading>
              </HStack>
              <Divider />
              <SimpleGrid p={4} columns={[1, 2, 3]} spacing={'40px'}>
                {data?.provas.map(({ prova_id, uuid, title, description }) => (
                  <BaseCard
                    key={prova_id}
                    cardTitle={title}
                    cardButtonLink={`prova/${uuid}`}
                    cardButtonTitle={'Acessar prova'}
                  >
                    {description}
                  </BaseCard>
                ))}
              </SimpleGrid>
              <HStack p={4} w={'100%'}>
                <Heading
                  size={'lg'}
                  color={'mainBlue.600'}
                  fontWeight={'medium'}
                >
                  Provas finalizadas
                </Heading>
              </HStack>
              <Divider />
              <SimpleGrid p={4} columns={[1, 2, 3]} spacing={'40px'}>
                {data2?.provas.map(({ prova_id, title, description, uuid }) => (
                  <BaseCard
                    key={prova_id}
                    cardTitle={title}
                    cardButtonLink={`prova/score/${uuid}`}
                    cardButtonTitle={'Visualizar nota'}
                  >
                    {description}
                  </BaseCard>
                ))}
              </SimpleGrid>
            </>
          )}
        </Layout>
      </RequireAuth>
    </>
  )
}
