import BaseModal from 'components/Modal'
import { IPropsConfirmDeleteQuestion } from './types'

const ConfirmDeleteQuestion = ({
  isOpen,
  onClose,
  removeQuestion,
}: IPropsConfirmDeleteQuestion) => {
  return (
    <BaseModal
      modalTitle="Confirmar exclusão"
      isOpen={isOpen}
      onClose={onClose}
      confirmAction={() => removeQuestion()}
    >
      <h1>Deseja confirmar a exclusão da questão?</h1>
    </BaseModal>
  )
}

export default ConfirmDeleteQuestion
