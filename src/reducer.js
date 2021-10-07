import { getDefaultPreset } from 'components/Presets'
import {
  transform,
  bitmapToArray,
  codeToArray,
  arrayToBitmap,
  getCode,
  getDimensions,
  validateName,
  validateFormat,
  validateScale,
  printBitmap,
} from 'src/transforms'

const defaultPreset = 'robot'

export const initialState = transform(
  validateFormat,
  validateScale,
  arrayToBitmap,
  getDimensions,
  getCode,
  printBitmap
)({
  name: defaultPreset,
  array: getDefaultPreset(defaultPreset),
})

const actionHandlers = {
  scale(state, scale) {
    return transform(validateScale)({ ...state, scale })
  },
  bitmap(state, bitmap) {
    return transform(
      bitmapToArray,
      getDimensions,
      getCode,
      printBitmap
    )({ ...state, bitmap })
  },
  code(state, code) {
    return transform(
      codeToArray,
      arrayToBitmap,
      getDimensions,
      printBitmap
    )({ ...state, code })
  },
  formatCode(state, code) {
    return transform(getCode)({ ...state, code })
  },
  name(state, name) {
    return transform(validateName, getCode)({ ...state, name })
  },
  format(state, format) {
    return transform(validateFormat, getCode)({ ...state, format })
  },
  preset(state, { name, array }) {
    return transform(
      arrayToBitmap,
      getDimensions,
      getCode,
      printBitmap
    )({ ...state, name, array })
  },
}

export const reducer = (state, { type, payload }) => {
  if (actionHandlers[type]) {
    return actionHandlers[type](state, payload)
  }
  return state
}
