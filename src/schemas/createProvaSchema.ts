import * as Yup from 'yup'

const optionSchema = {
  title: Yup.string().trim().required('Campo obrigatório'),
  iscorrect: Yup.string().required('Campo obrigatório'),
}

const questionSchema = {
  title: Yup.string().trim().required('Campo obrigatório'),
  // typeError permite que se capture o erro de tipo gerado no campo number quando o mesmo estiver em branco, lançando uma mensagem customizada de "Campo obrigatório"
  peso: Yup.number()
    .typeError('Campo obrigatório')
    .min(1, 'Valor mínimo é 1')
    .max(10, 'Valor máximo é 10'),
  options: Yup.array().of(Yup.object(optionSchema)),
}

const schema = Yup.object().shape({
  title: Yup.string().trim().required('Campo obrigatório'),
  description: Yup.string().trim().required('Campo obrigatório'),
  initial_date: Yup.string().required('Campo obrigatório'),
  end_date: Yup.string().required('Campo obrigatório'),
  questions: Yup.array().of(Yup.object(questionSchema)),
})

export default schema
