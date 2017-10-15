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

// correct solution: [[N,B] or [B,Q] or [Q,N]],[[M,W,U or W,U,M or U,M,W] or [C,T,L or T,L,C or L,C,T] or [J,O,G or O,G,J or G,J,O]]
const cornerScramble2 = 'bubuuuuubulllllllfffrfffuffdrurrrrrlrblbbbfbbrdddddddd'

const cornerScramble3 = 'bubuuuuubulllllrlfffrfffurbdrurrrlflrblbbbfbfrdddddddd'

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


function getCorner(sticker) {
    let cid = pieceMap.corners[sticker]
    // console.log('cid: ', cid)
    let cor = _.cloneDeep(piecesM.corners[cid])
    // console.log('cor: ', cor)
    return { sticker, id: cid, corner: cor }
}

function getNextCorner(codedScramble, currentSticker) {
    const idx = stickerMap[currentSticker]
    // console.log('idx: ', idx)
    const sticker = codedScramble.split('')[idx]
    // console.log('new current sticker: ', sticker)
    return getCorner(sticker)
}

function solveCornerCycle(codedScramble, startSticker, isBufferCycle = false) {
    // There exists only one solution for any cycle
    const solution = []
    const corners = {}

    // This will be the id of the cycle and will consist of 
    // all the corners as a sorted string
    let id = ''

    const cycle = getCorner(startSticker)

    // First get the next sticker
    // let current = { sticker: cycle.sticker, corner: cycle.corner }
    // console.log('cycle: ', cycle)
    let current = getNextCorner(codedScramble, cycle.sticker)
    console.log('cycle: ', cycle)
    console.log('current: ', current)

    // 1. The cycle sticker, this means that we are on the first and last sticker in the cycle
    //    Thus we return an empty array for memorizing (nothing to memorize)
    //    And we return the corner that is solved
    if (current.sticker === cycle.sticker) {
        console.log('No cycle here...')
        // We mark the corner as solved
        corners[current.id] = current.corner

        id = current.id

        // And return from the function
        return { solution, id, corners }
    }

    // Add the first of the cycle into the solution array
    // As long as this is not the buffer cycle
    if (!isBufferCycle) {
        solution.push(cycle.sticker)
    }

    // This is just a security measure to make sure we don't accidentally
    // run forever
    let counter = 0

    while (counter < 10) {
        counter += 1

        // Is this sticker on the cycle piece?
        const lastInCycle = cycle.corner[current.sticker]

        console.log('another one bites the dust')

        // We add the corner to the list of corners
        corners[current.id] = current.corner

        // If this is the last sticker in the cycle
        if (lastInCycle) {
            // We only add this sticker to memorization
            // If we are simply twisting a corner
            if (solution.length === 1) {
                solution.push(current.sticker)
                id = current.id
            } else {
                id = _.keys(corners).sort().join('_')
            }

            console.log('we have closed the circle')
            return { solution, id, corners }
        }

        // Add the sticker to the memorization list
        solution.push(current.sticker)

        // and finally get next sticker/corner...
        current = getNextCorner(codedScramble, current.sticker)
    }

    // Finally we return without closing the circle...
    // This should never happen...
    console.error('This shouldn\'t be possible')
    return { solution, id, corners }
}


var randomProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]]
}

function solveCorners(codedScramble) {
    console.log('attempting to solve: ', codedScramble)

    const solveResult = {
        bufferCycle: [],
        cycles: {},
        allSolutions: [],
    }
    
    // First get an A cycle (since our buffer is A)
    const bufferCycle = solveCornerCycle(codedScramble, 'A', true)

    // Save the solution as our buffer cycle
    solveResult.bufferCycle = bufferCycle.solution

    // Keep track of our solved corners
    let corners = bufferCycle.corners

    // now to see if we are done
    if (_.size(corners) === 8) return solveResult

    // Find remaining corners
    const remainingCorners = _.omit(_.cloneDeep(piecesM.corners), _.keys(corners))
    console.log('remaining corners: ', _.keys(remainingCorners))

    // This only solves one circles of length 1...
    _.reduce(remainingCorners, (r, v, k) => {
        // key is ex: GLU
        // so now reduce v so that we create a cycle for all possibilities
        // Now we create three cycles that start with this piece (G, L and U cycles)
        // These will be stored in a two dimensional array: [[G-cycle], [L-cycle], [U-cycle]]
        // So now we start with G:
        console.log('k', k)
        let cycleId = ''
        let sol = k.split('').map(s => {
            // s is either G L or U
            // So we get a cycle:
            const rrr = solveCornerCycle(codedScramble, s)
            // if (rrr.solution.length > 0) sol.push(rrr.solution)
            corners = { ...corners, ...rrr.corners }
            console.log('cylce ID: ', rrr.id)
            cycleId = rrr.id
            return rrr.solution
        })
        if (sol[0].length > 0) {
            (solveResult.cycles[cycleId] || (solveResult.cycles[cycleId] = [])).push(...sol)
        }

        console.log('corners: ', corners)
        console.log('solveResult: ', solveResult)
    }, {})

    // let cycle = {}
    // todo: now pick a random new cycle, or rather try all remaining
    // to get all possible solutions
    // right now I'll just pick a random new cycle sticker
    // cycle.corner = randomProperty(remainingCorners)
    // console.log('randomly picked corner: ', cycle.corner)
    // cycle.sticker = _.keys(cycle.corner)[Math.floor(Math.random()*_.size(cycle.corner))]
    // console.log('randomly picked sticker: ', cycle.sticker)

    // let result2 = solveCornerCycle(codedScramble, cycle)

    // solveResult.cycles.push(result2.solution)
    // corners.push(result2.corners)

    // remainingCorners = _.omit(remainingCorners, _.keys(result2.corners))

    // Are we really done yet???
    return solveResult
}

const sol = solveCorners(encode(cornerScramble3))

console.log('calculated solution: ', sol)
// console.log('correct solution: C,K,H,N,O,[(U,G)|(L,U)|(G,L)]')
console.log('correct solution: [(N,B)|(B,Q)|(Q,N)],[(M,W,U|W,U,M|U,M,W)|(C,T,L|T,L,C|L,C,T)|(J,O,G|O,G,J|G,J,O)]')








// And for edges is pretty much the same, just a different starting point
