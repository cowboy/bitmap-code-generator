import { getShareUrlData, getStateFromBitmapData } from './share-url-encoder'

import v2fixtures from '../__fixtures__/share-url-encoder-v2.json'
import v0fixtures from '../__fixtures__/share-url-encoder-v0'

const bitmapStringArrayToBitmapArray = (arr) =>
  arr.map((row) => row.split('').map((c) => c === 'x'))

describe('v2', () => {
  v2fixtures.forEach(({ width, height, bitmapStringArray }) => {
    it(`should encode and decode a ${width}x${height} bitmapArray`, () => {
      const name = 'example_name'
      const bitmapArray = bitmapStringArrayToBitmapArray(bitmapStringArray)
      const encoded = getShareUrlData({ name, width, height, bitmapArray })
      const decoded = getStateFromBitmapData(encoded)
      expect(decoded).toEqual({ name, width, height, bitmapArray })
    })
  })
})

describe('v0', () => {
  v0fixtures.forEach(({ name, bitmapStringArray, shareUrl }) => {
    it(`should decode the shareUrl for ${name} into the proper data`, () => {
      const decoded = getStateFromBitmapData(shareUrl)
      expect(decoded.name).toEqual(name)
      expect(decoded.bitmapArray).toEqual(
        bitmapStringArrayToBitmapArray(bitmapStringArray)
      )
    })
  })
})
