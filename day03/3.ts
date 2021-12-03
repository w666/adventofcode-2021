import * as fs from 'fs'
import { type } from 'os'

let testArray1: string[] = ["00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010"]

let array: string[]
array = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(line => line != '')

// part 1

function makeBinaryArray(array: string[]): number[][] {
    let binaryArr: number[][] = []
    array.forEach((value: string, index: number) => {
        binaryArr.push([])
        value.split("").forEach((binaryValue: string) => {
            binaryArr[index].push(parseInt(binaryValue))
        })
    })
    return binaryArr
}

type GammaEpsilon = {
    "gamma": number,
    "epsilon": number
}

function getCommonNumbers(array: number[][], mostCommonOne: boolean, part2: boolean): string {
    let numbers: string[] = []
    for (let i = 0; i < array[0].length; i++) {
        let one: number = 0
        let zero: number = 0
        for (let j = 0; j < array.length; j++) {
            if (array[j][i] == 1) one++
            else if (array[j][i] == 0) zero++
        }
        if (part2) {
            if (mostCommonOne) {
                if (one >= zero) {
                    numbers.push("1")
                } else {
                    numbers.push("0")
                }
            }
            else {
                if (one >= zero) {
                    numbers.push("0")
                }  else {
                    numbers.push("1")
                }
            }
        } else {
            if (one >= zero) {
                if (mostCommonOne) {
                    numbers.push("1")
                } else {
                    numbers.push("0")
                }
            }
            else {
                if (mostCommonOne) {
                    numbers.push("0")
                } else {
                    numbers.push("1")
                }
            }
        }
    }
    return numbers.join("")
}

function getGammaEpsilon(array: number[][]): GammaEpsilon {
    let gammaEpsilon: GammaEpsilon = {
        "gamma": 0,
        "epsilon": 0
    }
    const mostCommon: boolean = true
    const leastCommon: boolean = false
    const PART1: boolean = false
    let gamma: string = getCommonNumbers(array, mostCommon, PART1)
    let epsilon: string = getCommonNumbers(array, leastCommon, PART1)

    gammaEpsilon.gamma = parseInt(gamma, 2)
    gammaEpsilon.epsilon = parseInt(epsilon, 2)
    return gammaEpsilon
}

function getPowerConsumption(gammaEpsilon: GammaEpsilon): number {
    return gammaEpsilon.gamma * gammaEpsilon.epsilon
}

// test 1

if (getPowerConsumption(getGammaEpsilon(makeBinaryArray(testArray1))) != 198) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 1: " + getPowerConsumption(getGammaEpsilon(makeBinaryArray(array))))

// part 2

type OxygenCO2 = {
    "co2": number,
    "oxygen": number
}

function filterOxygenCO2(array: number[][], oxygen: boolean): string {
    let result: number[][] = []
    let tmpArray: number[][] = array
    const PART2: boolean = true
    for (let i=0; i<array[0].length; i++) {
        let co2Numbers: string = getCommonNumbers(tmpArray, oxygen, PART2)
        result = []
        for (let j=0; j<tmpArray.length; j++) {
            if(tmpArray[j][i] == parseInt(co2Numbers[i])) {
                result.push(tmpArray[j])
            }
        }
        tmpArray = result
        if (result.length == 1) {
            break
        }
    }
    return result[0].join("")
} 

function getOxygenCO2(array: number[][]): OxygenCO2 {
    let oxygenCO2: OxygenCO2 = {
        "co2": 0,
        "oxygen": 0
    }
    const OXYGEN: boolean = true
    const CO2: boolean = false

    oxygenCO2.oxygen = parseInt(filterOxygenCO2(array, OXYGEN), 2)
    oxygenCO2.co2 = parseInt(filterOxygenCO2(array, CO2), 2)
    return oxygenCO2
}

function getLifeSupportingRating(lifeOxygen: OxygenCO2): number {
    return lifeOxygen.co2 * lifeOxygen.oxygen
}

// test 2

if (getLifeSupportingRating(getOxygenCO2(makeBinaryArray(testArray1))) != 230) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 2: " + getLifeSupportingRating(getOxygenCO2(makeBinaryArray(array))))