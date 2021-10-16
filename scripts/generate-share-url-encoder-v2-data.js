// node scripts/generate-share-url-encoder-v2-data.js > __fixtures__/share-url-encoder-v2.json

const getRandomBitmapArray = (width, height) =>
  Array.from({ length: height }, () =>
    Array.from({ length: width }, () => Math.random() > 0.5)
  )

const bitmapArrayToBitmapStringArray = (arr) =>
  arr.map((row) => row.map((s) => (s ? 'x' : ' ')).join(''))

const size = 48
const items = []
for (let height = 1; height <= size; height++) {
  for (let width = 1; width <= size; width++) {
    const bitmapArray = getRandomBitmapArray(width, height)
    const bitmapStringArray = bitmapArrayToBitmapStringArray(bitmapArray)
    items.push({ width, height, bitmapStringArray })
  }
}

console.log(JSON.stringify(items, null, 2))
