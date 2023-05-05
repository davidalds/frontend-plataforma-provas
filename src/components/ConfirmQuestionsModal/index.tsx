import BaseModal from 'components/Modal'
import { IPropsQuestionConfirmModal } from './interfaces/confirmQuestion'
import { Circle, HStack, Spacer, Text, VStack } from '@chakra-ui/react'

const ConfirmQuestionModal = ({
  isOpen,
  onClose,
  questionsEmptyList,
  sendProva,
}: IPropsQuestionConfirmModal) => {
  return (
    <>
      <BaseModal
        modalTitle={'Confirmar finalização da prova?'}
        isOpen={isOpen}
        onClose={onClose}
        confirmAction={sendProva}
      >
        {questionsEmptyList.length ? (
          <VStack alignItems={'baseline'}>
            <Text fontSize={'lg'}>As seguintes questões estão em branco:</Text>
            <Spacer />
            <HStack spacing={2} wrap={'wrap'}>
              {questionsEmptyList.map((elem) => (
                <Circle key={elem} size="25px" bg="salmon" color="white">
                  <Text fontSize={'lg'} fontWeight={'bold'}>
                    {elem}
                  </Text>
                </Circle>
              ))}
            </HStack>
          </VStack>
        ) : (
          <></>
        )}
      </BaseModal>
    </>
  )
}

export default ConfirmQuestionModal
