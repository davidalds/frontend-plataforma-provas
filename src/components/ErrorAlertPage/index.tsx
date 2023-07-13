import AlertComponent from 'components/Alert'
import { IPropsErrorsAlert } from './types'
import { Box } from '@chakra-ui/react'

const ErrorAlertPage = ({ errorTitle, error, children }: IPropsErrorsAlert) => {
  return error ? (
    <Box p={4}>
      <AlertComponent
        title={errorTitle ? errorTitle : 'Ocorreu um erro'}
        statusType="error"
      />
    </Box>
  ) : (
    <>{children}</>
  )
}

export default ErrorAlertPage
