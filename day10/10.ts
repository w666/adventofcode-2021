import * as fs from 'fs'
import { parse } from 'path'

let testArray1: string[][] = [
    "[({(<(())[]>[[{[]{<()<>>",
    "[(()[<>])]({[<{<<[]>>(",
    "{([(<{}[<>[]}>{[]{[(<()>",
    "(((({<>}<{<{<>}{[]{[]{}",
    "[[<[([]))<([[{}[[()]]]",
    "[{[{({}]{}}([{[{{{}}([]",
    "{<[[]]>}<{[{[{[]{()[[[]",
    "[<(<(<(<{}))><([]([]()",
    "<{([([[(<>()){}]>(<<{{",
    "<{([{{}}[<[[[<>{}]]]>[]]"
].map(value => { return value.split("") })


let array: string[][]
array = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(line => line != '').map(value => { return value.split("") })

let openChars = ["(", "[", "{", "<"]
let closeChars = [")", "]", "}", ">"]


function validateChunk(a: string[][], part2: boolean = false): string[] {
    let invalid: string[] = []
    let notClosed: string[] = []
    for (let i = 0; i < a.length; i++) {
        let opened: string[] = []
        let tmpNotClosed: string[] = []
        let line = a[i]
        let incomplete = true
        for (let j = 0; j < line.length; j++) {
            let v = line[j]
            if (openChars.includes(v)) {
                opened.push(v)
            }
            else if (closeChars.includes(v)) {
                let openedLastIndex = opened.length - 1
                let expected = getExpected(opened[openedLastIndex])
                if (expected == v) {
                    opened.pop()
                } else {
                    incomplete = false
                    invalid.push(v)
                    break
                }
            }
            tmpNotClosed = opened
        }
        if (incomplete) notClosed.push(tmpNotClosed.join(""))
    }
    if (part2) return notClosed
    return invalid
}

function getExpected(v: string): string {
    let points: number = 0
    switch (v) {
        case "(": {
            return ")"
        }
        case "[": {
            return "]"
        }
        case "{": {
            return "}"
        }
        case "<": {
            return ">"
        }
        default: {
            throw `unexpected char: ${v}`
        }
    }
}

function getSyntaxErrors(a: string[]): number {
    let sum = 0
    a.forEach(v => {
        if (v == ")") sum += 3
        else if (v == "]") sum += 57
        else if (v == "}") sum += 1197
        else if (v == ">") sum += 25137
    })
    return sum
}


function getCompletionPoints(a: string[]): number {
    let sum: number[] = Array(a.length).fill(0)
    a.forEach((v, i) => {
        v.split("").reverse().forEach(z => {
            sum[i] *= 5
            if (z == "(") sum[i] += 1
            else if (z == "[") sum[i] += 2
            else if (z == "{") sum[i] += 3
            else if (z == "<") sum[i] += 4
        })

    })
    return sum.sort(function (a, b) { return a - b })[Math.round(sum.length/2-1)]
}


// test 1
if (getSyntaxErrors(validateChunk(testArray1)) != 26397) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 1: " + getSyntaxErrors(validateChunk(array)))

// test 2
if (getCompletionPoints(validateChunk(testArray1, true)) != 288957) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 2: " + getCompletionPoints(validateChunk(array, true)))