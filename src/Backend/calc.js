import _ from 'lodash'
import fromKey from './mapping1.json'
import toKey from './mapping2.json'
import solvedObj from './mapping3.json'
import invSolvedObj from './mapping4.json'
import pieceToIds from './mapping5.json'

const solved = 'uuuuuuuuulllllllllfffffffffrrrrrrrrrbbbbbbbbbddddddddd'
const solvd  = 'AaBd0bDcCEeFh1fHgGIiJl2jLkKMmNp3nPoOQqRt4rTsSUuVx5vXwW'

// This scramble is superflip with red center at front and yellow center on top
const scramble = 'ubulurufululblfldlfuflfrfdfrurfrbrdrbubrblbdbdfdldrdbd'

console.log(fromKey)
console.log(toKey)

function getPiece(scramble, sticker1, sticker2, sticker3) {
    // I need to add here the fromKey[...] number,
    // keep it linked to the result
    // then get the correct 
    // I need to think about how to solve this...
    const result = [ scramble.charAt(fromKey[sticker1]) ]
    if (sticker2 === undefined) {
        return result
    }
    result.push(scramble.charAt(fromKey[sticker2]))
    
    if (sticker3 === undefined) {
        return result.sort()
    }
    result.push(scramble.charAt(fromKey[sticker3]))

    return result.sort()
}

function getPieces(scramble) {
    return {
        corner1: getPiece(scramble, 'A', 'E', 'R'),
        corner2: getPiece(scramble, 'B', 'N', 'Q'),
        corner3: getPiece(scramble, 'C', 'J', 'M'),
        corner4: getPiece(scramble, 'D', 'F', 'I'),
        corner5: getPiece(scramble, 'G', 'L', 'U'),
        corner6: getPiece(scramble, 'K', 'P', 'V'),
        corner7: getPiece(scramble, 'O', 'T', 'W'),
        corner8: getPiece(scramble, 'H', 'S', 'X'),
        
        edge1: getPiece(scramble, 'a', 'q'),
        edge2: getPiece(scramble, 'b', 'm'),
        edge3: getPiece(scramble, 'c', 'i'),
        edge4: getPiece(scramble, 'd', 'e'),
        edge5: getPiece(scramble, 'h', 'r'),
        edge6: getPiece(scramble, 'f', 'l'),
        edge7: getPiece(scramble, 'j', 'p'),
        edge8: getPiece(scramble, 'n', 't'),
        edge9: getPiece(scramble, 'k', 'u'),
        edge10: getPiece(scramble, 'o', 'v'),
        edge11: getPiece(scramble, 's', 'w'),
        edge12: getPiece(scramble, 'g', 'x'),
        
        center1: getPiece(scramble, '0'),
        center2: getPiece(scramble, '1'),
        center3: getPiece(scramble, '2'),
        center4: getPiece(scramble, '3'),
        center5: getPiece(scramble, '4'),
        center6: getPiece(scramble, '5'),
    }
}

console.log(solvedObj)

// const invertedSolvedObj = _.reduce(solvedObj, (r, v, k) => {
//     const key = v.join('')
//     r[key] = k
//     return r
// }, {})

console.log(invSolvedObj)
const scrambledPieces = getPieces(scramble)

function getResults(scrambledPieces) {
    return _.mapValues(scrambledPieces, v => {
        const key = v.join('')
        const mapKey = invSolvedObj[key]
        const result = []
        result.push(pieceToIds[mapKey][v[0]])
        if (v.length > 1) result.push(pieceToIds[mapKey][v[1]])
        if (v.length > 2) result.push(pieceToIds[mapKey][v[2]])
        return result
    })
}


const something = getResults(scrambledPieces)
console.log(something)

// now I have lost the information on the order...


// Now to map to corners...

// console.log(scrambledPieces)