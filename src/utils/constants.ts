import uniqolor from 'uniqolor'
import { ICardItemProps } from './types'

export const positions: ICardItemProps[] = [
  {
    id: '1',
    backgroundColor: uniqolor.random()?.color,
    defaultPosition: {
      x: 400,
      y: 100,
      height: 200,
      width: 200,
    },
  },
  {
    id: '2',
    backgroundColor: uniqolor.random()?.color,
    defaultPosition: {
      x: 700,
      y: 100,
      height: 200,
      width: 200,
    },
  },
  {
    id: '3',
    backgroundColor: uniqolor.random()?.color,
    defaultPosition: {
      x: 700,
      y: 400,
      height: 200,
      width: 200,
    },
  },
  {
    id: '4',
    backgroundColor: uniqolor.random()?.color,
    defaultPosition: {
      x: 400,
      y: 400,
      height: 200,
      width: 200,
    },
  },
]
