import * as fs from 'fs'

let testArray1: string[] = ["199", "200", "208", "210", "200", "207", "240", "269", "260", "263"]

let array: string[]
array = fs.readFileSync('input.txt', 'utf-8').split('\n')

// part 1

function getLargerMeasurements(inputArr: string[], numberOfMeasurements: number): string[] {

    let resultArr: string[] = []
    inputArr.forEach((value: string, index: number, arr: string[]) => {
        if (index >= numberOfMeasurements) {
            let currentSum: number = 0
            let previousSum: number = 0
            for (let i = index - numberOfMeasurements; i < index; i++) {
                previousSum = previousSum + parseInt(arr[i])
            }
            for (let i = index - numberOfMeasurements + 1; i <= index; i++) {
                currentSum = currentSum + parseInt(arr[i])
            }
            if (currentSum > previousSum) {
                resultArr.push(value)
            }
        }
    })
    return resultArr;
}

// test 1

if (getLargerMeasurements(testArray1, 1).length != 7) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 1: " + getLargerMeasurements(array, 1).length)

// test 2

if (getLargerMeasurements(testArray1, 3).length != 5) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 2: " + getLargerMeasurements(array, 3).length)
