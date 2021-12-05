import * as fs from 'fs'
import { type } from 'os'

let testArray1: string[] = [
    "0,9 -> 5,9",
    "8,0 -> 0,8",
    "9,4 -> 3,4",
    "2,2 -> 2,1",
    "7,0 -> 7,4",
    "6,4 -> 2,0",
    "0,9 -> 2,9",
    "3,4 -> 1,4",
    "0,0 -> 8,8",
    "5,5 -> 8,2"
]

let array: string[]
array = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(line => line != '')

type Line = {
    "start": {
        "x": number,
        "y": number
    },
    "end": {
        "x": number,
        "y": number
    }
}

function arrayToObj(array: string[]): Line[] {
    let lines: Line[] = []
    array.forEach((value: string) => {
        let startEnd: string[] = value.split(" -> ")
        let xxyy: number[] = [
            parseInt(startEnd[0].split(",")[0]),
            parseInt(startEnd[1].split(",")[0]),
            parseInt(startEnd[0].split(",")[1]),
            parseInt(startEnd[1].split(",")[1])
        ]
        lines.push({
            "start": {
                "x": xxyy[0],
                "y": xxyy[2]
            },
            "end": {
                "x": xxyy[1],
                "y": xxyy[3]
            }
        })
    })
    return lines
}

function objToMapOfVents(lines: Line[], part2: boolean = false): number[][] {
    let maxX: number = 0
    let maxY: number = 0
    lines.forEach((line: Line) => {
        if (line.start.x > maxX) maxX = line.start.x
        if (line.end.x > maxX) maxX = line.end.x
        if (line.start.y > maxY) maxY = line.start.y
        if (line.end.y > maxY) maxY = line.end.y
    })
    // Array.fill works badly in 2D arrays
    let mapOfVents: number[][] = Array(maxY + 1)
    for (let y = 0; y <= maxY; y++) {
        mapOfVents[y] = Array(maxX + 1).fill(0)
    }

    lines.forEach((line: Line) => {
        if (line.start.x == line.end.x || line.start.y == line.end.y) {
            if (line.start.x == line.end.x) {
                if (line.start.y < line.end.y) {
                    for (let y = line.start.y; y <= line.end.y; y++) {
                        mapOfVents[y][line.start.x] += 1
                    }
                } else {
                    for (let y = line.end.y; y <= line.start.y; y++) {
                        mapOfVents[y][line.start.x] += 1
                    }
                }
            }
            if (line.start.y == line.end.y) {
                if (line.start.x < line.end.x) {
                    for (let x = line.start.x; x <= line.end.x; x++) {
                        mapOfVents[line.start.y][x] += 1
                    }
                } else {
                    for (let x = line.end.x; x <= line.start.x; x++) {
                        mapOfVents[line.start.y][x] += 1
                    }
                }
            }
        }
        else if (part2) {
            if ((line.start.x - line.end.x == line.start.y - line.end.y) || 
            (line.end.x - line.start.x == line.start.y - line.end.y) || 
            (line.start.x - line.end.x == line.end.y - line.start.y) || 
            (line.end.x - line.start.x == line.end.y - line.start.y)) {
                mapOfVents = fillInDiagonal(mapOfVents, line)
            }
        }
    })
    return mapOfVents
}

function fillInDiagonal(mapOfVents: number [][], line: Line): number [][] {
    if (line.start.x < line.end.x && line.start.y < line.end.y) {
        let y: number = line.start.y
        for (let x = line.start.x; x <= line.end.x; x++) {
            mapOfVents[y][x] += 1
            y++
        }
    } else if (line.start.x > line.end.x && line.start.y < line.end.y) {
        let y: number = line.start.y
        for (let x = line.start.x; x >= line.end.x; x--) {
            mapOfVents[y][x] += 1
            y++
        }
    } else if (line.start.x > line.end.x && line.start.y > line.end.y) {
        let y: number = line.start.y
        for (let x = line.start.x; x >= line.end.x; x--) {
            mapOfVents[y][x] += 1
            y--
        }
    } else if (line.start.x < line.end.x && line.start.y > line.end.y) {
        let y: number = line.start.y
        for (let x = line.start.x; x <= line.end.x; x++) {
            mapOfVents[y][x] += 1
            y--
        }
    }
    return mapOfVents
}

function getNumberOf2LinesOverlap(mapOfVents: number[][]): number {
    let result: number = 0
    mapOfVents.forEach(value => {
        value.forEach(value2 => {
            if (value2 > 1) result += 1
        })
    })
    return result
}

getNumberOf2LinesOverlap(objToMapOfVents(arrayToObj(testArray1)))

// test 1

if (getNumberOf2LinesOverlap(objToMapOfVents(arrayToObj(testArray1))) != 5) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 1: " + getNumberOf2LinesOverlap(objToMapOfVents(arrayToObj(array))))

// test 2

if (getNumberOf2LinesOverlap(objToMapOfVents(arrayToObj(testArray1), true)) != 12) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 2: " + getNumberOf2LinesOverlap(objToMapOfVents(arrayToObj(array), true)))