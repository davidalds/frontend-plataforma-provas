import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Icon,
} from '@chakra-ui/react'
import { IPropsBaseCard } from './interfaces/baseCard'
import Link from 'next/link'

const BaseCard = ({
  cardTitle,
  children,
  cardButtonLink,
  cardButtonTitle,
  cardButtonIcon,
}: IPropsBaseCard) => {
  return (
    <Card>
      <CardHeader>
        <Heading size={'md'} color={'mainBlue.700'} textTransform={'uppercase'}>
          {cardTitle}
        </Heading>
      </CardHeader>
      <CardBody>{children}</CardBody>
      <CardFooter justifyContent={'flex-end'}>
        {cardButtonLink && cardButtonTitle ? (
          <Button
            as={Link}
            href={cardButtonLink}
            colorScheme={'blue'}
            variant={'outline'}
            leftIcon={cardButtonIcon && <Icon as={cardButtonIcon} />}
          >
            {cardButtonTitle}
          </Button>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  )
}

export default BaseCard
