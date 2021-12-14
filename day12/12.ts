import { time } from 'console'
import * as fs from 'fs'

let testArray1: string[][] = [
    "start-A",
    "start-b",
    "A-c",
    "A-b",
    "b-d",
    "A-end",
    "b-end"
].map(value => {
    return value.split("-")
})

let testArray2: string[][] = [
    "dc-end",
    "HN-start",
    "start-kj",
    "dc-start",
    "dc-HN",
    "LN-dc",
    "HN-end",
    "kj-sa",
    "kj-HN",
    "kj-dc"
].map(value => {
    return value.split("-")
})

let array: string[][]
array = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(line => line != '').map(value => { return value.split("-") })

function isTravelledTwice(path: string[]): boolean {
    let regex = new RegExp(/[a-z]+/)
    for (let i = 0; i < path.length; i++) {
        let travelled: string[] = path.filter(a => {
            if (path[i] == a && regex.test(path[i])) return a
        })
        if (travelled.length > 1) {
            return true
        }
    }
    return false
}

function findAllPaths(a: string[][], visitSmallCaveTwice: boolean = false): string[][] {
    let paths: string[][] = []
    for (let i = 0; i < a.length; i++) {
        if (a[i][0] == "start") {
            paths.push(a[i])
        } else if (a[i][1] == "start") {
            paths.push(a[i].reverse())
        }
    }
    let newPaths = true
    let regex = new RegExp(/[a-z]+/)
    while (newPaths) {
        let tmpPaths: string[][] = paths.slice()
        let itemsToRemove: number[] = Array()
        for (let p = 0; p < paths.length; p++) {
            for (let j = 0; j < a.length; j++) {
                if (a[j][0] != "start") {
                    if (!paths[p].includes("end")) {
                        if (a[j][0] == paths[p][paths[p].length - 1]) {
                            if (regex.test(a[j][1]) && paths[p].includes(a[j][1]) && !visitSmallCaveTwice) {
                                // travelled once
                            } else if (regex.test(a[j][1]) && paths[p].includes(a[j][1]) && isTravelledTwice(paths[p]) && visitSmallCaveTwice) {
                                // travelled twice
                            } else {
                                if (!itemsToRemove.includes(p)) {
                                    itemsToRemove.push(p)
                                }
                                tmpPaths.push(paths[p].concat(a[j][1]))

                            }
                        }
                        if (a[j][1] == paths[p][paths[p].length - 1]) {
                            if (regex.test(a[j][0]) && paths[p].includes(a[j][0]) && !visitSmallCaveTwice) {
                                // travelled once
                            } else if (regex.test(a[j][0]) && paths[p].includes(a[j][0]) && isTravelledTwice(paths[p]) && visitSmallCaveTwice) {
                                // travelled twice
                            } else {
                                if (!itemsToRemove.includes(p)) {
                                    itemsToRemove.push(p)
                                }
                                tmpPaths.push(paths[p].concat(a[j][0]))
                            }
                        }
                    }
                }
            }

        }
        itemsToRemove.reverse().forEach(itemToRemove => {
            tmpPaths.splice(itemToRemove, 1)
        })

        if (paths.length == tmpPaths.length) {
            newPaths = false
        }
        paths = tmpPaths.slice()
    }

    return paths.filter(a => { if (a[a.length - 1] == "end") return a })
}


// test 1.1
if (findAllPaths(testArray1).length != 10) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

// test 1.2
if (findAllPaths(testArray2).length != 19) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 1: " + findAllPaths(array).length)

// test 2
if (findAllPaths(testArray1, true).length != 36) {
    throw "Test failed"
} else {
    console.log("Test passed!")
}

console.log("part 2: " + findAllPaths(array, true).length)