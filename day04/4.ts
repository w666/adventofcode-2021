import * as fs from 'fs'
import { type } from 'os'

let testArray1: string[] = [
    "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1",
    "",
    "22 13 17 11  0",
    " 8  2 23  4 24",
    "21  9 14 16  7",
    " 6 10  3 18  5",
    " 1 12 20 15 19",
    "",
    " 3 15  0  2 22",
    " 9 18 13 17  5",
    "19  8  7 25 23",
    "20 11 10 24  4",
    "14 21 16 12  6",
    "",
    "14 21 17 24  4",
    "10 16 15  9 19",
    "18  8 23 26 20",
    "22 11 13  6  5",
    " 2  0 12  3  7"
]

let array: string[]
array = fs.readFileSync('input.txt', 'utf-8').split('\n')

type BingoCard = {
    numbers: number[][],
    markedNumbers: boolean[][],
    won: boolean
}

let drawnNumbers: string[] = []
let arrayOfCards: BingoCard[] = []

function getDrawnNumbers(array: string[]): number[] {
    return array[0].split(",").map(function (value) {
        return parseInt(value)
    })
}

function getCards(array: string[]): BingoCard[] {
    let bingoCards: BingoCard[] = []
    for (let i = 2; i < array.length; i++) {
        if (array[i] != "") {
            let bingoCard: BingoCard = {
                numbers: [],
                markedNumbers: [],
                won: false
            }
            for (let j = i; j < i + 5; j++) {
                bingoCard.numbers.push(array[j].trim().split(/\s+/).map(function (value) {
                    return parseInt(value)
                })
                )
                bingoCard.markedNumbers.push([false, false, false, false, false])
            }
            i += 5
            bingoCards.push(bingoCard)
        }
    }
    return bingoCards
}

function getSumOfUnmarkedNumbers(card: BingoCard): number {
    let sum: number = 0
    for (let i = 0; i < card.numbers.length; i++) {
        for (let j = 0; j < card.numbers.length; j++) {
            if (card.markedNumbers[i][j] == false) {
                sum += card.numbers[i][j]
            }
        }
    }
    return sum
}

function findWinnersScore(bingoCards: BingoCard[], lastWinnerCard: boolean = false): number {
    let lastCard: BingoCard = {
        "numbers": [],
        "markedNumbers": [],
        won: false
    }
    for (let card of bingoCards) {
        if (card.won == false) {
            // check rows
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (card.markedNumbers[i][j] == false) {
                        break
                    }
                    if (j == 4) {
                        card.won = true
                        if (lastWinnerCard) {
                            lastCard = card
                        } else {
                            return getSumOfUnmarkedNumbers(card)
                        }
                    }
                }
            }
            // check columns
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (card.markedNumbers[j][i] == false) {
                        break
                    }
                    if (j == 4) {
                        card.won = true
                        if (lastWinnerCard) {
                            lastCard = card
                        } else {
                            return getSumOfUnmarkedNumbers(card)
                        }
                    }
                }
            }
        }
    }
    if (lastWinnerCard) {
        return getSumOfUnmarkedNumbers(lastCard)
    } else {
        return 0
    }
}

function fillInCardsUntilSomeoneWinAndGetScore(bingoCards: BingoCard[], drawnNumbers: number[], lastWinnerCard: boolean = false): number {
    let lastResult: number = 0
    for (let drawnNumber of drawnNumbers) {
        for (let cardIndex = 0; cardIndex < bingoCards.length; cardIndex++) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (bingoCards[cardIndex].numbers[i][j] == drawnNumber) {
                        bingoCards[cardIndex].markedNumbers[i][j] = true
                        let sum: number = findWinnersScore(bingoCards, false)
                        if (sum != 0) {
                            lastResult = sum * drawnNumber
                            if (lastWinnerCard == false) {
                                return lastResult
                            }
                        }
                    }

                }
            }
        }
    }
    if (lastWinnerCard) {
        return lastResult
    } else {
        throw "Winner not found"
    }
}

// test 1

if (fillInCardsUntilSomeoneWinAndGetScore(getCards(testArray1), getDrawnNumbers(testArray1)) != 4512) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 1: " + fillInCardsUntilSomeoneWinAndGetScore(getCards(array), getDrawnNumbers(array)))

// test 2
if (fillInCardsUntilSomeoneWinAndGetScore(getCards(testArray1), getDrawnNumbers(testArray1), true) != 1924) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 2: " + fillInCardsUntilSomeoneWinAndGetScore(getCards(array), getDrawnNumbers(array), true))