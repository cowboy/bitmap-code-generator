import store from 'store2'
import { formatters } from './formatters'

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

export const printBitmap = ({ bitmap }) => {
  const width = getWidthFromBitmap(bitmap)
  const digit = (n) => n % 10
  console.log(
    [
      `  ${Array.from({ length: width }, (_, i) => digit(i)).join('')}`,
      ...bitmap.split('\n').map((s, i) => `${digit(i)}|${s}|`),
    ].join('\n')
  )
}

export const codeToArray = ({ code, format }) => {
  const {
    name = '',
    arrayStr = '',
    array = /\S/.test(arrayStr)
      ? arrayStr
          .split(/\s*,\s*/)
          .filter((s, i, { length }) => !(s === '' && i === length - 1))
          .map((s) => (s === '' ? 0 : parseInt(s)))
          .map((n) => (isNaN(n) ? 0 : n))
      : [],
  } = formatters[format].fromCode(code.trim()) || {}
  return { name, array }
}

export const arrayToBitmap = ({ array }) => {
  const width = getWidthFromArray(array)
  const bitmap = array
    .map((n) => {
      const s = n.toString(2).replace(/0/g, ' ').replace(/1/g, 'x')
      const padding = ' '.repeat(Math.max(0, width - s.length))
      return `${padding}${s}`
    })
    .join('\n')
  return { bitmap }
}

export const bitmapToArray = ({ bitmap }) => {
  const width = getWidthFromBitmap(bitmap)
  const array = bitmap.split('\n').map((s) => {
    s = s.replace(/ /g, '0').replace(/[^0]/g, '1')
    const padding = '0'.repeat(Math.max(0, width - s.length))
    s += padding
    const n = parseInt(s, 2)
    return isNaN(n) ? 0 : n
  })
  return { array }
}

export const getCode = ({ array, name, format }) => {
  const width = roundUpToBlockSize(array.map((n) => n.toString(2).length))
  const hexDigits = (Math.pow(2, width) - 1).toString(16).length
  const hexValue = (n) => {
    const hexStr = `${'0'.repeat(hexDigits)}${n.toString(16)}`.slice(-hexDigits)
    return `0x${hexStr}`
  }
  const arrayStr = array.map(hexValue).join(', ')
  const code = formatters[format].toCode({ name, array, arrayStr })
  return { code }
}

export const getDimensions = ({ bitmap, array }) => {
  if (bitmap) {
    const lines = bitmap.split('\n')
    const width = roundUpToBlockSize(lines.map((s) => s.length))
    const height = lines.length
    return { width, height }
  }
  const width = roundUpToBlockSize(array.map((n) => n.toString(2).length))
  const height = array.length
  return { width, height }
}

export const validateName = ({ name }) => {
  name = name.replace(/\W/g, '_')
  return { name }
}

const defaultFormat = 'C++ (GyverMAX7219)'
export const validateFormat = ({
  format = transformStore('format') || defaultFormat,
}) => {
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
