const hasError = param => param instanceof Error

// eslint-disable-next-line
Array.prototype.duplicate = function () {
    return this.concat(this)
}

// eslint-disable-next-line
Array.prototype.raffle = function () {
    return this.sort(() => Math.random() - 0.5)
}

export { hasError }