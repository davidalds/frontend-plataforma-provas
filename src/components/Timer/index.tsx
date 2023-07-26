import { Box, HStack, Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiTime } from 'react-icons/bi'

interface IPropsTimer {
  timer: number
  forceEndProva(): void
}

const Timer = ({ timer, forceEndProva }: IPropsTimer) => {
  const [count, setCount] = useState(0)
  const [dateState, setDateState] = useState<Date>()

  const formatTimer = (d: Date) => {
    return `${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${
      d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    }:${d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()}`
  }

  const createData = (minutes: number) => {
    const date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMinutes(minutes)
    setDateState(date)
  }

  const decreaseTimer = (dateState: Date) => {
    const newState = dateState
    newState.setMilliseconds(-1)
    setDateState(newState)
  }

  const verifyTimer = (dateState: Date) => {
    if (
      dateState.getHours() === 0 &&
      dateState.getMinutes() === 0 &&
      dateState.getSeconds() === 0
    ) {
      return true
    }
  }

  useEffect(() => {
    if (count >= 0) {
      const id = setTimeout(() => setCount((prev) => prev + 1), 1000)
      if (dateState) {
        if (verifyTimer(dateState)) {
          setCount(-1)
          forceEndProva()
        } else {
          decreaseTimer(dateState)
        }
      }

      return () => {
        clearInterval(id)
      }
    }
  }, [count])

  useEffect(() => {
    if (count === 0 && timer) {
      createData(timer)
    }
  }, [])

  return (
    <HStack bgColor={'mainBlue.50'} p={2} rounded={'md'}>
      <Icon as={BiTime} boxSize={'5'} />
      <Text fontWeight={'bold'} fontSize={'lg'}>
        {dateState && formatTimer(dateState)}
      </Text>
    </HStack>
  )
}

export default Timer
