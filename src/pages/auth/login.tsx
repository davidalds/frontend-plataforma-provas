import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import {
  Heading,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const LoginPage = () => {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const toast = useToast({ duration: 3000, isClosable: true, position: 'top' })

  const submit = async (data: any) => {
    try {
      const login = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: 'http://localhost:3000/',
      })

      if (login?.ok) {
        router.replace(login.url!)
      } else {
        if (login?.status === 401) {
          toast({ title: 'E-mail ou senha incorretos', status: 'error' })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <VStack w={'500px'} m={'auto'} as={'form'} onSubmit={handleSubmit(submit)}>
      <Heading>Login Page</Heading>
      <FormControl>
        <FormLabel>E-mail:</FormLabel>
        <Input type="email" {...register('email')}></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Senha:</FormLabel>
        <Input type="password" {...register('password')}></Input>
      </FormControl>
      <Button type="submit" colorScheme="blue" w={'100%'}>
        Entrar
      </Button>
    </VStack>
  )
}

export default LoginPage
