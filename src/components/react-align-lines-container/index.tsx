import React, { ReactNode } from 'react'
import Preview from '../preview'

interface IReactAlignLinesContainerProps {
  children: ReactNode[]
  emptyState?: ReactNode
  showEmptyState?: boolean
  limit?: boolean
  styles?: {
    wrapper?: React.CSSProperties
    xLineStyle?: React.CSSProperties
    yLineStyle?: React.CSSProperties
  }
}

const ReactAlignLinesContainer = (props: IReactAlignLinesContainerProps) => {
  const { emptyState, showEmptyState, ...rest } = props

  if (showEmptyState) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {emptyState}
      </div>
    )
  }

  return <Preview {...rest} />
}

export default ReactAlignLinesContainer
