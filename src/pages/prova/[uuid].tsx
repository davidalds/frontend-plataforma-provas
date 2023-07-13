import { Button, Box, Text } from '@chakra-ui/react'
import Layout from 'components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import RequireAuth from '../../context/RequireAuth'
import ProvaCardInfo from 'components/ProvaCardInfo'
import Link from 'next/link'
import { fetcherProvaInfo } from '../../services/queries/provas'
import BoxStack from 'components/ProvaCardInfo/BoxStack'
import UserCard from 'components/CandidatoCard'
import BreadCrumb from 'components/Breadcrumb'
import ErrorAlertPage from 'components/ErrorAlertPage'

const Prova = () => {
  const router = useRouter()
  const [uuidProva, setUuidProva] = useState<string>()
  const { data, isLoading, error } = useSWR(
    uuidProva ? `prova/${uuidProva}` : null,
    fetcherProvaInfo
  )

  useEffect(() => {
    if (router.query.uuid !== undefined) {
      if (typeof router.query.uuid === 'string') {
        setUuidProva(router.query.uuid)
      }
    }
  }, [router])

  return (
    <RequireAuth>
      <Layout title="Prova">
        <ErrorAlertPage
          errorTitle="Ocorreu um erro ao carregar informações da prova"
          error={error}
        >
          <BreadCrumb
            links={[
              { path: router.asPath, pageName: 'Prova', isCurrent: true },
            ]}
          />
          <Box m={4}>
            {data ? (
              <ProvaCardInfo
                cardTitle={data.prova.title}
                button={
                  <Button
                    colorScheme={'green'}
                    size={'lg'}
                    w={'100%'}
                    variant={'outline'}
                    as={Link}
                    href={`area/${router.query.uuid}`}
                  >
                    Iniciar Prova
                  </Button>
                }
              >
                <BoxStack heading={'Pontuação'}>
                  <Text fontSize="md">{data.prova.total_score} ponto(s)</Text>
                </BoxStack>
                <BoxStack heading={'Quantidade de Questões'}>
                  <Text fontSize="md">
                    {data.prova.total_question}{' '}
                    {data.prova.total_question > 1 ? 'questões' : 'questão'}
                  </Text>
                </BoxStack>
                <BoxStack heading={'Tempo de Prova'}>
                  <Text fontSize="md">60 minutos</Text>
                </BoxStack>
                <BoxStack heading={'Criador'}>
                  <Box display={'flex'}>
                    <UserCard
                      username={data.prova.creator.username}
                      email={data.prova.creator.email}
                    />
                  </Box>
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

export default Prova
