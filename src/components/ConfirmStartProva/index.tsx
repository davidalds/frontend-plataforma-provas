import BaseModal from 'components/Modal'
import { IPropsConfirmStartProva } from './types'

const ConfirmStartProva = ({
  isOpen,
  onClose,
  startProva,
}: IPropsConfirmStartProva) => {
  return (
    <BaseModal
      modalTitle={'Confirmar início de prova'}
      isOpen={isOpen}
      onClose={onClose}
      confirmAction={() => startProva()}
    >
      <h1>
        Após iniciar a prova ela deverá ser feita no tempo estabelecido, não
        podendo ser feita novamente após sair da área de prova. Deseja confirmar
        o início da prova?
      </h1>
    </BaseModal>
  )
}

export default ConfirmStartProva
