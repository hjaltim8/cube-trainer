import _ from 'lodash'
// import fromKey from './mapping1.json'
import toKey from './mapping2.json'
import encodeToBld from './encodeToBld.json'
import decodeFromBld from './decodeFromBld.json'
import pieces from './pieces.json'
import piecesM from './piecesM.json'
import pieceMap from './pieceMap.json'
import stickerMap from './mapping1.json'

const solved = 'uuuuuuuuulllllllllfffffffffrrrrrrrrrbbbbbbbbbddddddddd'
const solvd  = 'AaBd0bDcCEeFh1fHgGIiJl2jLkKMmNp3nPoOQqRt4rTsSUuVx5vXwW'

// superflip with red center on front and yellow center on top
const scramble = 'ubulurufululblfldlfuflfrfdfrurfrbrdrbubrblbdbdfdldrdbd'

// just focusing on corners, this should give the following corner solutions:
//  1. C,K,H,N,O,(Q),(D|F|I), G, L => Done!
//  2. C,K,H,N,O,(Q),(D|F|I), L, U => Done!
//  3. C,K,H,N,O,(Q),(D|F|I), U, G => Done!
//  4. C,K,H,N,O,(Q), G, L, (D|F|I) => Done!
//  5. C,K,H,N,O,(Q), L, U, (D|F|I) => Done!
//  6. C,K,H,N,O,(Q), U, G, (D|F|I) => Done!
//  => C,K,H,N,O,[(U,G)|(L,U)|(G,L)]
// So there are only three possible solutions for this corner case
const cornerScramble = 'uubuubuufrbllllrffffdffudrlrrrrrrdbbdlfdbbulblfbdddudl'

// console.log(encodeToBld)

// const decodeFromBld = _.reduce(encodeToBld, (r, v, k) => {
//     const key = _.values(v).sort().join('')
//     const value = _.invert(v)
//     r[key] = value
//     return r
// }, {})

// console.log(decodeFromBld)
// console.log(pieces)

function code(input, map) {
    const s = input.split('')
    pieces.forEach(piece => {
        let key = piece.map(id => s[id]).sort().join('')
        let enc = map[key]
        piece.forEach(id => { s[id] = enc[s[id]] })
    })
    return s.join('')
}

function encode(scramble) {
    return code(scramble, encodeToBld)
}

function decode(scramble) {
    return code(scramble, decodeFromBld)
}

const result = encode(solved)
console.log(result)
console.log(solvd)
const result2 = decode(solvd)
console.log(solved)
console.log(result2)
const result3 = encode(scramble)
const result4 = decode(result3)
console.log(result3)
console.log(result4)
console.log(scramble === result4)


// Now next step is to find corner and edge solutions
// given a buffer, but we can assume UBL for now as a corner buffer
// and df df as edge buffer

// So for corners:
// start by looking at what we have in UBL (0)
// Lookup where it belongs, and add that letter to the list
// If !8 corners found then continue
// This of course means that there are multiple corner solutions
// and the question is if they are interchangable, in that case
// return an array, otherwise just pick the first one

function findCornerSolutions(encodedScramble, buffer = 0) {
    const result = []
    // Look at the piece in the buffer
    let current = {
        index: buffer,
        sticker: encodedScramble[buffer],
    }

    // Is this sticker home?
    const correct = toKey[current.index] === current.sticker

    // Yes, the sticker is home
    if (correct) {
        //
    // No, the sticker isn't home
    } else {
        // 
    }

    // Walkthrough:
    // When I get to Q I start a new cycle to a corner (note corner, not sticker)
    // that I have not already checked.
    // In this particular case I can choose between two corners
    // (DFI) and (GLU)
    // which gives me 6 different stickers to look at next...

    // just focusing on corners, this should give the following corner solutions:
    //  1. C,K,H,N,O,(Q),(D|F|I), G, L => Done!
    //  2. C,K,H,N,O,(Q),(D|F|I), L, U => Done!
    //  3. C,K,H,N,O,(Q),(D|F|I), U, G => Done!
    //  4. C,K,H,N,O,(Q), G, L, (D|F|I) => Done!
    //  5. C,K,H,N,O,(Q), L, U, (D|F|I) => Done!
    //  6. C,K,H,N,O,(Q), U, G, (D|F|I) => Done!
    //  => C,K,H,N,O,[(U,G)|(L,U)|(G,L)]
    // So there are only three possible solutions for this corner case

    // so psuedocode...
    // step 1. is the sticker I am currently looking at in the correct spot?
    const solutionArray = []
    const finishedCorners = []
    const stickerIsHome = false
    let currentSticker = ''
    const currentCorner = {}
    const stickerIsOnBufferCorner = false
    if (stickerIsOnBufferCorner) {
        // I am reaching a splitting point
        // Now I have to pick a random corner from:
        // corners - finishedCorners
        // Then pick a random sticker from one of the picked corner

        // But I really need to choose every sticker that is left to get all solutions
    }
    else if (stickerIsHome) {
        // I am only arriving here as a beginning of a cycle
        // Mark corner as done
        finishedCorners.push(currentCorner)


    } else {
        // Push sticker to solution array
        solutionArray.push(currentSticker)

        // Add the corner the sticker belongs to into an array of finished corners
        finishedCorners.push(currentCorner)
        // Although if this is the beginning of a cycle, then
        // the corner should not be added to a list of finished corners
        // and now the cyclestarting corner closes the cycle when another
        // sticker belonging to it arrives...

        // Have i looked at all corners now?
        if (finishedCorners.length === 7) {
            // The solution is ready
            return solutionArray
        } else {
            // The solution is not ready
            // Update the current sticker and corner and repeat
        }

    }

    

}

function cornie(codedScramble, stickerMap, cornerMap) {
    const cycleSticker = 'A'
    const cycleCorner = ['A', 'E', 'R']
    let currentCorner = ['C', 'J', 'M']
    let currentSticker = 'C'
    const solutionArray = []
    const finishedCorners = []

    // If the first sticker in the cycle is home
    // Then simply mark the corner as finished and move on
    if (currentSticker === cycleSticker) {
        finishedCorners.push(cycleCorner)
        return
    }

    while (true) {
        // Push the current sticker into the solution array
        solutionArray.push(currentSticker)
        // Push the current corner into the finishedCorners array
        finishedCorners.push([...currentCorner])

        // We have now reached the end of the cycle...
        if (cycleCorner.indexOf(currentSticker) >= 0) {
            break
        }

        // Update current sticker to the sticker that is currently
        // occupying the slot the currentSticker calls home
        const index = stickerMap[currentSticker]

        // Lookup the sticker in the current scramble that occupies that id
        currentSticker = codedScramble.split('')[index]

        // Lookup the corner that owns this sticker
        currentCorner = cornerMap[currentSticker]
    }
}

function getNextCorner(codedScramble, currentSticker) {
    const idx = stickerMap[currentSticker]
    // console.log('idx: ', idx)
    const sticker = codedScramble.split('')[idx]
    // console.log('new current sticker: ', sticker)
    let cid = pieceMap.corners[sticker]
    // console.log('cid: ', cid)
    let cor = _.cloneDeep(piecesM.corners[cid])
    // console.log('cor: ', cor)
    return { sticker, id: cid, corner: cor }
}

function solveCornerCycle(codedScramble, cycle) {
    // There exists only one solution for any cycle
    const solution = []
    const corners = {}

    // First get the next sticker
    // let current = { sticker: cycle.sticker, corner: cycle.corner }
    // console.log('cycle: ', cycle)
    let current = getNextCorner(codedScramble, cycle.sticker)
    console.log('cycle: ', cycle)
    console.log('current: ', current)

    // 1. The cycle sticker, this means that we are on the first and last sticker in the cycle
    if (current.sticker === cycle.sticker) {
        console.log('No cycle here...')
        // We mark the corner as solved
        corners[current.id] = current.corner

        // And return from the function
        return { solution, corners }
    }

    // Add the first of the cycle into the solution array
    solution.push(cycle.sticker)

    let counter = 0

    while (counter < 10) {
        counter += 1

        const lastInCycle = cycle.corner[current.sticker]

        console.log('another one bites the dust')

        // We add the sticker to the solution
        // todo: we don't add it to the solution if 
        // this is the last in the cycle and the cycle is
        // solution length is longer than 1
        if (lastInCycle && solution.length) 
        solution.push(current.sticker)

        // We add the corner to the list of corners
        corners[current.id] = current.corner

        // If this sticker belongs to the cycle corner, we are done
        if (cycle.corner[current.sticker] !== undefined) {
            console.log('we have closed the circle')
            return { solution, corners }
        }

        // and finally get next sticker/corner...
        current = getNextCorner(codedScramble, current.sticker)
    }

    return { solution, corners }
}


var randomProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]]
}

function solveCorners(codedScramble) {
    console.log('attempting to solve: ', codedScramble)
    const solution = []
    let corners = []
    let remainingCorners = _.cloneDeep(piecesM.corners)
    
    // First get an A cycle (since our buffer is A)
    console.log('should be AER: ', pieceMap.corners['A'])
    console.log('should be AER: ', piecesM.corners['AER'])
    let cid = pieceMap.corners['A']
    let cor = _.cloneDeep(piecesM.corners[cid])
    console.log('cor: ', cor)
    let cycl = { sticker: 'A', id: cid, corner: cor }
    console.log('cycle is (should be A)', cycl)
    let result = solveCornerCycle(codedScramble, cycl)

    solution.push(result.solution)
    corners.push(result.corners)

    // Remove buffer if included
    if (solution[0][0] === 'A') {
        solution[0].shift()
    }

    // now to see if we are done
    if (corners.length === 8) {
        // We are done, return our results

        return {
            solution,
            corners,
        }
    }

    remainingCorners = _.omit(remainingCorners, _.keys(corners))

    let cycle = {}
    // todo: now pick a random new cycle, or rather try all remaining
    // to get all possible solutions
    // right now I'll just pick a random new cycle sticker
    cycle.corner = randomProperty(remainingCorners)
    cycle.sticker = _.keys(cycle.corner)[Math.floor(Math.random()*_.size(cycle.corner))]

    result = solveCornerCycle(codedScramble, cycle, stickerMap)

    solution.push(result.solution)
    corners.push(result.corners)

    remainingCorners = _.omit(remainingCorners, _.keys(result.corners))

    // Are we donw yet???
    const res = {
        solution, corners
    }

    console.log('result is: ', res)

}

solveCorners(encode(cornerScramble))

console.log('correct solution: C,K,H,N,O,[(U,G)|(L,U)|(G,L)]')







// And for edges is pretty much the same, just a different starting point
