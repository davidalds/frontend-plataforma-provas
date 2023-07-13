import * as Yup from 'yup'

const schema = Yup.object().shape({
  title: Yup.string().required('Campo obrigatório').trim(),
  description: Yup.string().required('Campo obrigatório').trim(),
})

export default schema
