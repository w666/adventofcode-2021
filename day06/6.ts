import * as fs from 'fs'
import { type } from 'os'

let testArray1: number[] = [3, 4, 3, 1, 2]

let array: number[]
array = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(line => line != '')[0].split(",").map(value => { return parseInt(value) })

function populateFishes(arrayOfFishes: number[]): number[] {
    let fishes: number[] = Array(9).fill(0)
    arrayOfFishes.forEach(value => {
        fishes[value] += 1
    })
    return fishes
}

function growFishes(fishes: number[], days: number): number {
    for (let day = 1; day <= days; day++) {
        let tmpFishes: number[] = Array(9).fill(0)
        for (let index = 0; index < fishes.length; index++) {
            let numberOfFishes = fishes[index]
            if (numberOfFishes > 0) {
                if (index > 0) {
                    tmpFishes[index-1] += numberOfFishes
                } else if (index == 0) {
                    tmpFishes[8] += numberOfFishes
                    tmpFishes[6] += numberOfFishes
                }
            }
        }
        fishes = tmpFishes
    }
    let sum: number = 0
    fishes.forEach(value => {
        sum += value
    })
    return sum
    }

    // test 1

    if (growFishes(populateFishes(testArray1), 80) != 5934) {
        throw "Test failed"
    } else {
        console.log("Test passed!")
    }

    console.log("part 1: " + growFishes(populateFishes(array), 80))


    // test 2

    if (growFishes(populateFishes(testArray1), 256) != 26984457539) {
        throw "Test failed"
    } else {
        console.log("Test passed!")
    }

    console.log("part 2: " + growFishes(populateFishes(array), 256))