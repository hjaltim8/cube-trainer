console.log('hello world')

// const cube = {
//     corners: {
//         A: {},
//         B: {},
//         C: {},
//         D: {},
//         E: {},
//         F: {},
//         G: {},
//         H: {},
//         I: {},
//         J: {},
//         K: {},
//         L: {},
//         M: {},
//         N: {},
//         O: {},
//         P: {},
//         Q: {},
//         R: {},
//         S: {},
//         T: {},
//         U: {},
//         V: {},
//         W: {},
//         X: {},
//     },
//     edges: {
//         a: {},
//         b: {},
//         c: {},
//         d: {},
//         e: {},
//         f: {},
//         g: {},
//         h: {},
//         i: {},
//         j: {},
//         k: {},
//         l: {},
//         m: {},
//         n: {},
//         o: {},
//         p: {},
//         q: {},
//         r: {},
//         s: {},
//         t: {},
//         u: {},
//         v: {},
//         w: {},
//         x: {},
//     },
// }

const corners = {
    1: { stickers: { u: 'A', l: 'E', b: 'R' }, type: 'corner' },
    2: { stickers: { u: 'B', r: 'N', b: 'Q' }, type: 'corner' },
    3: { stickers: { u: 'C', r: 'M', f: 'J' }, type: 'corner' },
    4: { stickers: { u: 'D', l: 'F', f: 'I' }, type: 'corner' },
    5: { stickers: { d: 'U', l: 'G', f: 'L' }, type: 'corner' },
    6: { stickers: { d: 'V', r: 'P', f: 'K' }, type: 'corner' },
    7: { stickers: { d: 'W', r: 'O', b: 'T' }, type: 'corner' },
    8: { stickers: { d: 'X', l: 'H', b: 'S' }, type: 'corner' },
}

const edges = {
    1: { stickers: { u: 'a', b: 'q' }, type: 'edge' },
    2: { stickers: { u: 'b', r: 'm' }, type: 'edge' },
    3: { stickers: { u: 'c', f: 'i' }, type: 'edge' },
    4: { stickers: { u: 'd', l: 'e' }, type: 'edge' },
    5: { stickers: { f: 'l', l: 'f' }, type: 'edge' },
    6: { stickers: { f: 'j', r: 'p' }, type: 'edge' },
    7: { stickers: { b: 't', r: 'n' }, type: 'edge' },
    8: { stickers: { b: 'r', l: 'h' }, type: 'edge' },
    9: { stickers: { d: 'u', f: 'k' }, type: 'edge' },
    10: { stickers: { d: 'v', r: 'o' }, type: 'edge' },
    11: { stickers: { d: 'w', b: 's' }, type: 'edge' },
    12: { stickers: { d: 'x', l: 'g' }, type: 'edge' },
}

const centers = {
    1: { stickers: { u: '0' }, type: 'cemter' },
    2: { stickers: { l: '1' }, type: 'cemter' },
    3: { stickers: { f: '2' }, type: 'cemter' },
    4: { stickers: { r: '3' }, type: 'cemter' },
    5: { stickers: { b: '4' }, type: 'cemter' },
    6: { stickers: { d: '5' }, type: 'cemter' },
}

// const cubee = {
//     ulb: {}, ucb: {}, urb: {}, ucl: {}, uc: {}, ucr: {}, ulf: {}, ucf: {}, urf: {},
//     lbu: {}, lcu: {}, lfu: {}, lcb: {}, lc: {}, lcf: {}, lbd: {}, lcd: {}, lfd: {},
//     flu: {}, fcu: {}, fru: {}, fcl: {}, fc: {}, fcr: {}, fld: {}, fcd: {}, frd: {},
//     rfu: {}, rcu: {}, rbu: {}, rcf: {}, rc: {}, rcb: {}, rfd: {}, rfd: {}, rbd: {},
//     bru: {}, bcu: {}, blu: {}, bcr: {}, bc: {}, bcl: {}, brd: {}, bcd: {}, bld: {},
//     dlf: {}, dcf: {}, drf: {}, dcl: {}, dc: {}, dcr: {}, dlb: {}, dcb: {}, drb: {},
// }
// U/L/F/R/B/D => Solved ex
const solved = 'uuuuuuuuulllllllllfffffffffrrrrrrrrrbbbbbbbbbddddddddd'
const solvd = 'AaBd0bDcCEeFh1fHgGIiJl2jLkKMmNp3nPoOQqRt4rTsSUuVx5vXwW'

function mapCubeToLetters(cubeString) {
    // map the string into their corners...
    // and get the correct bld id from that
    const corners = []
    corners.push([cubeString.charAt(0), cubeString.charAt(9), cubeString.charAt(38)]) // ulb AER
    corners.push([cubeString.charAt(0), cubeString.charAt(9), cubeString.charAt(38)]) // urb BNQ
    corners.push([cubeString.charAt(0), cubeString.charAt(9), cubeString.charAt(38)]) // ufr CJM
    corners.push([cubeString.charAt(0), cubeString.charAt(9), cubeString.charAt(38)]) // ulf DFI
    corners.push([cubeString.charAt(0), cubeString.charAt(9), cubeString.charAt(38)]) // lfd GLU
    corners.push([cubeString.charAt(0), cubeString.charAt(9), cubeString.charAt(38)]) // frd KPV
    corners.push([cubeString.charAt(0), cubeString.charAt(9), cubeString.charAt(38)]) // rbd OTW
    corners.push([cubeString.charAt(0), cubeString.charAt(9), cubeString.charAt(38)]) // lbd HSX
}