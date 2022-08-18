export type IDragLineMeta = {
  currentEle: HTMLDivElement
  i: number
  x: number
  y: number
  w: number
  h: number
  l: number
  r: number
  t: number
  b: number
  lr: number
  tb: number
}

export type ICoordinates = {
  x: number
  y: number
}

export type ILineMeta = {
  i: number
  length: number
  origin: number
  value: number
  currentEle: HTMLDivElement
}

export type IDraggableEvent =
  | React.MouseEvent<HTMLElement | SVGElement>
  | React.TouchEvent<HTMLElement | SVGElement>
  | MouseEvent
  | TouchEvent

export interface IDraggableData {
  node: HTMLElement
  x: number
  y: number
  deltaX: number
  deltaY: number
  lastX: number
  lastY: number
}

export interface IDragOperations {
  onDrag: ({ x, y }: { x: number; y: number }) => void
  onDragStart: () => void
  onDragStop: () => void
}
