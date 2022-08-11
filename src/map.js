import {TEXT_MAP, TILE} from './settings'

export const worldMap = new Map()
export const miniMap = new Set()

TEXT_MAP.forEach((row, i) => {
  for (let j = 0; j < row[0].length; j++) {
    if (row[0][j] !== '.') {
      miniMap.add([j * TILE, i * TILE])
      if (row[0][j] === '1') {
        worldMap.set([j * TILE, i * TILE], '1')
      } else if (row[0][j] === '2') {
        worldMap.set([j * TILE, i * TILE], '2')
      }
    }
  }
})
