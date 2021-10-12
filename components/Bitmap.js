import * as React from 'react'
import Favicon from 'react-favicon'
import cx from 'classnames'
import { blockSize } from 'src/transforms'
import { numberArrayToBitmapArray } from 'components/Presets'
import { Icon } from 'components/Icon'

import styles from './Bitmap.module.css'

const getImageDataUrl = (width, height) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#0f0'
  ctx.fillRect(0, 0, width, height)
  return canvas.toDataURL('image/png')
}

const faviconSize = 16

const bgBlank = [
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00,
]
const bgBorder = [
  0x3ffc, 0x4002, 0x8001, 0x8001, 0x8001, 0x8001, 0x8001, 0x8001, 0x8001,
  0x8001, 0x8001, 0x8001, 0x8001, 0x8001, 0x4002, 0x3ffc,
]
const bgMask = [
  0x7ffe, 0xffff, 0xffff, 0xffff, 0xffff, 0xffff, 0xffff, 0xffff, 0xffff,
  0xffff, 0xffff, 0xffff, 0xffff, 0xffff, 0xffff, 0x7ffe,
]

const ButtonGroup = ({ name, children }) => (
  <span className={styles.buttonGroup}>
    {name && <span className={styles.buttonHeader}>{name}</span>}
    {children}
  </span>
)

export const Bitmap = ({
  bitmapArray,
  width,
  height,
  scale,
  onChangeBitmap,
  onChangeScale,
}) => {
  const [dragState, setDragState] = React.useState(null)
  const imageDataUrl = React.useMemo(
    () => getImageDataUrl(faviconSize, faviconSize),
    []
  )

  const setScale = (multiplier) => () => {
    onChangeScale(multiplier * scale)
  }

  const favicon = (canvas, ctx) => {
    const size = faviconSize
    const arr = new Uint8ClampedArray(4 * size * size)
    const setPixel = (x, y, state) => {
      const i = (y * size + x) * 4
      arr[i + 0] = state ? 255 : 0 // R value
      arr[i + 1] = state ? 255 : 0 // G value
      arr[i + 2] = state ? 255 : 0 // B value
    }
    const setAlpha = (x, y, alpha) => {
      const i = (y * size + x) * 4
      arr[i + 3] = alpha ? 255 : 0
    }

    const forEachPixel = (bitmapArray, fn) =>
      bitmapArray.forEach((row, y) =>
        row.forEach((pixel, x) => fn(x, y, pixel))
      )

    const bg = width <= 12 && height <= 12 ? bgBorder : bgBlank
    forEachPixel(numberArrayToBitmapArray(bg), setPixel)
    forEachPixel(numberArrayToBitmapArray(bgMask), setAlpha)

    forEachPixel(bitmapArray, (x, y, pixel) => {
      if (x < size && y < size) {
        setPixel(
          x + Math.max(0, Math.floor((size - width) / 2)),
          y + Math.max(0, Math.floor((size - height) / 2)),
          pixel
        )
      }
    })

    const imageData = new ImageData(arr, size, size)
    ctx.putImageData(imageData, 0, 0)
  }

  const mouseDown = (x, y) => (event) => {
    event.preventDefault()
    togglePixelOnClick(x, y)
  }

  const mouseEnter = (x, y) => () => {
    if (dragState !== null) {
      setPixelOnDrag(x, y)
    }
  }

  React.useEffect(() => {
    const handler = () => {
      setDragState(null)
    }
    document.addEventListener('mouseup', handler, false)
    return () => {
      document.removeEventListener('mouseup', handler, false)
    }
  })

  const not = (x) => !x
  const returnFalse = () => false

  const map = (fn) => (arr) => arr.map(fn)
  const shift = (i) => (arr) => [...arr.slice(i), ...arr.slice(0, i)]
  const add = (fn) => (arr) => [...arr, ...fn()]
  const remove = (n) => (arr) => arr.slice(0, Math.max(n, arr.length - n))
  const setItem = (fn, i) => (arr) =>
    [...arr.slice(0, i), fn(arr[i]), ...arr.slice(i + 1)]
  const array =
    (length, fn = returnFalse) =>
    () =>
      Array.from({ length }, fn)

  const updater =
    (fn) =>
    (...a) =>
    (...b) => {
      onChangeBitmap(fn(...a, ...b)(bitmapArray))
    }

  const decW = updater((n) => map(remove(n)))
  const incW = updater((n) => map(add(array(n))))
  const decH = updater((n) => remove(n))
  const incH = updater((n) => add(array(n, array(width))))

  const shiftY = updater((i) => shift(i))
  const shiftX = updater((i) => map(shift(i)))

  const perPixel = updater((fn) => map(map(fn)))
  const clear = perPixel(returnFalse)
  const invert = perPixel(not)

  const setPixel = updater((fn, x, y) => setItem(setItem(fn, x), y))
  const togglePixelOnClick = setPixel((state) => {
    setDragState(!state)
    return !state
  })
  const setPixelOnDrag = setPixel(() => dragState)

  return (
    <>
      <Favicon url={imageDataUrl} renderOverlay={favicon} />
      <div className={styles.buttons}>
        <ButtonGroup>
          <button onClick={clear} title="Clear all pixels">
            clear
          </button>
          <button onClick={invert} title="Invert all pixels">
            invert
          </button>
        </ButtonGroup>
        <ButtonGroup name="Shift">
          <button onClick={shiftX(1)} title="Shift pixels left">
            <Icon icon="fas:arrow-left" />
          </button>
          <button onClick={shiftY(-1)} title="Shift pixels down">
            <Icon icon="fas:arrow-down" />
          </button>
          <button onClick={shiftY(1)} title="Shift pixels up">
            <Icon icon="fas:arrow-up" />
          </button>
          <button onClick={shiftX(-1)} title="Shift pixels right">
            <Icon icon="fas:arrow-right" />
          </button>
        </ButtonGroup>
        <ButtonGroup name="Size">
          <span>
            {width}x{height}
          </span>
        </ButtonGroup>
        <ButtonGroup name="Width">
          <button
            onClick={decW(blockSize)}
            title={`Decrease width by ${blockSize} pixels`}
          >
            -{blockSize}
          </button>
          <button onClick={decW(1)} title="Decrease width by 1 pixel">
            -1
          </button>
          <button onClick={incW(1)} title="Increase width by 1 pixel">
            +1
          </button>
          <button
            onClick={incW(blockSize)}
            title={`Increase width by ${blockSize} pixels`}
          >
            +{blockSize}
          </button>
        </ButtonGroup>
        <ButtonGroup name="Height">
          <button
            onClick={decH(blockSize)}
            title={`Decrease height by ${blockSize} pixels`}
          >
            -{blockSize}
          </button>
          <button onClick={decH(1)} title="Decrease height by 1 pixel">
            -1
          </button>
          <button onClick={incH(1)} title="Increase height by 1 pixel">
            +1
          </button>
          <button
            onClick={incH(blockSize)}
            title={`Increase height by ${blockSize} pixels`}
          >
            +{blockSize}
          </button>
        </ButtonGroup>
        <ButtonGroup name="Pixel Size">
          <button
            onClick={setScale(0.5)}
            title="Make pixels smaller (view only)"
          >
            <Icon icon="fas:compress-arrows-alt" />
          </button>
          <button onClick={setScale(2)} title="Make pixels larger (view only)">
            <Icon icon="fas:expand-arrows-alt" />
          </button>
        </ButtonGroup>
      </div>
      <style>{`.${styles.table} { --cell-size: ${30 * scale}px; }`}</style>
      <table className={styles.table}>
        <tbody>
          {bitmapArray.map((arr, y) => (
            <tr key={y} className={styles.row}>
              {arr.map((pixel, x) => (
                <td
                  key={x}
                  className={cx(styles.cell, { [styles.on]: pixel })}
                  onMouseDown={mouseDown(x, y)}
                  onMouseEnter={mouseEnter(x, y)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
