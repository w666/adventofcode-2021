import * as fs from 'fs'

let testArray1: string[][][] = ["be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
    "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
    "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
    "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
    "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
    "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
    "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
    "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
    "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
    "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce"].map(value => {
        return [
            value.split("|")[0].trim().split(/\s+/),
            value.split("|")[1].trim().split(/\s+/)
        ]
    })

let testArray2: string[][][] = ["acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf"].map(value => {
    return [
        value.split("|")[0].trim().split(/\s+/),
        value.split("|")[1].trim().split(/\s+/)
    ]
})

let array: string[][][]
array = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(line => line != '').map(value => {
    return [
        value.split("|")[0].trim().split(/\s+/),
        value.split("|")[1].trim().split(/\s+/)
    ]
})

const uniqueNumberPatterns: number[] = [2, 4, 3, 7]

function get1478(array: string[][][]): number {
    let sum: number = 0
    array.forEach(value => {
        value[1].forEach(value => {
            if (uniqueNumberPatterns.includes(value.length)) {
                sum += 1
            }
        })
    })
    return sum
}

function getDiff(digit1: string, digit2: string): string {
    let diff: string = ""
    for (let i = 0; i < digit1.length; i++) {
        if (!digit2.includes(digit1[i])) {
            diff += digit1[i]
        }
    }
    return diff
}

function decodeAndCount(array: string[][][]): number {
    let sum: number = 0
    array.forEach(value => {
        let numberAsString: string = ""
        let digits: string[] = Array(10).fill("")
        value[0].forEach(value2 => {
            if (value2.length == 2) {
                digits[1] = value2
            }
            else if (value2.length == 3) {
                digits[7] = value2
            }
            else if (value2.length == 4) {
                digits[4] = value2
            }
            else if (value2.length == 7) {
                digits[8] = value2
            } else {
            }
        })

        // find 3
        value[0].forEach(value2 => {
            if (value2.length == 5) {
                let diff = getDiff(value2, digits[4])
                if (diff.length == 2) {
                    if (getDiff(value2, digits[7]).length == 2) {
                        digits[3] = value2
                    }
                }
            }
        })

        // find 5 and 2
        value[0].forEach(value2 => {
            if (value2.length == 5) {
                let diff = getDiff(value2, digits[3])
                if (diff.length == 1) {
                    if (getDiff(diff, digits[4]).length == 0) {
                        digits[5] = value2
                    } else if (getDiff(diff, digits[4]).length == 1) {
                        digits[2] = value2
                    }
                }
            }
        })

        // find 0
        value[0].forEach(value2 => {
            if (value2.length == 6) {
                let diff = getDiff(value2, digits[5])
                if (diff.length == 2) {
                    if (getDiff(diff, digits[4]).length == 1) {
                        digits[0] = value2
                    }
                }
            }
        })

        // find 9
        value[0].forEach(value2 => {
            if (value2.length == 6) {
                let diff = getDiff(value2, digits[7])
                if (diff.length == 3) {
                    if (getDiff(diff, digits[5]).length == 0) {
                        digits[9] = value2
                    }
                }
            }
        })

        // find 6
        value[0].forEach(value2 => {
            if (value2.length == 6) {
                let diff = getDiff(value2, digits[1])
                if (diff.length == 5) {
                     if (getDiff(diff, digits[5]).length == 1) {
                        digits[6] = value2
                    }
                }
            }
        })

        value[1].forEach(value3 => {
            for (let i =0; i< digits.length; i++) {
                if (digits[i].split("").sort().join("") == value3.split("").sort().join("")) {
                    numberAsString += i
                }
            }
        })
        sum += parseInt(numberAsString)
    })
    return sum
}


// test 1
if (get1478(testArray1) != 26) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 1: " + get1478(array))

// test 2.1
if (decodeAndCount(testArray2) != 5353) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

// test 2.2
if (decodeAndCount(testArray1) != 61229) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 2: " + decodeAndCount(array))