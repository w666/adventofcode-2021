import * as fs from 'fs'

let testArray1: string[] = [
    "5483143223",
    "2745854711",
    "5264556173",
    "6141336146",
    "6357385478",
    "4167524645",
    "2176841721",
    "6882881134",
    "4846848554",
    "5283751526"
]


function getArray(arr: string[]): number[][]{
    return arr.map(value => {
        return value.split("").map(n => {
            return parseInt(n)
        })
    })
}

let array: string[]
array = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(line => line != '')

type MAP = {
    map: number[][],
    flashes: boolean[][]
}

function increase(n: number): number {
    n++
    if (n == 10) {
        return 0
    }
    return n
}

function willFlash(map: MAP, y: number, x: number): MAP {
    let yMax = map.map.length
    let xMax = map.map[0].length
    if (x >= 0 && x < xMax && y >= 0 && y < yMax) {
        if (!map.flashes[y][x]) {
            if (map.map[y][x] + 1 == 10) {
                map.map[y][x] = increase(map.map[y][x])
                map.flashes[y][x] = true
                map = increaseNearby(map, y, x)
            } else {
                map.map[y][x] = increase(map.map[y][x])
            }
        }
    }
    return map
}

function increaseNearby(map: MAP, y: number, x: number): MAP {
    map = willFlash(map, y, x + 1)
    map = willFlash(map, y, x - 1)
    map = willFlash(map, y + 1, x)
    map = willFlash(map, y - 1, x)
    map = willFlash(map, y + 1, x + 1)
    map = willFlash(map, y + 1, x - 1)
    map = willFlash(map, y - 1, x + 1)
    map = willFlash(map, y - 1, x - 1)
    return map
}

function doSteps(a1: number[][], steps: number, part2: boolean = false): number {
    let a = a1.slice()
    let sum: number = 0
    for (let step = 1; step <= steps; step++) {
        let map: MAP = {
            map: a,
            flashes: a.map(v => { return v.map(z => { return false }) })
        }
        for (let y = 0; y < a.length; y++) {
            for (let x = 0; x < a[0].length; x++) {
                if (!map.flashes[y][x]) {
                    if (a[y][x] + 1 == 10) {
                        map.flashes[y][x] = true
                        map = increaseNearby(map, y, x)
                        map.map[y][x] = increase(map.map[y][x])
                    } else {
                        map.map[y][x] = increase(map.map[y][x])
                    }
                }
            }
        }

        let localSum = 0
        map.flashes.forEach(v => {
            v.forEach(n => { if (n) localSum++ })
        })
        if (part2) {
            if (localSum == 100) {
                return step
            }
        }
        sum += localSum
    }
    return sum
}


// test 1
if (doSteps(getArray(testArray1), 100) != 1656) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 1: " + doSteps(getArray(array), 100))

console.log("testArray1: " + testArray1)

// test 2
if (doSteps(getArray(testArray1), 1000, true) != 195) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 2: " + doSteps(getArray(array), 1000, true))
