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
const solvd = 'AaBd0bDcCEeFh1fHgGIiJl2jLkKMmNp3nPoOQqRt4rTsSUuVx5vXwW'

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

// no buffer cycle and 2 cycles
const cornerScramble3 = 'bubuuuuubulllllrlfffrfffurbdrurrrlflrblbbbfbfrdddddddd'

// only a buffer cycle
const cornerScramble4 = 'llbfuurrludbblrfudufbdflfbldrrfrdbuuddfbblrrlruuldfdbf'

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
        let key = piece
            .map(id => s[id])
            .sort()
            .join('')
        let enc = map[key]
        piece.forEach(id => {
            s[id] = enc[s[id]]
        })
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

function getPiece(sticker) {
    let cid = pieceMap[sticker]
    // console.log('cid: ', cid)
    let cor = _.cloneDeep(piecesM[cid])
    // console.log('cor: ', cor)
    return { sticker, id: cid, piece: cor }
}

function getNextPiece(codedScramble, currentSticker) {
    const idx = stickerMap[currentSticker]
    // console.log('idx: ', idx)
    const sticker = codedScramble.split('')[idx]
    // console.log('new current sticker: ', sticker)
    return getPiece(sticker)
}

function solveCycle(codedScramble, startSticker, isBufferCycle = false) {
    // There exists only one solution for any cycle
    const solution = []
    const pieces = {}

    // This will be the id of the cycle and will consist of
    // all the pieces as a sorted string
    let id = ''

    const cycle = getPiece(startSticker)

    // First get the next sticker
    // let current = { sticker: cycle.sticker, corner: cycle.corner }
    // console.log('cycle: ', cycle)
    let current = getNextPiece(codedScramble, cycle.sticker)
    console.log('cycle: ', cycle)
    console.log('current: ', current)

    // 1. The cycle sticker, this means that we are on the first and last sticker in the cycle
    //    Thus we return an empty array for memorizing (nothing to memorize)
    //    And we return the corner that is solved
    if (current.sticker === cycle.sticker) {
        console.log('No cycle here...')
        // We mark the piece as solved
        pieces[current.id] = current.piece

        id = current.id

        // And return from the function
        return { solution, id, pieces }
    }

    // Add the first of the cycle into the solution array
    // As long as this is not the buffer cycle
    if (!isBufferCycle) {
        solution.push(cycle.sticker)
    }

    // This is just a security measure to make sure we don't accidentally
    // run forever
    let counter = 0

    while (counter < 12) {
        counter += 1

        // Is this sticker on the cycle piece?
        const lastInCycle = cycle.piece[current.sticker]

        console.log('another one bites the dust')

        // We add the piece to the list of pieces
        pieces[current.id] = current.piece

        // If this is the last sticker in the cycle
        if (lastInCycle) {
            // We only add this sticker to memorization
            // If we are simply twisting a piece
            if (solution.length === 1) {
                solution.push(current.sticker)
                id = current.id
            } else {
                id = _.keys(pieces)
                    .sort()
                    .join('_')
            }

            console.log('we have closed the circle')
            return { solution, id, pieces }
        }

        // Add the sticker to the memorization list
        solution.push(current.sticker)

        // and finally get next sticker/corner...
        current = getNextPiece(codedScramble, current.sticker)
    }

    // Finally we return without closing the circle...
    // This should never happen...
    console.error("This shouldn't be possible")
    return { solution, id, pieces }
}

function findSolution(codedScramble, corners = true, buffer) {
    console.log('attempting to solve: ', codedScramble)

    const solveResult = {
        bufferCycle: [],
        cycles: {},
        allSolutions: []
    }

    let bufferSticker = buffer
    if (bufferSticker === undefined) {
        bufferSticker = corners ? 'A' : 'u'
    }
    // First get an A cycle (since our buffer is A)
    const bufferCycle = solveCycle(codedScramble, bufferSticker, true)

    // Save the solution as our buffer cycle
    solveResult.bufferCycle = bufferCycle.solution

    // Keep track of our solved corners
    let pieces = bufferCycle.pieces

    // now to see if we are done
    const solvedPieceCount = _.size(pieces)
    if (corners && solvedPieceCount === 8) return solveResult
    if (!corners && solvedPieceCount === 12) return solveResult

    // Find remaining corners
    const remainingPieces = _.omit(
        _.cloneDeep(corners ? piecesM.corners : piecesM.edges),
        _.keys(pieces)
    )
    console.log('remaining pieces: ', _.keys(remainingPieces))

    // This only solves one circles of length 1...
    _.reduce(
        remainingPieces,
        (r, v, k) => {
            // key is ex: GLU
            // so now reduce v so that we create a cycle for all possibilities
            // Now we create three cycles that start with this piece (G, L and U cycles)
            // These will be stored in a two dimensional array: [[G-cycle], [L-cycle], [U-cycle]]
            // So now we start with G:
            console.log('k', k)
            let cycleId = ''
            let sol = k.split('').map(s => {
                const rrr = solveCycle(codedScramble, s)
                // corners = { ...corners, ...rrr.corners }
                // console.log('cylce ID: ', rrr.id)
                cycleId = rrr.id
                return rrr.solution
            })
            if (sol[0].length > 0) {
                ;(solveResult.cycles[cycleId] ||
                    (solveResult.cycles[cycleId] = [])
                ).push(...sol)
            }

            console.log('corners: ', pieces)
            console.log('solveResult: ', solveResult)
        },
        {}
    )

    return solveResult
}

function solve(codedScramble) {
    const corners = findSolution(codedScramble, true, 'A')
    const edges = findSolution(codedScramble, false, 'u')
    // Now we can have props like is it an odd or even number of corners/edges

    // somehow calculate all solutions
    // corners first: corners * edges
    // edges first: edges * corners
    // const allSolutions = 

    return { corners, edges }
}

const sol = solve(encode(cornerScramble4))

console.log('calculated solution (corners): ', sol.corners)
console.log('calculated solution (edges): ', sol.edges)
// console.log('correct solution: C,K,H,N,O,[(U,G)|(L,U)|(G,L)]')
// console.log('correct solution: [(N,B)|(B,Q)|(Q,N)],[(M,W,U|W,U,M|U,M,W)|(C,T,L|T,L,C|L,C,T)|(J,O,G|O,G,J|G,J,O)]')

// And for edges is pretty much the same, just a different starting point
