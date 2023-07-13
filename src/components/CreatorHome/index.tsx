import {
  Box,
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
import { ProvaResponse } from '../../services/queries/provas'
import { AiOutlineFileSearch } from 'react-icons/ai'
import AlertComponent from 'components/Alert'
import HeadingHome from 'components/HeadingHome'

interface IPropsCreatorHome {
  data: ProvaResponse | undefined
}

const CreatorHome = ({ data }: IPropsCreatorHome) => {
  return (
    <>
      <HeadingHome headingText={'Provas criadas'}>
        <Button
          as={Link}
          colorScheme={'blue'}
          href={'/prova/create'}
          leftIcon={<Icon as={IoIosAdd} h={5} w={5} />}
        >
          Criar Nova Prova
        </Button>
      </HeadingHome>
      <Divider />
      {data && data.provas.length > 0 ? (
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
      ) : (
        <Box p={4}>
          <AlertComponent
            title={'Você não possui provas criadas'}
            statusType="info"
          />
        </Box>
      )}
    </>
  )
}

export default CreatorHome
