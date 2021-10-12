import store from 'store2'
import { defaultFormat, formatters } from './formatters'
import { stringToBitmapArray } from 'components/Presets'
import { getShareUrlData } from './share-url-encoder'

const transformStore = store.namespace('transform')

export const transform =
  (...transformations) =>
  (state) =>
    transformations.reduce(
      (acc, transformation) => ({
        ...acc,
        ...transformation(acc),
      }),
      state
    )

export const blockSize = 8
export const roundUpToBlockSize = (arg) => {
  const maxSize = Array.isArray(arg) ? Math.max(...arg) : arg
  return Math.ceil(maxSize / blockSize) * blockSize
}
export const roundDownToBlockSize = (arg) => {
  const maxSize = Array.isArray(arg) ? Math.max(...arg) : arg
  return Math.max(1, Math.floor(maxSize / blockSize)) * blockSize
}

export const getWidthFromBitmap = (bitmap) => {
  return roundUpToBlockSize(bitmap.split('\n').map((s) => s.length))
}

export const getHeightFromBitmap = (bitmap) => {
  return roundUpToBlockSize(bitmap.split('\n').length)
}

export const getWidthFromArray = (array) => {
  return roundUpToBlockSize(array.map((n) => n.toString(2).length))
}

export const getHeightFromArray = (array) => {
  return roundUpToBlockSize(array.length)
}

// State transformers

export const codeToBitmapArray = ({ code, format }) => {
  const {
    name = '',
    arrayStr = '',
    bitmapArray = /\S/.test(arrayStr) ? stringToBitmapArray(arrayStr) : [],
  } = formatters[format].fromCode(code.trim()) || {}
  return { name, bitmapArray }
}

export const getCode = ({ name, bitmapArray, format }) => {
  const code = formatters[format].toCode({ name, bitmapArray })
  return { code }
}

export const getDimensions = ({ bitmapArray }) => {
  const width = Math.max(...bitmapArray.map((row) => row.length))
  const height = bitmapArray.length
  return { width, height }
}

export const getShareUrl = ({ name, width, height, bitmapArray }) => {
  const href = location.href.replace(/\/share\/.*/, '').replace(/\/$/, '')
  const data = getShareUrlData({ name, width, height, bitmapArray })
  const shareUrl = `${href}/share/${data}`
  return { shareUrl }
}

// Property validators

export const validateName = ({ name }) => {
  name = name.replace(/\W/g, '_')
  return { name }
}

export const validateFormat = ({ format = transformStore('format') }) => {
  if (!formatters[format]) {
    format = defaultFormat
  }
  transformStore('format', format)
  return { format }
}

const defaultScale = 1
export const validateScale = ({
  scale = transformStore('scale') || defaultScale,
}) => {
  scale = Math.max(0.25, Math.min(scale, 2))
  transformStore('scale', scale)
  return { scale }
}

// Debugging

export const printBitmapArray = ({ bitmapArray }) => {
  const { length } = bitmapArray[0]
  const digit = (n) => n % 10
  console.log(
    [
      `  ${Array.from({ length }, (_, i) => digit(i)).join('')}`,
      ...bitmapArray.map(
        (row, i) =>
          `${digit(i)}|${row.map((pixel) => (pixel ? 'x' : ' ')).join('')}|`
      ),
    ].join('\n')
  )
}

export const printState = (state) => {
  const replacer = (key, value) => {
    if (key === 'bitmapArray') {
      return '(omitted)'
    }
    return value
  }
  console.log(JSON.stringify(state, replacer, 2))
}
