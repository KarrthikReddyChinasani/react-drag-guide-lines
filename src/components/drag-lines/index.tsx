import React from 'react'
import { ILineMeta } from '../../common/types'

export interface IDragLinesProps {
  xLineStyle?: React.CSSProperties
  yLineStyle?: React.CSSProperties
  lines?: {
    vLines: ILineMeta[]
    hLines: ILineMeta[]
  }
}

const DragLines = (props: IDragLinesProps) => {
  const { xLineStyle, yLineStyle, lines } = props

  const Container = React.Fragment || 'div'

  return (
    <Container>
      {lines?.vLines.map(({ length, value, origin }: ILineMeta, i: number) => (
        <span
          key={`v-${i}`}
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            width: '1px',
            ...yLineStyle,
            left: value,
            top: origin,
            height: length,
            zIndex: 10,
          }}
        />
      ))}
      {lines?.hLines.map(({ length, value, origin }: ILineMeta, i: number) => (
        <span
          key={`h-${i}`}
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            ...xLineStyle,
            top: value,
            left: origin,
            width: length,
            height: 1,
          }}
        />
      ))}
    </Container>
  )
}

export default DragLines
