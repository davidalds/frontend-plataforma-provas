import * as Yup from 'yup'

const schema = Yup.object().shape({
  title: Yup.string().trim().required('Campo obrigatório'),
  description: Yup.string().trim().required('Campo obrigatório'),
  timer: Yup.string().required('Campo obrigatório'),
  initial_date: Yup.string().required('Campo obrigatório'),
  end_date: Yup.string().required('Campo obrigatório'),
})

export default schema
