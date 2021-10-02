import * as React from 'react'
import cx from 'classnames'
import { getWidth, widthMultiple } from './transforms'

import styles from './Bitmap.module.css'

export const Bitmap = ({ bitmap, width, onChange }) => {
  const [dragState, setDragState] = React.useState(null)

  const bitmap2arr = (bitmap) =>
    bitmap.split('\n').map((line) => {
      console.log(line.length, width)
      if (line.length < width) {
        line += ' '.repeat(width - line.length)
      }
      return line.split('').map((s) => (s === ' ' ? false : true))
    })

  const arr2bitmap = (arr) =>
    arr
      .map((row) => row.map((pixel) => (pixel ? 'x' : ' ')).join(''))
      .join('\n')

  const updater = (fn) => () => {
    const arr = bitmap2arr(bitmap)
    const value = arr2bitmap(fn(arr) || arr)
    onChange({ target: { value } })
  }

  const mouseDown = (x, y) => (event) => {
    event.preventDefault()
    let state
    updater((arr) => {
      state = arr[y][x] = !arr[y][x]
    })()
    setDragState(state)
  }

  const mouseUp = (x, y) => () => {
    console.log('mouseUp', x, y)
    setDragState(null)
  }

  const mouseEnter = (x, y) => () => {
    if (dragState !== null) {
      updater((arr) => {
        arr[y][x] = dragState
      })()
    }
  }

  const mouseLeave = () => {
    setDragState(null)
  }

  const clear = updater((arr) => arr.map((row) => row.map(() => false)))
  const invert = updater((arr) => arr.map((row) => row.map((p) => !p)))
  const shiftR = updater((arr) =>
    arr.map((row) => [...row.slice(-1), ...row.slice(0, -1)])
  )
  const shiftL = updater((arr) => arr.map((row) => [...row.slice(1), row[0]]))
  const shiftU = updater((arr) => [...arr.slice(1), arr[0]])
  const shiftD = updater((arr) => [...arr.slice(-1), ...arr.slice(0, -1)])
  const incW = updater((arr) => arr.map((row) => [...row, false]))
  const decW = updater((arr) => {
    const width = getWidth(arr.map((row) => row.length))
    const newWidth = Math.floor((width - 1) / widthMultiple) * widthMultiple
    if (newWidth !== 0) {
      return arr.map((row) => row.slice(0, newWidth))
    }
  })

  return (
    <>
      <table className={styles.table} onMouseLeave={mouseLeave}>
        {bitmap2arr(bitmap).map((arr, y) => (
          <tr key={y} className={styles.row}>
            {arr.map((pixel, x) => (
              <td
                key={x}
                className={cx(styles.cell, { [styles.on]: pixel })}
                onMouseDown={mouseDown(x, y)}
                onMouseUp={mouseUp(x, y)}
                onMouseEnter={mouseEnter(x, y)}
              />
            ))}
          </tr>
        ))}
      </table>
      <div className={styles.buttons}>
        <button onClick={clear}>clear</button>
        <button onClick={invert}>invert</button>
        <span>move</span>
        <button onClick={shiftL}>⇦</button>
        <button onClick={shiftU}>⇧</button>
        <button onClick={shiftD}>⇩</button>
        <button onClick={shiftR}>⇨</button>
        <span>width</span>
        <button onClick={decW}>⟽</button>
        <button onClick={incW}>⟾</button>
      </div>
    </>
  )
}
