import { Box, Divider, HStack, Heading, SimpleGrid } from '@chakra-ui/react'
import BaseCard from 'components/Card'
import { ProvaResponse } from '../../services/queries/provas'
import { AiOutlineProfile } from 'react-icons/ai'
import { BsClipboardData } from 'react-icons/bs'
import AlertComponent from 'components/Alert'
import HeadingHome from 'components/HeadingHome'

interface IPropsParticipantHome {
  data: ProvaResponse | undefined
  data2: ProvaResponse | undefined
}

const ParticipantHome = ({ data, data2 }: IPropsParticipantHome) => {
  return (
    <>
      <HeadingHome headingText={'Provas em Aberto'} />
      <Divider />
      {data && data.provas.length > 0 ? (
        <SimpleGrid p={4} columns={[1, 2, 3]} spacing={'40px'}>
          {data?.provas.map(({ prova_id, uuid, title, description }) => (
            <BaseCard
              key={prova_id}
              cardTitle={title}
              cardButtonLink={`prova/${uuid}`}
              cardButtonTitle={'Acessar prova'}
              cardButtonIcon={AiOutlineProfile}
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
        <SimpleGrid p={4} columns={[1, 2, 3]} spacing={'40px'}>
          {data2?.provas.map(({ prova_id, title, description, uuid }) => (
            <BaseCard
              key={prova_id}
              cardTitle={title}
              cardButtonLink={`prova/score/${uuid}`}
              cardButtonTitle={'Visualizar nota'}
              cardButtonIcon={BsClipboardData}
            >
              {description}
            </BaseCard>
          ))}
        </SimpleGrid>
      ) : (
        <Box p={4}>
          <AlertComponent
            title="Você não possui provas finalizadas"
            statusType="info"
          />
        </Box>
      )}
    </>
  )
}

export default ParticipantHome
