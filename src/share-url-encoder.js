import { decode } from 'js-base64'
import { numberArrayToBitmapArray } from 'components/Presets'

const isDev = process.env.NODE_ENV === 'development'

// I don't think this was ever released
const v1 = (() => {
  const lengthMap =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789'

  const shareUrlStringToBitmapArray = (shareUrlString) =>
    shareUrlString
      .replace(/([^01,])([01])/g, (_, prefix, char) =>
        char.repeat(lengthMap.indexOf(prefix) + 3)
      )
      .split(',')
      .map((rowStr) => rowStr.split('').map((char) => char === '1'))

  return {
    shareUrlStringToBitmapArray,
  }
})()

const v2 = (() => {
  // Based on https://stackoverflow.com/a/13408680
  const bitstringEncode = ({ name, width, height, bitString }) => {
    let chars = ''
    for (let i = 0; i < bitString.length; i += 10) {
      const bitChunk = bitString.slice(i, i + 10)
      const binaryStr = `0b${bitChunk}${'0'.repeat(10 - bitChunk.length)}`
      const base32str = Number(binaryStr).toString(32)
      chars += `0${base32str}`.slice(-2)
    }
    return [name, width, height, chars].join('/')
  }

  const bitstringDecode = (encodedData) => {
    const [name, widthStr, heightStr, chars] = Array.isArray(encodedData)
      ? encodedData
      : encodedData.split('/')
    let bitString = ''
    for (let i = 0; i < chars.length; i += 2) {
      const charStr = chars.slice(i, i + 2)
      const binStr = parseInt(charStr, 32).toString(2)
      bitString += `${'0'.repeat(10 - binStr.length)}${binStr}`
    }
    const width = parseInt(widthStr, 10)
    const height = parseInt(heightStr, 10)
    bitString = bitString.slice(0, width * height)
    return { name, width, height, bitString }
  }

  const bitmapArrayToBitString = (bitmapArray) =>
    bitmapArray
      .map((row) => row.map((pixel) => (pixel ? '1' : '0')).join(''))
      .join('')

  const bitStringToBitmapArray = ({ bitString, width }) => {
    let bitmapArray = []
    for (let i = 0; i < bitString.length; i += width) {
      const bitChunk = bitString.slice(i, i + width)
      bitmapArray = [...bitmapArray, bitChunk.split('').map((s) => s === '1')]
    }
    return bitmapArray
  }

  const stateToShareUrlString = ({ name, width, height, bitmapArray }) => {
    const bitString = bitmapArrayToBitString(bitmapArray)
    return bitstringEncode({ name, width, height, bitString })
  }

  const shareUrlStringToState = (shareUrlData) => {
    const { name, width, height, bitString } = bitstringDecode(shareUrlData)
    const bitmapArray = bitStringToBitmapArray({ bitString, width })
    return { name, width, height, bitmapArray }
  }

  return {
    stateToShareUrlString,
    shareUrlStringToState,
  }
})()

export const getShareUrlData = v2.stateToShareUrlString

export const getStateFromBitmapData = (bitmapData) => {
  const log = (...args) => isDev && console.log(...args)
  log('bitmapData', bitmapData)

  // v2
  try {
    const state = v2.shareUrlStringToState(bitmapData)
    if (state.bitmapArray) {
      log('getStateFromBitmapData v2')
      return state
    }
  } catch (err) {
    log('v2 error', err.message)
  }

  // v1
  try {
    const json = decode(bitmapData)
    const { name, bitmapV1 } = JSON.parse(json)
    if (bitmapV1) {
      log('getStateFromBitmapData v1')
      const bitmapArray = v1.shareUrlStringToBitmapArray(bitmapV1)
      return { name, bitmapArray }
    }
  } catch (err) {
    log('v1 error', err.message)
  }

  // v0
  try {
    const json = decode(bitmapData)
    const { name, array } = JSON.parse(json)
    if (array) {
      log('getStateFromBitmapData v0')
      const bitmapArray = numberArrayToBitmapArray(array)
      return { name, bitmapArray }
    }
  } catch (err) {
    log('v0 error', err.message)
  }

  const error = 'Unable to parse bitmap data'
  return { error }
}
