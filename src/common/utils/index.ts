import { ICoordinates, IDragLineMeta, ILineMeta } from '../types'

export const ALL_DIRECTIONS = ['tt', 'bb', 'll', 'rr', 'hc', 'wc', 'lr', 'rl', 'tb', 'bt']
const threshold = 5

/**
 * made it generic for future use. Cannot remove any
 * */
export function unique(array: number[], compare = (a: number, b: number) => a === b) {
  const result = []
  for (let i = 0, len = array.length; i < len; i++) {
    const current = array[i]
    if (result.findIndex((v) => compare(v, current)) === -1) {
      result.push(current)
    }
  }
  return result
}

/**
 * made it generic for future use. Cannot remove any
 * */
export const checkArrayWithPush = (target: any, key: string | number, value: any) => {
  if (Array.isArray(target[key])) {
    target[key].push(value)
  } else {
    target[key] = [value]
  }
}

export const getMaxDistance = (arr: number[]) => {
  const num = arr.sort((a, b) => a - b)
  return num[num.length - 1] - num[0]
}

export const calcLineValues = (values: ICoordinates, target: IDragLineMeta, compare: IDragLineMeta, key: 'x' | 'y') => {
  const { x, y } = values
  const { h: H, w: W } = target
  const { l, r, t, b } = compare
  const T = y,
    B = y + H,
    L = x,
    R = x + W

  const direValues = {
    x: [t, b, T, B],
    y: [l, r, L, R],
  }

  const length = getMaxDistance(direValues[key])
  const origin = Math.min(...direValues[key])
  return { length, origin }
}

const calcPosValuesSingle = (
  values: ICoordinates,
  dire: string,
  target: IDragLineMeta,
  compare: IDragLineMeta,
  key: 'x' | 'y',
) => {
  const { x, y } = values
  const W = target.w
  const H = target.h
  const { l, r, t, b, lr, tb } = compare
  const { origin, length } = calcLineValues({ x, y }, target, compare, key)

  const result = {
    near: false,
    dist: Number.MAX_SAFE_INTEGER,
    value: 0,
    length,
    origin,
  }

  switch (dire) {
    case 'wc':
      result.dist = x + W / 2 - lr
      result.value = lr
      break
    case 'll':
      result.dist = x - l
      result.value = l
      break
    case 'rl':
      result.dist = x + W - l
      result.value = l
      break
    case 'lr':
      result.dist = r - x
      result.value = r
      break
    case 'rr':
      result.dist = x + W - r
      result.value = r
      break
    case 'tt':
      result.dist = y - t
      result.value = t
      break
    case 'tb':
      result.dist = y - b
      result.value = b
      break
    case 'bt':
      result.dist = y + H - t
      result.value = t
      break
    case 'bb':
      result.dist = y + H - b
      result.value = b
      break
    case 'hc':
      result.dist = y + H / 2 - tb
      result.value = tb
      break
  }

  if (Math.abs(result.dist) < threshold + 1) {
    result.near = true
  }

  return result
}

export const calcPosValues = (
  values: ICoordinates,
  target: IDragLineMeta,
  compares: IDragLineMeta[],
  key: 'x' | 'y',
  allowedDirections: string[],
) => {
  const results = {}

  const directions = {
    x: ['ll', 'rr', 'wc', 'rl', 'lr'],
    y: ['tt', 'bb', 'hc', 'tb', 'bt'],
  }

  // filter unnecessary directions
  const validDirections = directions[key].filter((dire) => allowedDirections.includes(dire))

  compares.forEach((compare: IDragLineMeta) => {
    validDirections.forEach((dire) => {
      const { near, dist, value, origin, length } = calcPosValuesSingle(values, dire, target, compare, key)
      if (near) {
        checkArrayWithPush(results, dist, {
          i: compare.i,
          currentEle: compare.currentEle,
          value,
          origin,
          length,
        })
      }
    })
  })

  const resultArray = Object.entries(results)
  if (resultArray.length) {
    const [minDistance, activeCompares] = resultArray.sort(
      ([dist1], [dist2]) => Math.abs(parseFloat(dist1 + '')) - Math.abs(parseFloat(dist2 + '')),
    )[0]
    const dist = parseInt(minDistance)
    return {
      v: values[key] - dist,
      dist: dist,
      lines: activeCompares as ILineMeta[],
      indices: (activeCompares as ILineMeta[]).map(({ i }) => i),
    }
  }

  return {
    v: values[key],
    dist: 0,
    lines: [],
    indices: [],
  }
}
