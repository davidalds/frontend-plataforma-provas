import * as Yup from 'yup'

const optionSchema = {
  option_title: Yup.string().trim().required('Campo obrigatório'),
  iscorrect: Yup.string().required('Campo obrigatório'),
}

const questionSchema = {
  question_title: Yup.string().required('Campo obrigatório').trim(),
  peso: Yup.number()
    .typeError('Campo obrigatório')
    .min(1, 'Valor mínimo 1')
    .max(10, 'Valor máximo 10'),
  options: Yup.array().of(Yup.object(optionSchema)),
}

const schema = Yup.object().shape({
  questions: Yup.array().of(Yup.object(questionSchema)),
})

export default schema
