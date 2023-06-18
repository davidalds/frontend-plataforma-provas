import {
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react'
import BaseCard from 'components/Card'
import Link from 'next/link'
import { IoIosAdd } from 'react-icons/io'
import { ProvaResponse } from 'services/queries/provas'
import { AiOutlineFileSearch } from 'react-icons/ai'

interface IPropsParticipantHome {
  data: ProvaResponse | undefined
}

const CreatorHome = ({ data }: IPropsParticipantHome) => {
  return (
    <>
      <HStack p={4} w={'100%'} justifyContent={'space-between'}>
        <Heading size={'lg'} color={'mainBlue.600'} fontWeight={'medium'}>
          Provas criadas
        </Heading>
        <Button
          as={Link}
          colorScheme={'blue'}
          href={'/prova/create'}
          leftIcon={<Icon as={IoIosAdd} h={5} w={5} />}
        >
          Criar Nova Prova
        </Button>
      </HStack>
      <Divider />
      <SimpleGrid p={4} columns={[1, 2, 3]} spacing={'40px'}>
        {data?.provas.map(({ prova_id, title, description, uuid }) => (
          <BaseCard
            key={prova_id}
            cardTitle={title}
            cardButtonLink={`prova/info/${uuid}`}
            cardButtonTitle={'Visualizar informações'}
            cardButtonIcon={AiOutlineFileSearch}
          >
            {description}
          </BaseCard>
        ))}
      </SimpleGrid>
    </>
  )
}

export default CreatorHome
