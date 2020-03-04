import { hasError, duplicateArray, raffleArray } from '../utils/utils'

test('check if is instanceof error', () => {
    const paramToTest = Error('Service Unavailable')
    expect(hasError(paramToTest)).toBeTruthy();
})

test('check if array is duplicated', () => {
    const arrayToDuplicate = [1, 2, 3, 4, 5];
    expect(duplicateArray(arrayToDuplicate)).toEqual([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])
})

// test('check if array is raffling', () => {
//     const arrayToRaffle = [1, 2, 3, 4, 5];
//     const raffledArray = raffleArray(arrayToRaffle);
//     expect(raffledArray).toEqual(arrayToRaffle)
// })