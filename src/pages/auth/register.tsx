import { Box, Button, Heading, Input, Select, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { registerForm } from '../../types/registerTypes'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../../schemas/registerSchema'
import WrapFormInput from 'components/Form/WrapFormInput'
import WrapInputs from 'components/Form/WrapInputs'
import Link from 'next/link'
import { useToastHook } from '../../hooks/useToast'
import Logo2 from '../../../assets/logo2.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import api from '../../services'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerForm>({
    resolver: yupResolver(schema),
  })

  const toast = useToastHook()
  const router = useRouter()

  const submit = async (data: registerForm) => {
    try {
      delete data.confirmPassword

      await api.post('register/', data)

      router.replace('/auth/login')
      toast({ status: 'success', title: 'Cadastro realizado com sucesso!' })
    } catch (error) {
      toast({ status: 'error', title: 'Ocorreu um erro ao cadastrar usuário' })
    }
  }

  return (
    <Box
      minH={'100vh'}
      w={'100%'}
      display={'flex'}
      as={'form'}
      onSubmit={handleSubmit(submit)}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <VStack w={'500px'} boxShadow={'md'} p={4} rounded={'lg'}>
        <Head>
          <title>Plataforma Provas - Cadastro</title>
        </Head>
        <Image
          src={Logo2}
          alt="Logo Plataforma Provas"
          width={300}
          height={300}
        />
        <Heading color={'mainBlue.500'} size={'md'}>
          Cadastro
        </Heading>
        <WrapFormInput label="Nome de usuário" errors={errors.username}>
          <Input
            type="text"
            {...register('username')}
            placeholder="Insira um nome de usuário"
          ></Input>
        </WrapFormInput>
        <WrapFormInput label="E-mail" errors={errors.email}>
          <Input
            type="email"
            {...register('email')}
            placeholder="Insira o e-mail"
          ></Input>
        </WrapFormInput>
        <WrapFormInput label="Tipo de usuário" errors={errors.user_type}>
          <Select {...register('user_type')}>
            <option value="">Selecione um tipo de usuário</option>
            <option value="1">Criador</option>
            <option value="2">Participante</option>
          </Select>
        </WrapFormInput>
        <WrapInputs cols={[1, 2]}>
          <WrapFormInput label="Senha" errors={errors.password}>
            <Input
              type="password"
              {...register('password')}
              placeholder="Insira a senha"
            ></Input>
          </WrapFormInput>
          <WrapFormInput
            label="Confirmar senha"
            errors={errors.confirmPassword}
          >
            <Input
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirme a senha"
            ></Input>
          </WrapFormInput>
        </WrapInputs>
        <Button type="submit" colorScheme="blue" w={'100%'}>
          Cadastrar
        </Button>
        <Button
          colorScheme="green"
          w={'100%'}
          variant={'outline'}
          as={Link}
          href={'/auth/login'}
        >
          Ir para tela de login
        </Button>
      </VStack>
    </Box>
  )
}

export default Register
