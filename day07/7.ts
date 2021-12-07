import * as fs from 'fs'
import { type } from 'os'

let testArray1: number[] = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

let array: number[]
array = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(line => line != '')[0].split(",").map(value => { return parseInt(value) })

function getAveragePosition(array: number[]): number {
    let sum: number = 0
    array.forEach(value => {
        sum += value
    })
    let mean = Math.round(sum / array.length)
    return mean
}

function getFuelForCrabEngine(moves: number): number {
    let crabFuel: number = 0
    if (moves == 0) return 0
    for (let i = 1; i <= moves; i++) {
        crabFuel += i
    }
    return crabFuel
}

function getFuelForPosition(array: number[], position: number, countMoves: boolean = false): number {
    let sum: number = 0
    array.forEach(value => {
        let moves: number = 0
        if (position > value) {
            moves = position - value
        } else {
            moves = value - position
        }
        if (countMoves) sum += getFuelForCrabEngine(moves)
        else sum += moves
    })
    return sum
}

function getFuelCost(array: number[], startPosition: number, countMoves: boolean = false): number {
    let numberOfMoves: number = 0
    let fuel: number = getFuelForPosition(array, startPosition, countMoves)
    // go up first
    while (true) {
        let tmpFuel = getFuelForPosition(array, startPosition + 1, countMoves)
        if (fuel > tmpFuel) {
            fuel = tmpFuel
            startPosition++
            numberOfMoves++
        } else break
    }
    // go down 
    while (true) {
        let tmpFuel = getFuelForPosition(array, startPosition - 1, countMoves)
        if (fuel > tmpFuel) {
            fuel = tmpFuel
            startPosition--
            numberOfMoves++
        } else break
    }
    return fuel
}


// test 1
if (getFuelCost(testArray1, getAveragePosition(testArray1)) != 37) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}
console.log("part 1: " + getFuelCost(array, getAveragePosition(array)))

// test 2
if (getFuelCost(testArray1, getAveragePosition(testArray1), true) != 168) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 2: " + getFuelCost(array, getAveragePosition(array), true))