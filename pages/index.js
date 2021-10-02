import * as React from 'react'
import Head from 'next/head'
import { useForceUpdate } from 'components/useForceUpdate'
import { getDefaultPreset, savePreset, Presets } from 'components/presets'
import { formatters } from 'components/formatters'
import { Bitmap } from 'components/Bitmap'
import {
  transform,
  parseBitmap,
  parseCode,
  validateBitmap,
  validateCode,
  validateDimensions,
} from 'components/transforms'

import styles from '../styles/Home.module.css'

const defaultPreset = 'robot'
const defaultFormatter = 'C++ (GyverMAX7219)'

const getStateFromPreset = (name, array, format) =>
  transform({ name, array, format })(
    validateDimensions,
    validateCode,
    validateBitmap
  )

const initialState = getStateFromPreset(
  defaultPreset,
  getDefaultPreset(defaultPreset),
  defaultFormatter
)

const reducer = (state, { name, value }) => {
  const transformer = transform({ ...state, [name]: value })
  switch (name) {
    case 'bitmap':
      return transformer(parseBitmap, validateDimensions, validateCode)
    case 'code':
      return transformer(parseCode, validateDimensions, validateBitmap)
    case 'name':
    case 'format':
      return transformer(validateCode)
    case 'preset':
      return getStateFromPreset(...value, state.format)
    default:
      return state
  }
}

export default function Home() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const update = useForceUpdate()

  const handleChange = (name) => (event) => {
    console.log(name, event.target.value)
    const value = event.target.value
    dispatch({ name, value })
  }

  const save = () => {
    savePreset(state.name, state.array)
    update()
  }

  return (
    <div>
      <Head>
        <title>Bitmap ⇔ Code Generator</title>
        <meta name="description" content="Bitmap ⇔ Code Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Bitmap ⇔ Code Generator</h1>
      <p>
        Suitable for use with{' '}
        <a href="https://github.com/GyverLibs/GyverMAX7219">GyverMAX7219</a> and
        possibly other code that renders 8x8 bitmaps
      </p>
      <label>
        <h3>Width</h3>
        <input value={state.width} disabled />
      </label>
      <label>
        <h3>Height</h3>
        <input value={state.height} disabled />
      </label>
      <label>
        <h3>Name</h3>
        <input
          value={state.name}
          onChange={handleChange('name')}
          className="code"
        />{' '}
        <button onClick={save}>Save</button>
      </label>
      {/* <label>
        <div>Bitmap</div>
        <textarea value={state.bitmap} onChange={handleChange('bitmap')} />
      </label> */}
      <h3>Bitmap</h3>
      <Bitmap {...state} onChange={handleChange('bitmap')} />
      <label>
        <h3>Code format</h3>
        <select onChange={handleChange('format')}>
          {Object.keys(formatters).map((name) => (
            <option key={name} value={name} selected={name === state.format}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <h3>Code</h3>
        <textarea
          value={state.code}
          onChange={handleChange('code')}
          className="code"
        />
      </label>
      <Presets onClick={(value) => dispatch({ name: 'preset', value })} />
      {/* <div>state</div>
      <pre>{JSON.stringify(state, null, 2)}</pre> */}
      <p>
        Made by <a href="https://github.com/cowboy">cowboy</a> for{' '}
        <a href="https://www.theentirerobot.com/">The Entire Robot</a>. Source
        code on{' '}
        <a href="https://github.com/cowboy/bitmap-code-generator">GitHub</a>.
      </p>
    </div>
  )
}
