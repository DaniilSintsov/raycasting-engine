import {TEXT_MAP, TILE} from './settings'

export const worldMap = new Map()
export const miniMap = new Set()

TEXT_MAP.forEach((row, i) => {
  for (let j = 0; j < row.length; j++) {
    if (row[j]) {
      miniMap.add([j * TILE, i * TILE])
      if (row[j] === 1) {
        worldMap.set([j * TILE, i * TILE], '1')
      } else if (row[j] === 2) {
        worldMap.set([j * TILE, i * TILE], '2')
      } else if (row[j] === 3) {
        worldMap.set([j * TILE, i * TILE], '3')
      } else if (row[j] === 4) {
        worldMap.set([j * TILE, i * TILE], '4')
      }
    }
  }
})
