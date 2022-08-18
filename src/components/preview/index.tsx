import React, { ReactElement, ReactNode, useMemo, useState } from 'react'
import { calcLineValues, calcPosValues, unique } from '../../common/utils'
import { ICoordinates, IDragLineMeta, IDragOperations, ILineMeta } from '../../common/types'
import DragLines from '../drag-lines'

interface IPreviewProps {
  children: ReactNode[]
  limit?: boolean
  styles?: {
    wrapper?: React.CSSProperties
    xLineStyle?: React.CSSProperties
    yLineStyle?: React.CSSProperties
  }
}

const Preview = (props: IPreviewProps) => {
  const parentRef = React.useRef<HTMLDivElement>()
  const [lines, setLines] = useState<{
    vLines: ILineMeta[]
    hLines: ILineMeta[]
  }>({
    vLines: [],
    hLines: [],
  })

  const dragLines = React?.useRef<IDragLineMeta[]>([])
  const [indices, setIndices] = useState<number[]>([])
  const reset = () => {
    setLines({
      vLines: [],
      hLines: [],
    })
  }

  const init = () => {
    dragLines.current = props.children.map((_child, i) => {
      const currentEle = parentRef?.current?.childNodes[i] as HTMLDivElement
      const x = Number(currentEle?.getAttribute('data-x'))
      const y = Number(currentEle?.getAttribute('data-y'))

      const w = currentEle.clientWidth
      const h = currentEle.clientHeight

      return {
        currentEle,
        i,
        x,
        y,
        w,
        h,
        l: x,
        r: x + w,
        t: y,
        b: y + h,
        lr: x + w / 2,
        tb: y + h / 2,
      }
    })
  }

  const checkDragOut = ({ x, y }: { x: number; y: number }, target: IDragLineMeta) => {
    if (!parentRef?.current) {
      return {
        limitX: x,
        limitY: y,
      }
    }
    const maxLeft = parentRef?.current?.clientWidth - target.w
    const maxTop = parentRef?.current?.clientHeight - target.h

    let limitX = x
    let limitY = y

    if (x < 0) {
      limitX = 0
    } else if (x > maxLeft) {
      limitX = maxLeft
    }

    if (y < 0) {
      limitY = 0
    }
    if (y > maxTop) {
      limitY = maxTop
    }

    return { limitX, limitY }
  }

  const calcAndDrawLines = (values: ICoordinates, target: IDragLineMeta, compares: IDragLineMeta[]) => {
    const { v: x, indices: indices_x, lines: vLines } = calcPosValues(values, target, compares, 'x')
    const { v: y, indices: indices_y, lines: hLines } = calcPosValues(values, target, compares, 'y')

    const indices = unique(indices_x.concat(indices_y as number[]))

    if (vLines?.length && hLines?.length) {
      vLines?.forEach((line: ILineMeta) => {
        const compare = compares.find(({ i }: { i: number }) => i === line.i)
        const { length, origin } = calcLineValues({ x, y }, target, compare as IDragLineMeta, 'x')

        line.length = length
        line.origin = origin
      })

      hLines?.forEach((line: ILineMeta) => {
        const compare = compares.find(({ i }: { i: number }) => i === line.i)
        const { length, origin } = calcLineValues({ x, y }, target, compare as IDragLineMeta, 'y')

        line.length = length
        line.origin = origin
      })
    }
    setIndices(indices)
    setLines({
      vLines,
      hLines,
    })

    return { x, y }
  }

  const calculate = (index: number) => {
    return (x: number, y: number) => {
      const target = dragLines.current[index]
      const compares = dragLines.current.filter((_: IDragLineMeta, i: number) => i !== index)

      if (props.limit && parentRef?.current) {
        const { limitX, limitY } = checkDragOut({ x, y }, target)
        x = limitX
        y = limitY
      }

      if (compares.length === 0) {
        return { x, y }
      }

      return calcAndDrawLines({ x, y }, target, compares)
    }
  }

  const getDragOperations = (index: number): IDragOperations => ({
    onDrag: ({ x, y }: { x: number; y: number }) => {
      calculate(index)(x, y)
    },
    onDragStart: () => {
      init()
    },
    onDragStop: () => {
      reset()
    },
  })

  const { children, styles } = props

  const wrapperStyle = useMemo(() => {
    const wrapper: React.CSSProperties = {
      width: '100%',
      height: '100%',
      position: 'relative',
    }
    if (styles?.wrapper) {
      return { ...wrapper, ...styles?.wrapper }
    }
    return
  }, [styles])

  return (
    <div ref={parentRef! as React.RefObject<HTMLDivElement>} style={wrapperStyle}>
      {children?.length > 1 ? (
        <>
          {children.map((child: any, index) =>
            React.cloneElement(child as ReactElement, {
              dragOperations: getDragOperations(index),
              active: indices?.includes(index) ?? false,
              key: child?.props?.widgetData?.id,
            }),
          )}
        </>
      ) : (
        children
      )}
      <DragLines lines={lines} xLineStyle={styles?.xLineStyle} yLineStyle={styles?.yLineStyle} />
    </div>
  )
}

export default React.memo(Preview)
