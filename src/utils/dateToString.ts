const formatDateToString = (dateValue: Date | string): string => {
  const date = new Date(dateValue)

  const [y, mo, d, h, mi] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ]

  const strH = `${h < 10 ? '0' + h : h}:${mi < 10 ? '0' + mi : mi}`

  const str = `${y}-${mo < 10 ? '0' + mo : mo}-${d < 10 ? '0' + d : d} ${strH}`

  return str
}

export { formatDateToString }
