import { useEffect, useRef, useState } from 'react'

import { Stage, Layer, Image, Transformer } from 'react-konva'
import useImage from 'use-image'

import styles from './routes.module.scss'

const App = () => {
  const imageRef = useRef(null)
  const [image] = useImage(
    'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202202/04/90405d1a-3a70-4b4b-8702-83f593d35caa.jpg'
  )
  const [xPos, setXPos] = useState(50)
  const [yPos, setYPos] = useState(50)
  const [isSelected, setIsSelected] = useState(false)
  const trRef = useRef(null)

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imageRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getState()
    if (clickedOnEmpty) {
      setIsSelected(null)
    }
  }

  const move = (e) => {
    setXPos(e.currentTarget.x())
    setYPos(e.currentTarget.y())
  }

  const onSelect = () => {
    setIsSelected(true)
  }

  return (
    <>
      <div className={styles.boundary}>
        <Stage width={1000} height={800} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
          <Layer>
            <Image
              image={image}
              ref={imageRef}
              x={xPos}
              y={yPos}
              draggable
              onDragMove={move}
              onMouseDown={onSelect}
              onTransformEnd={(e) => {
                const node = imageRef.current
                const scaleX = node.scaleX()
                const scaleY = node.scaleY()

                node.scaleX(1)
                node.scaleY(1)
              }}
            />
            {isSelected && (
              <Transformer
                ref={trRef}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox
                  }
                  return newBox
                }}
              />
            )}
          </Layer>
        </Stage>
      </div>
      <p>
        x : {xPos} y : {yPos}
      </p>
    </>
  )
}

export default App
