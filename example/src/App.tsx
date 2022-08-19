import React, { useMemo } from 'react'
import { ReactAlignLinesContainer } from 'react-drag-guide-lines'
import uniqolor from 'uniqolor'
import Card from './card'
import { positions } from './utils/constants'
import { ICardItemProps } from './utils/types'
import { getForeGroundColorRgb, getShade } from './utils/utils'

const App = () => {
  const [cards, setCards] = React.useState<ICardItemProps[]>(positions)

  const handleNewCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCards((prevCards) => [
      ...prevCards,
      {
        id: `${prevCards.length + 1}`,
        backgroundColor: uniqolor.random()?.color,
        defaultPosition: {
          x: 500,
          y: 200,
          height: 200,
          width: 200,
        },
      },
    ])
  }

  const colorData = useMemo(() => {
    const color = uniqolor.random()
    const background = getShade(color.color, 1)
    const foreground = getForeGroundColorRgb(background)
    return {
      ...color,
      foreground,
    }
  }, [])

  return (
    <div className='container'>
      <div className='header'>
        <span
          className='title'
          style={{
            color: colorData?.color,
          }}
        >
          React Drag Align Lines
        </span>
        <button
          onClick={handleNewCard}
          style={{
            backgroundColor: colorData?.color,
            color: colorData?.foreground,
          }}
        >
          Add new card
        </button>
      </div>
      <div className='containerWrapper'>
        <ReactAlignLinesContainer
          styles={{
            wrapper: {
              width: '100%',
              height: '100%',
            },
            xLineStyle: {
              backgroundColor: colorData.color,
            },
            yLineStyle: {
              backgroundColor: colorData.color,
            },
          }}
          limit={true}
        >
          {cards.map((item) => (
            <Card {...item} key={item.id} />
          ))}
        </ReactAlignLinesContainer>
      </div>
      <div className='footer'>
        Made with &nbsp;<span className='heart'> ♥ </span>&nbsp; in India
      </div>
    </div>
  )
}

export default App
