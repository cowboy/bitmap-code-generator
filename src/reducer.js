import {
  transform,
  bitmapToArray,
  codeToArray,
  arrayToBitmap,
  getCode,
  getDimensions,
  getShareUrl,
  validateName,
  validateFormat,
  validateScale,
  printBitmap,
  loadInitialData,
} from 'src/transforms'

const actionHandlers = {
  notify(state, notification) {
    return { ...state, notification }
  },
  clearNotification({ notification, ...state }) {
    return state
  },
  scale(state, scale) {
    return transform(validateScale)({ ...state, scale })
  },
  bitmap(state, bitmap) {
    return transform(
      bitmapToArray,
      getDimensions,
      getCode,
      getShareUrl,
      printBitmap
    )({ ...state, bitmap })
  },
  code(state, code) {
    return transform(
      codeToArray,
      getShareUrl,
      arrayToBitmap,
      getDimensions,
      printBitmap
    )({ ...state, code })
  },
  formatCode(state, code) {
    return transform(getCode)({ ...state, code })
  },
  name(state, name) {
    return transform(validateName, getCode, getShareUrl)({ ...state, name })
  },
  format(state, format) {
    return transform(validateFormat, getCode)({ ...state, format })
  },
  preset(state, { name, array }) {
    return transform(
      arrayToBitmap,
      getDimensions,
      getCode,
      codeToArray,
      getShareUrl,
      printBitmap
    )({ ...state, name, array })
  },
  initialLoad(state, bitmapdata) {
    return transform(
      loadInitialData(bitmapdata),
      validateFormat,
      validateScale,
      arrayToBitmap,
      getDimensions,
      getCode,
      getShareUrl,
      printBitmap
    )({})
  },
}

export const reducer = (state, { type, payload }) => {
  if (actionHandlers[type]) {
    return actionHandlers[type](state, payload)
  } else {
    console.error(`Unknown action type "${type}" with payload:`, payload)
  }
  return state
}
