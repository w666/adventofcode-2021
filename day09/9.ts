import * as fs from 'fs'
import { parse } from 'path'

let testArray1: number[][] = ["2199943210", "3987894921", "9856789892", "8767896789", "9899965678"]
    .map(value => { return value.split("").map(num => { return parseInt(num) }) })


let array: number[][]
array = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(line => line != '').map(value => { return value.split("").map(num => { return parseInt(num) }) })

function checkY(a: number[][], y: number, x: number): boolean {
    if (y == 0) {
        return a[y][x] < a[y + 1][x]
    } else if (y == a.length - 1) {
        return a[y][x] < a[y - 1][x]
    }
    return a[y][x] < a[y - 1][x] && a[y][x] < a[y + 1][x]
}

function checkX(a: number[][], y: number, x: number): boolean {
    if (x == 0) {
        return a[y][x] < a[y][x + 1]
    } else if (x == a[0].length - 1) {
        return a[y][x] < a[y][x - 1]
    }
    return a[y][x] < a[y][x - 1] && a[y][x] < a[y][x + 1]
}

function getLowPoints(a: number[][]): number[][] {
    let lowPoints: number[][] = []
    const yLength = a.length
    const xLength = a[0].length
    for (let y = 0; y < yLength; y++) {
        for (let x = 0; x < xLength; x++) {
            if (checkY(a, y, x) && checkX(a, y, x)) {
                lowPoints.push([y, x])
            }
        }
    }
    return lowPoints
}

function getRiskLevel(a: number[][], lowPoints: number[][]): number {
    let sum: number = 0
    lowPoints.forEach(value => {
        sum += a[value[0]][value[1]] + 1
    })
    return sum
}

function lookAround(a: number[][], tmpMap: number[][], y: number, x: number): number[][] {
    if (y == 0) {
        if (a[y+1][x] < 9) tmpMap[y+1][x] = 1
    } else if (y == a.length - 1) {
        if (a[y-1][x] < 9) tmpMap[y-1][x] = 1
    } else {
        if (a[y+1][x] < 9) tmpMap[y+1][x] = 1
        if (a[y-1][x] < 9) tmpMap[y-1][x] = 1
    }
    if (x == 0) {
        if (a[y][x+1] < 9) tmpMap[y][x+1] = 1
    } else if (x == a[0].length - 1) {
        if (a[y][x-1] < 9) tmpMap[y][x-1] = 1
    } else {
        if (a[y][x+1] < 9) tmpMap[y][x+1] = 1
        if (a[y][x-1] < 9) tmpMap[y][x-1] = 1
    }
    return tmpMap
}

function getMapForX(a: number[][], tmpMap: number[][], y: number, x: number): number[][] {
    for (let i = x; i >= 0; i--) {
        if (a[y][i] < 9) {
            tmpMap[y][i] = 1
            tmpMap = lookAround(a, tmpMap, y, i)
        }
        else break
    }
    for (let i = x; i < a[0].length; i++) {
        if (a[y][i] < 9) {
            tmpMap[y][i] = 1
            tmpMap = lookAround(a, tmpMap, y, i)
        }
        else break
    }
    return tmpMap
}

function getMapForY(a: number[][], tmpMap: number[][], y: number, x: number): number[][] {
    for (let i = y; i >= 0; i--) {
        if (a[i][x] < 9) {
            tmpMap[i][x] = 1
            tmpMap = lookAround(a, tmpMap, i, x)
        }
        else break
    }
    for (let i = y; i < a.length; i++) {
        if (a[i][x] < 9) {
            tmpMap[i][x] = 1
            tmpMap = lookAround(a, tmpMap, i, x)
        }
        else break
    }
    return tmpMap
}

function getBasinSize(a: number[][], y: number, x: number): number {
    const yLength = a.length
    const xLength = a[0].length
    let tmpMap: number[][] = a.map(v => { return v.map(z => { return 0 }) })
    tmpMap[y][x] = 1
    let size: number = 0

    for (let i = y; i >= 0; i--) {
        if (a[i][x] < 9) {
            tmpMap = getMapForX(a, tmpMap, i, x)
        }
        else break
    }
    for (let i = y; i < yLength; i++) {
        if (a[i][x] < 9) {
            tmpMap = getMapForX(a, tmpMap, i, x)
        }
        else break
    }

    for (let i = x; i >= 0; i--) {
        if (a[y][i] < 9) {
            tmpMap = getMapForY(a, tmpMap, y, i)
        }
        else break
    }
    for (let i = x; i < xLength; i++) {
        if (a[y][i] < 9) {
            tmpMap = getMapForY(a, tmpMap, y, i)
        }
        else break
    }

    tmpMap.forEach(v => {
        v.forEach(z => {
            if (z == 1) {
                size += 1
            }
        })
    })

    return size
}

function getBasinsSize(a: number[][], lowPoints: number[][]): number[] {
    let basins: number[] = []
    lowPoints.forEach(low => {
        basins.push(getBasinSize(a, low[0], low[1]))
    })
    return basins
}

function findAndMultiplyThreeBiggest(a: number[]): number {
    let threeBiggest: number[] = a.sort(function (a, b) { return a - b }).reverse().slice(0, 3)
    let orderedThreeBiggest: number[] = []
    a.forEach(v => {
        if (threeBiggest.includes(v)) orderedThreeBiggest.push(v)
    })
    return orderedThreeBiggest[0] * orderedThreeBiggest[1] * orderedThreeBiggest[2]
}

// test 1
if (getRiskLevel(testArray1, getLowPoints(testArray1)) != 15) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 1: " + getRiskLevel(array, getLowPoints(array)))

// test 2
if (findAndMultiplyThreeBiggest(getBasinsSize(testArray1, getLowPoints(testArray1))) != 1134) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 2: " + findAndMultiplyThreeBiggest(getBasinsSize(array, getLowPoints(array))))