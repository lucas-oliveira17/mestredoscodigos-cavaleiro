const hasError = param => param instanceof Error

const duplicateArray = array => array.concat(array)

const raffleArray = array => array.sort(() => Math.random() - 0.5)

export { hasError, raffleArray, duplicateArray }