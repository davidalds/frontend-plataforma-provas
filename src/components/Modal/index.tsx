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
}: IPropsBaseModal) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg={'none'} />
      <ModalContent>
        <ModalHeader color={'mainBlue.700'}>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
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
