import { getDefaultPreset } from 'components/Presets'
import { getStateFromBitmapData } from 'src/share-url-encoder'
import {
  transform,
  codeToBitmapArray,
  getCode,
  getDimensions,
  getShareUrl,
  validateName,
  validateFormat,
  validateScale,
  printBitmapArray,
  printState,
} from 'src/transforms'

const getInitialData = (bitmapData) => {
  let notification
  if (bitmapData !== undefined) {
    const { error, name, bitmapArray } = getStateFromBitmapData(bitmapData)
    if (error) {
      notification = { type: 'error', message: error }
    } else {
      return { name, bitmapArray, loaded: true }
    }
  }
  return { ...getDefaultPreset(), notification, loaded: true }
}

const debugMode = 0
const debugStateBitmap = debugMode
  ? transform(printState, printBitmapArray)
  : transform()
const debugState = debugMode ? transform(printState) : transform()

const actionHandlers = {
  notify(state, notification) {
    return { ...state, notification }
  },
  clearNotification({ notification, ...state }) {
    return state
  },
  scale(state, scale) {
    return transform(validateScale, debugState)({ ...state, scale })
  },
  bitmapArray(state, bitmapArray) {
    return transform(
      getDimensions,
      getCode,
      getShareUrl,
      debugStateBitmap
    )({ ...state, bitmapArray })
  },
  code(state, code) {
    return transform(
      codeToBitmapArray,
      getDimensions,
      getShareUrl,
      debugStateBitmap
    )({ ...state, code })
  },
  formatCode(state, code) {
    return transform(getCode, debugState)({ ...state, code })
  },
  name(state, name) {
    return transform(
      validateName,
      getCode,
      getShareUrl,
      debugState
    )({ ...state, name })
  },
  format(state, format) {
    return transform(validateFormat, getCode, debugState)({ ...state, format })
  },
  preset(state, { name, bitmapArray }) {
    return transform(
      getDimensions,
      getCode,
      getShareUrl,
      debugStateBitmap
    )({ ...state, name, bitmapArray })
  },
  initialLoad(state, bitmapData) {
    return transform(
      validateFormat,
      validateScale,
      getDimensions,
      getCode,
      getShareUrl,
      debugStateBitmap
    )(getInitialData(bitmapData))
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
