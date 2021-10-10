import { decode, encode, isValid } from 'js-base64'

const lengthMap = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789'

const maxChars = lengthMap.length + 2
const replaceRegex = new RegExp(`0{3,${maxChars}}|1{3,${maxChars}}`, 'g')

const bitmapArrayToShareUrlString = (bitmapArray) =>
  bitmapArray
    .map((row) => row.map((pixel) => (pixel ? '1' : '0')).join(''))
    .join(',')
    .replace(replaceRegex, (orig) => `${lengthMap[orig.length - 3]}${orig[0]}`)

const shareUrlStringToBitmapArray = (shareUrlString) =>
  shareUrlString
    .replace(/([^01,])([01])/g, (_, prefix, char) =>
      char.repeat(lengthMap.indexOf(prefix) + 3)
    )
    .split(',')
    .map((rowStr) => rowStr.split('').map((char) => char === '1'))

export const getShareUrlData = ({ name = '', bitmapArray }) => {
  const bitmapV1 = bitmapArrayToShareUrlString(bitmapArray)
  const json = JSON.stringify({ name, bitmapV1 })
  return encode(json)
}

export const getStateFromBitmapData = (bitmapData) => {
  if (isValid(bitmapData)) {
    const json = decode(bitmapData)
    const { name, array, bitmapV1 } = JSON.parse(json)
    try {
      // V0
      if (array) {
        const bitmapArray = arrayV0ToBitmapArray(array)
        return { name, bitmapArray }
      }
      if (bitmapV1) {
        const bitmapArray = shareUrlStringToBitmapArray(bitmapV1)
        return { name, bitmapArray }
      }
    } catch (err) {
      const error = 'Unable to parse bitmap data'
      return { error }
    }
  }
  const error = 'Invalid bitmap data'
  return { error }
}
