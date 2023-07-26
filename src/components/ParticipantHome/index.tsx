import { Box, Button, Divider, Icon, SimpleGrid } from '@chakra-ui/react'
import BaseCard from 'components/Card'
import { ProvaResponse } from '../../services/queries/provas'
import { AiOutlineProfile } from 'react-icons/ai'
import { BsClipboardData } from 'react-icons/bs'
import AlertComponent from 'components/Alert'
import HeadingHome from 'components/HeadingHome'
import Link from 'next/link'
import { BiTime } from 'react-icons/bi'
import AlertInfoContent from 'components/AlertInfoContent'

interface IPropsParticipantHome {
  data: ProvaResponse | undefined
  data2: ProvaResponse | undefined
}

const ParticipantHome = ({ data, data2 }: IPropsParticipantHome) => {
  return (
    <>
      <HeadingHome headingText={'Suas Provas'} />
      <Divider />
      {data && data.provas.length > 0 ? (
        <SimpleGrid p={4} columns={[1, 2, 3]} spacing={'40px'}>
          {data?.provas.map(({ prova_id, uuid, title, description }) => (
            <BaseCard
              key={prova_id}
              cardTitle={title}
              buttons={
                <Button
                  as={Link}
                  href={`prova/${uuid}`}
                  colorScheme={'blue'}
                  leftIcon={<Icon as={AiOutlineProfile} />}
                  variant={'outline'}
                >
                  Acessar Prova
                </Button>
              }
            >
              {description}
            </BaseCard>
          ))}
        </SimpleGrid>
      ) : (
        <Box p={4}>
          <AlertComponent
            title="Você não possui provas em aberto"
            statusType="info"
          />
        </Box>
      )}
      <HeadingHome headingText={'Provas Finalizadas'} />
      <Divider />
      {data2 && data2.provas.length > 0 ? (
        <Box p={4}>
          <AlertInfoContent>
            Os resultados das provas serão liberados pelos criadores da prova.
          </AlertInfoContent>
        </Box>
      ) : (
        <></>
      )}
      {data2 && data2.provas.length > 0 ? (
        <SimpleGrid p={4} columns={[1, 2, 3]} spacing={'40px'}>
          {data2?.provas.map(
            ({ prova_id, title, description, uuid, result }) => (
              <BaseCard
                key={prova_id}
                cardTitle={title}
                buttons={
                  result ? (
                    <Button
                      as={Link}
                      href={`prova/score/${uuid}`}
                      colorScheme={'blue'}
                      leftIcon={<Icon as={BsClipboardData} />}
                      variant={'outline'}
                    >
                      Visualizar Nota
                    </Button>
                  ) : (
                    <Button
                      variant={'outline'}
                      colorScheme={'blue'}
                      leftIcon={<Icon as={BiTime} />}
                      isDisabled
                    >
                      Aguardando Resultado
                    </Button>
                  )
                }
              >
                {description}
              </BaseCard>
            )
          )}
        </SimpleGrid>
      ) : (
        <Box p={4}>
          <AlertComponent
            title="Você não possui provas realizadas"
            statusType="info"
          />
        </Box>
      )}
    </>
  )
}

export default ParticipantHome
