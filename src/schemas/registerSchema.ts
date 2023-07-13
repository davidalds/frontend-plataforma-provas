import * as Yup from 'yup'

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Campo obrigatório')
    .trim()
    .min(3, 'Tamanho mínimo deve ser 3')
    .max(20, 'Tamanho máximo 20')
    .matches(/^\S*$/, 'Não deve haver espaços em branco'),
  email: Yup.string()
    .email('E-mail deve ser válido')
    .required('Campo obrigatório')
    .trim(),
  user_type: Yup.string().required('Campo obrigatório'),
  password: Yup.string()
    .required('Campo obrigatório')
    .trim()
    .min(5, 'Tamanho mínimo deve ser 5'),
  confirmPassword: Yup.string()
    .required('Campo obrigatório')
    .test('isPasswordEqual', 'Senha diferentes', (value, ctx) => {
      return value === ctx.parent.password
    }),
})

export default schema
