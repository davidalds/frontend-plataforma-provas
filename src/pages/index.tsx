import { Spinner, VStack } from '@chakra-ui/react'
import Layout from 'components/Layout'
import { fetcherProvas } from 'services/queries/provas'
import useSWR from 'swr'
import RequireAuth from 'context/RequireAuth'
import { useSession } from 'next-auth/react'
import ParticipantHome from 'components/ParticipantHome'
import CreatorHome from 'components/CreatorHome'

export default function Home() {
  const { data: session } = useSession()
  const {
    data: openProvas,
    error,
    isLoading,
  } = useSWR(session ? `provas/${session.user.uuid}` : null, fetcherProvas)
  const { data: closedProvas } = useSWR(
    session
      ? session.user.user_type === 2
        ? `provas/${session.user.uuid}?done=true`
        : null
      : null,
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
          ) : session?.user.user_type === 1 ? (
            <CreatorHome data={openProvas} />
          ) : (
            <ParticipantHome data={openProvas} data2={closedProvas} />
          )}
        </Layout>
      </RequireAuth>
    </>
  )
}
