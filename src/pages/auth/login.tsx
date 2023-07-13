import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Heading, VStack, Input, Button, useToast, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import WrapFormInput from 'components/Form/WrapFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginForm } from '../../types/loginTypes'
import { useState } from 'react'
import schema from '../../schemas/loginSchema'
import Link from 'next/link'
import Logo2 from '../../../assets/logo2.png'
import Image from 'next/image'

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const toast = useToast({ duration: 3000, isClosable: true, position: 'top' })

  const submit = async (data: LoginForm) => {
    try {
      setLoading(true)
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
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <Box
      minH={'100vh'}
      w={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <VStack
        w={'500px'}
        as={'form'}
        onSubmit={handleSubmit(submit)}
        boxShadow={'md'}
        p={4}
        rounded={'lg'}
      >
        <Head>
          <title>Plataforma Provas - Login</title>
        </Head>
        <Image
          src={Logo2}
          alt="Logo Plataforma Provas"
          width={300}
          height={300}
        />
        <Heading color={'mainBlue.500'} size={'md'}>
          Login
        </Heading>
        <WrapFormInput label="E-mail:" errors={errors.email}>
          <Input
            type="email"
            {...register('email')}
            placeholder="Insira o e-mail"
          ></Input>
        </WrapFormInput>
        <WrapFormInput label="Senha:" errors={errors.password}>
          <Input
            type="password"
            {...register('password')}
            placeholder="Insira a senha"
          ></Input>
        </WrapFormInput>
        <Button type="submit" colorScheme="blue" w={'100%'} isLoading={loading}>
          Entrar
        </Button>
        <Button
          colorScheme="green"
          w={'100%'}
          variant={'outline'}
          as={Link}
          href={'/auth/register'}
        >
          Novo Usuário
        </Button>
      </VStack>
    </Box>
  )
}

export default LoginPage
