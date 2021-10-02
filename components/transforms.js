import store from 'store2'
import { formatters } from './formatters'

const transformStore = store.namespace('transform')

export const transform =
  (state) =>
  (...transformations) =>
    transformations.reduce(
      (acc, transformation) => ({
        ...acc,
        ...transformation(acc),
      }),
      state
    )

export const sizeMultiple = 8
export const getSize = (sizes) => {
  const maxSize = Math.max(...sizes)
  return Math.ceil(maxSize / sizeMultiple) * sizeMultiple
}

export const parseBitmap = ({ bitmap }) => {
  const lines = bitmap.split('\n')
  const width = getSize(lines.map((s) => s.length))
  const array = lines.map((s) => {
    s += ' '.repeat(width)
    s = s.replace(/ /g, '0').replace(/[^0]/g, '1').slice(0, width)
    const n = parseInt(s, 2)
    return isNaN(n) ? 0 : n
  })
  return { array }
}

export const parseCode = ({ code, format }) => {
  const data = formatters[format].fromCode(code.trim()) || {}
  const {
    name = '',
    arrayStr = '',
    array = arrayStr.split(/\s*,\s*/).map((s) => parseInt(s)),
  } = data
  return { name, array }
}

export const validateBitmap = ({ width, array }) => {
  const bitmap = array
    .map((n) => {
      const s = n.toString(2).replace(/0/g, ' ').replace(/1/g, 'x')
      const diff = width - s.length
      const padding = diff > 0 ? ' '.repeat(diff) : ''
      return `${padding}${s}`
    })
    .join('\n')
  return { bitmap }
}

export const validateCode = ({ array, name, format }) => {
  const width = getSize(array.map((n) => n.toString(2).length))
  const hexDigits = (Math.pow(2, width) - 1).toString(16).length
  const hexValue = (n) => {
    const hexStr = `${'0'.repeat(hexDigits)}${n.toString(16)}`.slice(-hexDigits)
    return `0x${hexStr}`
  }
  const arrayStr = array.map(hexValue).join(', ')
  const code = formatters[format].toCode({ name, array, arrayStr })
  return { code }
}

export const validateDimensions = ({ bitmap, array }) => {
  if (bitmap) {
    const lines = bitmap.split('\n')
    const width = getSize(lines.map((s) => s.length))
    const height = lines.length
    return { width, height }
  }
  const width = getSize(array.map((n) => n.toString(2).length))
  const height = array.length
  return { width, height }
}

export const validateScale = ({ scale = transformStore('scale') || 1 }) => {
  scale = Math.max(0.5, Math.min(scale, 2))
  transformStore('scale', scale)
  return { scale }
}
