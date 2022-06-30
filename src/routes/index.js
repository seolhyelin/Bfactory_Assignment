import { useEffect, useRef, useState } from 'react'

import { Stage, Layer, Image, Transformer, KonvaNodeComponent } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import useImage from 'use-image'
import { TransformerConfig } from 'konva/lib/shapes/Transformer'

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

  const move = (e) => {}
  const end = (e) => {}

  const onSelect = () => {
    setIsSelected(true)
  }

  return (
    <div className={styles.boundary}>
      <Stage width={1000} height={800}>
        <Layer>
          <Image
            image={image}
            ref={imageRef}
            x={xPos}
            y={yPos}
            draggable
            onDragMove={move}
            onDragEnd={end}
            onMouseDown={onSelect}
          />
          {isSelected && <Transformer ref={trRef} />}
        </Layer>
      </Stage>
    </div>
  )
}

export default App
