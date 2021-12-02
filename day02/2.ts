import * as fs from 'fs'
import { type } from 'os'

let testArray1: string[] = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"]

let array: string[]
array = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(line => line != '')

// part 1
type Result = {"forward": number, "down": number, "aim": number}

function getSubmarinePosition(inputArr: string[], partTwo: boolean = false): Result {

    let result: Result = {"forward": 0, "down": 0, "aim": 0}
    inputArr.forEach((value: string) => {
        let subArr: string[] = value.split(" ")
        let move: string = subArr[0]
        let x: number = parseInt(subArr[1])
            if ("forward".match(move) ){
                result.forward = result.forward + x
                if (partTwo) {
                    result.down = result.down + (result.aim * x)
                }

            } else if ("down".match(move)) {
                if (partTwo) {
                    result.aim = result.aim + x
                } else {
                    result.down = result.down + x
                }
            } else if ("up".match(move)) {
                if (partTwo) {
                    result.aim = result.aim - x
                } else {
                    result.down = result.down - x
                }
            } else {
                throw "Unexpected data: " + subArr
            }
    })
    return result;
}

function multiplyResult(result: Result): number {
    let res: number = result.forward * result.down
    return res
}

// test 1

if (multiplyResult(getSubmarinePosition(testArray1)) != 150) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 1: " + multiplyResult(getSubmarinePosition(array)))


// test 2

if (multiplyResult(getSubmarinePosition(testArray1, true)) != 900) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 2: " + multiplyResult(getSubmarinePosition(array, true)))
