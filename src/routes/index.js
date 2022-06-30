import { useEffect, useRef, useState, useLayoutEffect } from 'react'

import { Stage, Layer, Image, Transformer } from 'react-konva'

import useImage from 'use-image'
import 'react-image-crop/src/ReactCrop.scss'
import Button from './components/Button'
import styles from './routes.module.scss'

const initialEditConfig = {
  isMovable: false,
  isResizable: false,
  isRotatable: false,
  isCropable: false,
}

const App = () => {
  const imageRef = useRef(null)
  const stageRef = useRef(null)
  const [image] = useImage(
    'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202202/04/90405d1a-3a70-4b4b-8702-83f593d35caa.jpg'
  )
  const [xPos, setXPos] = useState(0)
  const [yPos, setYPos] = useState(0)
  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(400)
  const [isSelected, setIsSelected] = useState(false)
  const [editConfig, setEditConfig] = useState(initialEditConfig)
  const trRef = useRef(null)

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imageRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage()
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

  const onChange = (newAttrs) => {
    if (editConfig.isResizable) {
      const { width, height } = newAttrs
      setWidth(width)
      setHeight(height)
    }
  }

  const onToggleEditMode = (e) => {
    const currentSelectedName = e.currentTarget.dataset.name
    const initializeEditConfig = {
      isMovable: false,
      isResizable: false,
      isRotatable: false,
      isCropable: false,
    }
    const updatedEditConfig = {
      ...initializeEditConfig,
      [currentSelectedName]: true,
    }

    setEditConfig(updatedEditConfig)
  }

  return (
    <main>
      <Button name='isMovable' color='orange' onToggleEditMode={onToggleEditMode}>
        이동
      </Button>
      <Button name='isRotatable' color='green' onToggleEditMode={onToggleEditMode}>
        회전
      </Button>
      <Button name='isResizable' color='blue' onToggleEditMode={onToggleEditMode}>
        사이즈 변경
      </Button>
      <Button name='isCropable' color='purple' onToggleEditMode={onToggleEditMode}>
        crop
      </Button>
      <Button color='yellow'>제출</Button>
      <div className={styles.boundary} style={{ backgroundColor: 'white' }}>
        <Stage width={1000} height={800} onMouseDown={checkDeselect} onTouchStart={checkDeselect} ref={stageRef}>
          <Layer>
            <Image
              width={width}
              height={height}
              image={image}
              ref={imageRef}
              src={image}
              x={xPos}
              y={yPos}
              draggable
              onDragMove={move}
              onMouseDown={onSelect}
              onTransformEnd={() => {
                const node = imageRef.current
                const scaleX = node.scaleX()
                const scaleY = node.scaleY()

                node.scaleX(1)
                node.scaleY(1)
                onChange({
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, node.width() * scaleX),
                  height: Math.max(node.height() * scaleY),
                })
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
        x : {xPos.toFixed(2)} y : {yPos.toFixed(2)}
      </p>
    </main>
  )
}

export default App
