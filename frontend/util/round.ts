const round = (num: number, places: number) => {
  const mult = Math.pow(10, places)
  return Math.round((num + Number.EPSILON) * mult) / mult
}

export default round
