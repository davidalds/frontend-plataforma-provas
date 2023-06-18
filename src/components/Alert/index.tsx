import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import { IPropsAlert } from './interfaces/alertInterface'

const AlertComponent = ({ title, statusType }: IPropsAlert) => {
  return (
    <Alert
      status={statusType}
      variant="left-accent"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
    </Alert>
  )
}

export default AlertComponent
