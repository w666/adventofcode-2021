import { on } from 'events'
import * as fs from 'fs'

type FOLD = {
    axis: string,
    num: number
}

type INSTRUCTION = {
    manual: number[][],
    fold: FOLD[]
}

function getData(file: string): INSTRUCTION {
    let fileAsArr = fs.readFileSync(file, 'utf-8').split('\n')
    let manual: number[][] = fileAsArr.filter(v => {
        if (/\d+,\d+/.test(v)) {
            return v
        }
    }).map(n => {
        let arr = n.split(",")
        return [parseInt(arr[0]), parseInt(arr[1])]
    })
    let fold: FOLD[] = fileAsArr.filter(v => {
        if (/fold along/.test(v)) {
            return v
        }
    }).map(n => {
        let arr = n.replace("fold along ", "").split("=")
        return { axis: arr[0], num: parseInt(arr[1]) }
    })
    return {
        manual: manual,
        fold: fold
    }
}

function getArrSize(arr: number[][]): number[] {
    let y = 0
    let x = 0
    arr.forEach(n => {
        if (y < n[0]) y = n[0]
        if (x < n[1]) x = n[1]
    })
    return [y, x]
}

function getEmptyMap(x: number, y: number): boolean[][] {
    return Array(x).fill([]).map(n => { return Array(y).fill(false) })
}

function foldV(one: boolean[][], two: boolean[][]): boolean[][] {
    one.reverse()
    for (let i = 0; i < two.length; i++) {
        for (let j = 0; j < two[0].length; j++) {
            if (two[i][j] == true) one[i][j] = true
        }
    }

    one.reverse()
    return one
}

function foldH(one: boolean[][], two: boolean[][]): boolean[][] {
    one.map(v => { return v.reverse() })

    for (let i = 0; i < two.length; i++) {
        for (let j = 0; j < two[0].length; j++) {
            if (two[i][j] == true) one[i][j] = true
        }
    }

    return one.map(v => { return v.reverse() })
}

function fold(fold: FOLD, originalMap: boolean[][]): boolean[][] {
    let foldedMap: boolean[][] = []
    if (fold.axis == "y") {
        let top = originalMap.slice(0, fold.num)
        let bottom = originalMap.slice(fold.num + 1)
        foldedMap = foldV(top, bottom)
        return foldedMap
    } else if (fold.axis == "x") {
        let left: boolean[][] = []
        let right: boolean[][] = []
        originalMap.forEach(v => {
            let leftLine = v.slice(0, fold.num)
            left.push(leftLine)
            let rightLine = v.slice(fold.num + 1)
            right.push(rightLine)
        })

        foldedMap = foldH(left, right)
    }
    return foldedMap
}

function fillMap(arr: number[][]): boolean[][] {
    let arrSize = getArrSize(arr)
    let map: boolean[][] = getEmptyMap(arrSize[1] + 1, arrSize[0] + 1)
    arr.forEach(n => {
        map[n[1]][n[0]] = true
    })
    return map
}

function getVisibleDots(arr: INSTRUCTION, folds: number): boolean[][] {
    let foldedManual: boolean[][] = fillMap(arr.manual)
    for (let i = 0; i < folds; i++) {
        foldedManual = fold(arr.fold[i], foldedManual)
    }
    return foldedManual
}

function countDots(arr: boolean[][]): number {
    let sum = 0
    arr.forEach(a1 => {
        a1.forEach(a2 => {
            if (a2 == true) sum++
        })
    })
    return sum
}

// test 1
if (countDots(getVisibleDots(getData("test-input.txt"), 1)) != 17) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 1: " + countDots(getVisibleDots(getData("input.txt"), 1)))

console.log("part 2")
getVisibleDots(getData("input.txt"), 12).forEach(a => { console.log(a.map(v => { if (v == true) return "#"; else return "." }).join("")) })
