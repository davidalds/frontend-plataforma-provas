import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  ModalOverlay,
  ModalCloseButton,
} from '@chakra-ui/react'
import { IPropsBaseModal } from './interfaces/baseModal'

const BaseModal = ({
  isOpen,
  onClose,
  modalTitle,
  children,
  confirmAction,
  modalSize,
  linkUsers,
}: IPropsBaseModal) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size={modalSize ? modalSize : 'md'}
    >
      <ModalOverlay bg={'none'} />
      <ModalContent>
        <ModalHeader color={'mainBlue.700'}>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {linkUsers ? (
            <Button colorScheme={'green'} onClick={linkUsers}>
              Vincular Usuário(s)
            </Button>
          ) : (
            <></>
          )}
          {confirmAction ? (
            <Button colorScheme={'green'} onClick={confirmAction}>
              Confirmar
            </Button>
          ) : (
            <></>
          )}
          <Button colorScheme={'gray'} onClick={onClose} ml={2}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BaseModal
