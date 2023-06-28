import { Button, ButtonGroup, HStack, Icon, IconButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { IPropsPagination } from './interfaces/pagination'

const Pagination = ({
  totalDataElements,
  limitPerPage,
  totalShowedButtonsInPagination,
  offsetFc,
}: IPropsPagination) => {
  const totalElements = totalDataElements
  const limit = limitPerPage
  const pagesTotal = Number.isInteger(totalElements / limit)
    ? totalElements / limit
    : Math.ceil(totalElements / limit)
  const buttonsLimit =
    totalShowedButtonsInPagination > pagesTotal
      ? pagesTotal
      : totalShowedButtonsInPagination
  const [page, setPage] = useState<number>(1)
  const [indexSum, setIndexSum] = useState<number>(1)
  const [minButtonValue, setMinButtonValue] = useState<number>(1)
  const [maxButtonValue, setMaxButtonValue] = useState<number>(buttonsLimit)

  useEffect(() => {
    offsetFc((page - 1) * limit)
    if (page < minButtonValue) {
      handleChangeStatesButtons(-1)
    }

    if (page > maxButtonValue) {
      handleChangeStatesButtons(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleChangeStatesButtons = (n: number) => {
    setIndexSum((prevState) => prevState + n)
    setMinButtonValue((prevState) => prevState + n)
    setMaxButtonValue((prevState) => prevState + n)
  }

  const handleCustomPage = (n_value: number) => {
    setPage(n_value)
  }

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevState) => prevState - 1)
    }
  }

  const handleNextPage = () => {
    if (page < pagesTotal) {
      setPage((prevState) => prevState + 1)
    }
  }

  const handleStart = () => {
    if (page > 1) {
      setPage(1)
      setMinButtonValue(1)
      setMaxButtonValue(buttonsLimit)
      setIndexSum(1)
    }
  }

  const handleEnd = () => {
    if (page !== pagesTotal) {
      setPage(pagesTotal)
      setMinButtonValue(pagesTotal - (buttonsLimit - 1))
      setMaxButtonValue(pagesTotal)
      setIndexSum(pagesTotal - (buttonsLimit - 1))
    }
  }

  return (
    <>
      <HStack p={2} justifyContent={'center'} m={4}>
        <Button
          size={'sm'}
          colorScheme={'blue'}
          variant={'outline'}
          isDisabled={page === 1}
          onClick={handleStart}
        >
          Início
        </Button>
        <IconButton
          aria-label="anterior"
          icon={<Icon as={AiOutlineArrowLeft} />}
          colorScheme={'blue'}
          size={'sm'}
          isDisabled={page === 1}
          onClick={handlePrevPage}
        />
        <ButtonGroup spacing={2}>
          {minButtonValue !== 1 ? <span>...</span> : <></>}
          {Array.from({ length: buttonsLimit }).map((_, index) => (
            <Button
              key={index + indexSum}
              variant={'outline'}
              colorScheme={'blue'}
              size={'sm'}
              rounded={'50%'}
              onClick={() => handleCustomPage(index + indexSum)}
              isActive={page === index + indexSum}
            >
              {index + indexSum}
            </Button>
          ))}
          {maxButtonValue < pagesTotal ? <span>...</span> : <></>}
        </ButtonGroup>
        <IconButton
          aria-label="próximo"
          icon={<Icon as={AiOutlineArrowRight} />}
          colorScheme={'blue'}
          size={'sm'}
          isDisabled={page === Math.ceil(totalElements / limit)}
          onClick={handleNextPage}
        />
        <Button
          size={'sm'}
          colorScheme={'blue'}
          variant={'outline'}
          isDisabled={page === Math.ceil(totalElements / limit)}
          onClick={handleEnd}
        >
          Final
        </Button>
      </HStack>
    </>
  )
}

export default Pagination
