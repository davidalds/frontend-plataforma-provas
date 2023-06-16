import { Button, Divider, HStack, Heading, Icon } from '@chakra-ui/react'
import { IPropsHeaderProvaInfo } from './interfaces/headerProvaInfo'

const HeaderProvaInfo = ({
  title,
  buttonIcon,
  buttonTitle,
  onClickFunction,
}: IPropsHeaderProvaInfo) => {
  return (
    <>
      <HStack justifyContent={'space-between'}>
        <Heading size={'md'} color={'mainBlue.700'}>
          {title}
        </Heading>
        <Button
          size={'sm'}
          colorScheme={'blue'}
          leftIcon={<Icon as={buttonIcon} />}
          onClick={onClickFunction}
        >
          {buttonTitle}
        </Button>
      </HStack>
      <Divider />
    </>
  )
}

export default HeaderProvaInfo
