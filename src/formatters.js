import { roundUpToBlockSize } from './transforms'

const bitmapArrayRowToNumber = (row) =>
  row.reduce(
    (sum, pixel, i) => sum + (pixel ? Math.pow(2, row.length - i - 1) : 0),
    0
  )

const getHexArray = (bitmapArray) => {
  const width = roundUpToBlockSize(getMaxRowSize(bitmapArray))
  const hexDigits = (Math.pow(2, width) - 1).toString(16).length
  const hexNumber = (row) => {
    const n = bitmapArrayRowToNumber(row)
    const hexStr = `${'0'.repeat(hexDigits)}${n.toString(16)}`.slice(-hexDigits)
    return `0x${hexStr}`
  }
  return bitmapArray.map(hexNumber).join(', ')
}

// const getStrArray = (bitmapArray) => {
//   const binaryString = (row) => {
//     return `"${row.map((pixel) => (pixel ? '1' : '0')).join('')}"`
//   }
//   return `\n  ${bitmapArray.map(binaryString).join(',\n  ')}\n`
// }

// const cleanupCode = (code) =>
//   code.replace(/\/\*[\s\S]*?\*\/|\/\/.*\n/g, '').replace(/[\s\n]+/g, ' ')

const getMaxRowSize = (bitmapArray) =>
  Math.max(...bitmapArray.map((row) => row.length))

export const defaultFormat = 'JavaScript'
export const formatters = {
  'C++ (AVR PROGMEM)': {
    fromCode: (code) => {
      const { groups } =
        /.*?(?<name>[\w]+)\s*\[\][^=]*=\s*\{(?<arrayStr>[^}]+)?\}?.*$/.exec(
          code
        ) || {}
      return groups
    },
    toCode: ({ name, bitmapArray }) => {
      const size = getMaxRowSize(bitmapArray)
      const bitSize = [8, 16, 32, 64].find((n) => size <= n)
      if (!bitSize) {
        return `/* Unable to generate array because row data exceeds uint64_t size. */`
      }
      const arrayStr = getHexArray(bitmapArray)
      return `const uint${bitSize}_t ${name}[] PROGMEM = {${arrayStr}};`
    },
  },
  JavaScript: {
    fromCode: (code) => {
      const { groups } =
        /.*?(?<name>[\w]+)\s*=\s*\[(?<arrayStr>[^\]]+)?\]?.*$/.exec(code) || {}
      return groups
    },
    toCode: ({ name, bitmapArray }) => {
      if (getMaxRowSize(bitmapArray) > 52) {
        return `/* Unable to generate array because row data exceeds Number.MAX_SAFE_INTEGER size. */`
      }
      const arrayStr = getHexArray(bitmapArray)
      return `const ${name} = [${arrayStr}]`
    },
  },
}
