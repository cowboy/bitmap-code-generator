import store from 'store2'
import { useForceUpdate } from '../src/useForceUpdate'

import styles from './Presets.module.css'

const presetStore = store.namespace('preset')

const defaultPresets = {
  robot: [0x42, 0x7e, 0x81, 0xa5, 0x81, 0x7e, 0x3c, 0xff],
  play: [0xff, 0x81, 0xb1, 0xbd, 0xbd, 0xb1, 0x81, 0xff],
  stop: [0xff, 0x81, 0xbd, 0xbd, 0xbd, 0xbd, 0x81, 0xff],
  ok: [0x65, 0x95, 0x95, 0x96, 0x96, 0x95, 0x95, 0x65],
  err: [0x3d, 0x42, 0x85, 0x89, 0x91, 0xa1, 0x42, 0xbc],
  number1: [0x06, 0x0e, 0x16, 0x06, 0x06, 0x06, 0x06, 0x1f],
  number2: [0x0e, 0x1b, 0x03, 0x03, 0x06, 0x0c, 0x18, 0x1f],
  number3: [0x1e, 0x03, 0x03, 0x0e, 0x03, 0x03, 0x03, 0x1e],
  number4: [0x03, 0x07, 0x0b, 0x1b, 0x1f, 0x03, 0x03, 0x03],
}

export const getDefaultPreset = (name) => defaultPresets[name]
export const getPreset = (name) => presetStore(name)
export const savePreset = (name, arr) => {
  if (presetStore.has(name)) {
    if (!confirm(`Replace local bitmap "${name}"?`)) {
      return false
    }
  }
  presetStore(name, arr)
  return true
}
export const deletePreset = (name) => presetStore.remove(name)

export const Presets = ({ onClick }) => {
  const update = useForceUpdate()

  const clickHandler = (getter, name) => (event) => {
    if (event.target.nodeName === 'SPAN') {
      if (confirm(`Delete local bitmap "${name}"?`)) {
        deletePreset(name)
        update()
      }
    } else {
      const array = getter(name)
      onClick({ name, array })
    }
  }
  return (
    <div>
      {presetStore.size() > 0 && (
        <>
          <h3>Your saved bitmaps</h3>
          <p>
            Click any of these buttons to load that bitmap in the new site. Once
            a bitmap is loaded there, you can re-save it.
          </p>
          {Object.keys(presetStore())
            .sort()
            .map((name) => (
              <button
                key={name}
                className={styles.deletePresetButton}
                onClick={clickHandler(getPreset, name)}
              >
                {name}
              </button>
            ))}
        </>
      )}
    </div>
  )
}
