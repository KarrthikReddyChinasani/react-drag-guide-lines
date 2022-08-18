import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { ReactAlignLinesContainer } from '../../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <ReactAlignLinesContainer>
        {[1, 2, 3].map((item) => (
          <div key={item}></div>
        ))}
      </ReactAlignLinesContainer>,
    )
  })
})
