import { Button, Box, Text, useDisclosure } from '@chakra-ui/react'
import Layout from 'components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import RequireAuth from '../../context/RequireAuth'
import ProvaCardInfo from 'components/ProvaCardInfo'
import { fetcherProvaInfo } from '../../services/queries/provas'
import BoxStack from 'components/ProvaCardInfo/BoxStack'
import UserCard from 'components/CandidatoCard'
import BreadCrumb from 'components/Breadcrumb'
import ErrorAlertPage from 'components/ErrorAlertPage'
import { useSession } from 'next-auth/react'
import { formatDateToString } from '../../utils/dateToString'
import ConfirmStartProva from 'components/ConfirmStartProva'
import Link from 'next/link'

const Prova = () => {
  const { data: session } = useSession()
  const linkRef = useRef<HTMLAnchorElement>(null)
  const router = useRouter()
  const [uuidProva, setUuidProva] = useState<string>()
  const { data, isLoading, error } = useSWR(
    uuidProva && session ? `prova/${session.user.uuid}/${uuidProva}` : null,
    fetcherProvaInfo
  )

  const { isOpen, onClose, onOpen } = useDisclosure()

  useEffect(() => {
    if (router.query.uuid !== undefined) {
      if (typeof router.query.uuid === 'string') {
        setUuidProva(router.query.uuid)
      }
    }
  }, [router])

  const redirectToAreaPage = () => {
    if (linkRef.current) {
      linkRef.current.click()
      onClose()
      router.replace('/')
    }
  }

  return (
    <RequireAuth>
      <Layout title="Prova">
        <ErrorAlertPage
          errorTitle="Ocorreu um erro ao carregar informações da prova"
          error={error}
        >
          <ConfirmStartProva
            isOpen={isOpen}
            onClose={onClose}
            startProva={() => redirectToAreaPage()}
          />
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
                    onClick={() => onOpen()}
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
                  <Text fontSize="md">{data.prova.timer} minutos</Text>
                </BoxStack>
                <BoxStack heading={'Data de abertura'}>
                  <Text fontSize="md">
                    {formatDateToString(data.prova.initial_date)}
                  </Text>
                </BoxStack>
                <BoxStack heading={'Data de fechamento'}>
                  <Text fontSize="md">
                    {formatDateToString(data.prova.end_date)}
                  </Text>
                </BoxStack>
                <BoxStack heading={'Criador'}>
                  <Box display={'flex'}>
                    <UserCard
                      username={data.prova.creator.username}
                      email={data.prova.creator.email}
                    />
                  </Box>
                </BoxStack>
                <Link
                  hidden
                  ref={linkRef}
                  href={`${router.basePath}/prova/area/${uuidProva}`}
                  target="_blank"
                >
                  Hidden Link
                </Link>
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
