import * as React from 'react'
import Favicon from 'react-favicon'
import cx from 'classnames'
import {
  arrayToBitmap,
  blockSize,
  roundDownToBlockSize,
} from '../src/transforms'

import styles from './Bitmap.module.css'

const blackFavicon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAABzSURBVJ3BAXKCABAEsOz9/89bAXWgFqomQe0EtQka1Kkh9moT1E1dGuovdS1iMb5UtRhviTPjLXVmfCtW4y4+k1qNu3oV52ozLtT/xtdiMZ7iM7UYT3UQd3FliFUcFXFTr+JhqFWJX+pEPYydOoqdWMXRD7IJGR9tCTLHAAAAAElFTkSuQmCC'

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
  bitmap,
  width,
  height,
  scale,
  onChangeBitmap,
  onChangeScale,
}) => {
  const [dragState, setDragState] = React.useState(null)

  const setScale = (multiplier) => () => {
    onChangeScale(multiplier * scale)
  }

  const favicon = (canvas, ctx) => {
    const size = 16
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

    const forEachPixel = (bitmap, fn) =>
      bitmap2arr(bitmap).forEach((row, y) =>
        row.forEach((pixel, x) => fn(x, y, pixel))
      )

    const widthMin = width === 8
    const heightMin = height === 8
    const bg = widthMin && heightMin ? bgBorder : bgBlank
    forEachPixel(arrayToBitmap({ array: bg }).bitmap, setPixel)
    forEachPixel(arrayToBitmap({ array: bgMask }).bitmap, setAlpha)

    forEachPixel(bitmap, (x, y, pixel) => {
      setPixel(x + (widthMin ? 4 : 0), y + (heightMin ? 4 : 0), pixel)
    })

    const imageData = new ImageData(arr, 16, 16)
    ctx.putImageData(imageData, 0, 0)
  }

  const bitmap2arr = (bitmap) =>
    bitmap.split('\n').map((line) => {
      if (line.length < width) {
        line += ' '.repeat(width - line.length)
      }
      return line.split('').map((s) => (s === ' ' ? false : true))
    })

  const arr2bitmap = (arr) =>
    arr
      .map((row) => row.map((pixel) => (pixel ? 'x' : ' ')).join(''))
      .join('\n')

  const update = (fn) => updater(fn)()
  const updater = (fn) => () => {
    const arr = bitmap2arr(bitmap)
    onChangeBitmap(arr2bitmap(fn(arr) || arr))
  }

  const mouseDown = (x, y) => (event) => {
    event.preventDefault()
    let state
    update((arr) => {
      state = arr[y][x] = !arr[y][x]
    })
    setDragState(state)
  }

  const mouseEnter = (x, y) => () => {
    if (dragState !== null) {
      update((arr) => {
        arr[y][x] = dragState
      })
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

  const clearPixel = () => false
  const invertPixel = (pixel) => !pixel

  const map = (fn) => (arr) => arr.map(fn)
  const shift = (i) => (arr) => [...arr.slice(i), ...arr.slice(0, i)]
  const add = (fn) => (arr) => [...arr, ...fn()]
  const trim = (i) => (arr) => arr.slice(0, i)
  const array =
    (length, fn = clearPixel) =>
    () =>
      Array.from({ length }, fn)

  const clear = updater(map(map(clearPixel)))
  const invert = updater(map(map(invertPixel)))

  const shiftL = updater(map(shift(1)))
  const shiftR = updater(map(shift(-1)))
  const shiftU = updater(shift(1))
  const shiftD = updater(shift(-1))

  const decW = updater(map(trim(roundDownToBlockSize(width - 1))))
  const incW = updater(map(add(array(blockSize))))
  const decH = updater(trim(roundDownToBlockSize(height - 1)))
  const incH = updater(add(array(blockSize, array(width))))

  return (
    <>
      <Favicon url={blackFavicon} renderOverlay={favicon} />
      <div className={styles.buttons}>
        <ButtonGroup>
          <button onClick={clear}>clear</button>
          <button onClick={invert}>invert</button>
        </ButtonGroup>
        <ButtonGroup name="Move">
          <button onClick={shiftL}>⇦</button>
          <button onClick={shiftD}>⇩</button>
          <button onClick={shiftU}>⇧</button>
          <button onClick={shiftR}>⇨</button>
        </ButtonGroup>
        <ButtonGroup name="Size">
          <span>
            {width}x{height}
          </span>
        </ButtonGroup>
        <ButtonGroup name="Width">
          <button onClick={decW}>-{blockSize}</button>
          <button onClick={incW}>+{blockSize}</button>
        </ButtonGroup>
        <ButtonGroup name="Height">
          <button onClick={decH}>-{blockSize}</button>
          <button onClick={incH}>+{blockSize}</button>
        </ButtonGroup>
        <ButtonGroup name="Pixel Scale">
          <button onClick={setScale(0.5)}>⇩</button>
          <button onClick={setScale(2)}>⇧</button>
        </ButtonGroup>
      </div>
      <style>{`.${styles.table} { --cell-size: ${30 * scale}px; }`}</style>
      <table className={styles.table}>
        <tbody>
          {bitmap2arr(bitmap).map((arr, y) => (
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
