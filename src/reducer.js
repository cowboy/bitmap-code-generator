import { getDefaultPreset } from 'components/Presets'
import {
  transform,
  bitmapToArray,
  codeToArray,
  arrayToBitmap,
  getCode,
  getDimensions,
  validateFormat,
  validateScale,
  printBitmap,
} from 'src/transforms'

const defaultPreset = 'robot'

export const initialState = transform({
  name: defaultPreset,
  array: getDefaultPreset(defaultPreset),
})(
  validateFormat,
  validateScale,
  arrayToBitmap,
  getDimensions,
  getCode,
  printBitmap
)

const actionHandlers = {
  scale(state, scale) {
    return transform({ ...state, scale })(validateScale)
  },
  bitmap(state, bitmap) {
    return transform({ ...state, bitmap })(
      bitmapToArray,
      getDimensions,
      getCode,
      printBitmap
    )
  },
  code(state, code) {
    return transform({ ...state, code })(
      codeToArray,
      arrayToBitmap,
      getDimensions,
      printBitmap
    )
  },
  name(state, name) {
    return transform({ ...state, name })(getCode)
  },
  format(state, format) {
    return transform({ ...state, format })(validateFormat, getCode)
  },
  preset(state, { name, array }) {
    return transform({ ...state, name, array })(
      arrayToBitmap,
      getDimensions,
      getCode,
      printBitmap
    )
  },
}

export const reducer = (state, { type, payload }) => {
  if (actionHandlers[type]) {
    return actionHandlers[type](state, payload)
  }
  return state
}
