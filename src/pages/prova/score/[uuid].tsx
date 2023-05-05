import { Text, VStack } from '@chakra-ui/react'
import Layout from 'components/Layout'
import RequireAuth from 'context/RequireAuth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { fetcherProvaScore } from 'services/queries/provas'
import useSWR from 'swr'

const ProvaScore = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { data, error, isLoading } = useSWR(
    session ? `prova/score/${router.query.uuid}/${session?.user.uuid}` : null,
    fetcherProvaScore
  )

  return (
    <RequireAuth>
      <Layout title="Prova">
        <VStack>
          <Text>{data?.score.provascore_id}</Text>
          <Text>{data?.score.score}</Text>
        </VStack>
      </Layout>
    </RequireAuth>
  )
}

export default ProvaScore
