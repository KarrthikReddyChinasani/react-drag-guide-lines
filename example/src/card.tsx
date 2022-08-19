import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import { ICardProps, IDraggableData, IDraggableEvent, IPosition } from './utils/types'
import { getForeGroundColorRgb, getShade } from './utils/utils'

const Card = (props: ICardProps) => {
  const { id, backgroundColor, defaultPosition, dragOperations } = props
  const lastPosition = useRef<{
    x: number
    y: number
  }>({
    x: 0,
    y: 0,
  })

  const [position, setPosition] = useState<IPosition>({
    x: 0,
    y: 0,
    width: 220,
    height: 80,
  })

  useEffect(() => {
    setPosition(defaultPosition)
  }, [defaultPosition, setPosition])

  const handleDrag = (deltaX: number, deltaY: number) => {
    if (deltaX === position.x && deltaY === position.y) {
      return
    }
    const newState = {
      ...position,
      x: deltaX,
      y: deltaY,
    }
    setPosition({
      ...newState,
    })
  }

  const handleDragEnd = (e: IDraggableEvent, d: IDraggableData) => {
    handleDrag(d.x, d.y)
    dragOperations?.onDragStop()
  }

  const handleDragStart = (e: IDraggableEvent, d: IDraggableData) => {
    lastPosition.current = {
      x: d.lastX - position.x,
      y: d.lastY - position.y,
    }
    dragOperations?.onDragStart()
  }

  const handleDragging = (e: IDraggableEvent, d: IDraggableData) => {
    const dragX = d.lastX - lastPosition.current.x
    const dragY = d.lastY - lastPosition.current.y
    dragOperations?.onDrag({ x: dragX, y: dragY })
  }

  const foreGroundColor = useMemo(() => {
    const background = getShade(backgroundColor, 1)
    const foreground = getForeGroundColorRgb(background)
    return foreground
  }, [backgroundColor])

  return (
    <Rnd
      size={{
        width: position.width,
        height: position.height,
      }}
      position={{
        x: position.x,
        y: position.y,
      }}
      onDragStop={handleDragEnd}
      onDragStart={handleDragStart}
      onDrag={handleDragging}
      bounds='parent'
      data-x={position.x}
      data-y={position.y}
      key={id}
    >
      <div
        style={{
          backgroundColor,
          height: position?.height,
          width: position?.width,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: foreGroundColor,
        }}
      >
        Drag me!!!
      </div>
    </Rnd>
  )
}

export default Card
