type timerOptsType = {
  label: string
  value: string
}

const factoryObj = (value: number): timerOptsType => ({
  label: `${value} minutos`,
  value: value + '',
})

const timerOpts: Array<timerOptsType> = [
  factoryObj(5),
  factoryObj(15),
  factoryObj(30),
  factoryObj(60),
  factoryObj(90),
  factoryObj(120),
  factoryObj(150),
]

export default timerOpts
