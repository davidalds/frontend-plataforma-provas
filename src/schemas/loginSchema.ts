import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string().required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
})

export default schema
