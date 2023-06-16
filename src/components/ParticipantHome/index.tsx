import { Divider, HStack, Heading, SimpleGrid } from '@chakra-ui/react'
import BaseCard from 'components/Card'
import { ProvaResponse } from 'services/queries/provas'

interface IPropsParticipantHome {
  data: ProvaResponse | undefined
  data2: ProvaResponse | undefined
}

const ParticipantHome = ({ data, data2 }: IPropsParticipantHome) => {
  return (
    <>
      <HStack p={4} w={'100%'}>
        <Heading size={'lg'} color={'mainBlue.600'} fontWeight={'medium'}>
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
        <Heading size={'lg'} color={'mainBlue.600'} fontWeight={'medium'}>
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
  )
}

export default ParticipantHome
