import store from 'store2'
import { getShareUrlData, getStateFromBitmapData } from 'src/share-url-encoder'
import { getWidthFromArray } from 'src/transforms'
import { useForceUpdate } from 'src/useForceUpdate'

import styles from './Presets.module.css'
import { Icon } from './Icon'

const bitmapStore = store.namespace('preset')

const defaultPreset = 'robot'
const presets = {
  robot: [0x42, 0x7e, 0x81, 0xa5, 0x81, 0x7e, 0x3c, 0xff],
  play: [0xff, 0x81, 0xb1, 0xbd, 0xbd, 0xb1, 0x81, 0xff],
  stop: [0xff, 0x81, 0xbd, 0xbd, 0xbd, 0xbd, 0x81, 0xff],
  ok: [0x65, 0x95, 0x95, 0x96, 0x96, 0x95, 0x95, 0x65],
  err: [0x3d, 0x42, 0x85, 0x89, 0x91, 0xa1, 0x42, 0xbc],
  number1: [0x06, 0x0e, 0x16, 0x06, 0x06, 0x06, 0x06, 0x1f],
  number2: [0x0e, 0x1b, 0x03, 0x03, 0x06, 0x0c, 0x18, 0x1f],
  number3: [0x1e, 0x03, 0x03, 0x0e, 0x03, 0x03, 0x03, 0x1e],
  number4: [0x03, 0x07, 0x0b, 0x1b, 0x1f, 0x03, 0x03, 0x03],
}

export const numberArrayToBitmapArray = (numberArray) => {
  const width = getWidthFromArray(numberArray)
  const bitmapArray = numberArray.map((n) => {
    const arr = n
      .toString(2)
      .split('')
      .map((char) => char === '1')
    const length = width - arr.length
    return [...Array.from({ length }, () => false), ...arr]
  })
  return bitmapArray
}

export const stringToBitmapArray = (arrayStr) => {
  return numberArrayToBitmapArray(
    arrayStr
      .split(/\s*,\s*/)
      .filter((s, i, { length }) => !(s === '' && i === length - 1))
      .map((s) => (s === '' ? 0 : parseInt(s)))
      .map((n) => (isNaN(n) ? 0 : n))
  )
}

export const getPreset = (name) => {
  const bitmapArray = numberArrayToBitmapArray(presets[name])
  return { name, bitmapArray }
}

export const getDefaultPreset = () => getPreset(defaultPreset)

export const getSavedBitmap = (name) => {
  const data = bitmapStore(name)
  // v0
  if (Array.isArray(data)) {
    const bitmapArray = numberArrayToBitmapArray(data)
    return { name, bitmapArray }
  }
  const { bitmapArray } = getStateFromBitmapData(data)
  return { name, bitmapArray }
}

export const saveBitmap = ({ name, width, height, bitmapArray }) => {
  if (bitmapStore.has(name)) {
    if (!confirm(`Replace local bitmap "${name}"?`)) {
      return false
    }
  }
  bitmapStore(name, getShareUrlData({ width, height, bitmapArray }))
  return true
}

export const deletePreset = (name) => bitmapStore.remove(name)

export const Presets = ({ onClick }) => {
  const update = useForceUpdate()

  const deleteBitmap = (name) => (event) => {
    event.stopPropagation()
    if (confirm(`Delete local bitmap "${name}"?`)) {
      deletePreset(name)
      update()
    }
  }
  const loadBitmap = (name) => () => {
    onClick(getSavedBitmap(name))
  }
  const loadPreset = (name) => () => {
    onClick(getPreset(name))
  }

  return (
    <div>
      {bitmapStore.size() > 0 && (
        <>
          <h3>Your saved bitmaps</h3>
          {Object.keys(bitmapStore())
            .sort()
            .map((name) => (
              <button
                key={name}
                className={styles.bitmapButton}
                onClick={loadBitmap(name)}
              >
                <span className={styles.deleteText}>{name}</span>
                <span
                  className={styles.deleteIcon}
                  onClick={deleteBitmap(name)}
                >
                  <Icon icon="far:trash-alt" />
                </span>
              </button>
            ))}
        </>
      )}
      <h3>Example bitmaps</h3>
      {Object.keys(presets).map((name) => (
        <button key={name} onClick={loadPreset(name)}>
          {name}
        </button>
      ))}
    </div>
  )
}
