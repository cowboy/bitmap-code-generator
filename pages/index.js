import * as React from 'react'
import Head from 'next/head'
import NoSSR from 'react-no-ssr'
import { initialState, reducer } from 'src/reducer'
import { useForceUpdate } from 'src/useForceUpdate'
import { formatters } from 'src/formatters'
import { Presets, savePreset } from 'components/Presets'
import { Bitmap } from 'components/Bitmap'

import styles from '../styles/Home.module.css'

const GITHUB_URL = 'https://github.com/cowboy/bitmap-code-generator'

export async function getStaticProps() {
  return {
    props: {
      commitSha: process.env.GITHUB_SHA || false,
    },
  }
}

export default function Home({ commitSha }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const update = useForceUpdate()

  const handleEventChange = (type) => (event) => {
    const payload = event.target.value
    dispatch({ type, payload })
  }

  const handleChange = (type) => (payload) => {
    dispatch({ type, payload })
  }

  const save = () => {
    savePreset(state.name, state.array)
    update()
  }

  return (
    <NoSSR>
      <Head>
        <title>Bitmap ⇔ Code Generator</title>
        <meta name="description" content="Bitmap ⇔ Code Generator" />
      </Head>
      <h1>Bitmap ⇔ Code Generator</h1>
      <label>
        <h3>Name</h3>
        <input
          value={state.name}
          onChange={handleEventChange('name')}
          className="code"
        />{' '}
        <button onClick={save}>Save</button>
      </label>
      {/* <label>
        <div>Bitmap</div>
        <textarea value={state.bitmap} onChange={handleChange('bitmap')} />
      </label> */}
      <h3>Bitmap</h3>
      <Bitmap
        {...state}
        onChangeBitmap={handleChange('bitmap')}
        onChangeScale={handleChange('scale')}
      />
      <label>
        <h3>Code format</h3>
        <select value={state.format} onChange={handleEventChange('format')}>
          {Object.keys(formatters).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <h3>Code</h3>
        <textarea
          value={state.code}
          onChange={handleEventChange('code')}
          onBlur={handleEventChange('formatCode')}
          className="code"
        />
      </label>
      <Presets onClick={handleChange('preset')} />
      {/* <h3>State</h3>
      <pre>{JSON.stringify(state, null, 2)}</pre> */}
      <p>
        Made by{' '}
        <a href="http://benalman.com/">&ldquo;Cowboy&rdquo; Ben Alman</a> for{' '}
        <a href="https://www.theentirerobot.com/">The Entire Robot</a>. Source
        code on <a href={GITHUB_URL}>GitHub</a>, patches welcome!
        {commitSha && (
          <>
            {' '}
            Built from commit{' '}
            <a href={`${GITHUB_URL}/commit/${commitSha}`}>
              {commitSha.slice(0, 7)}
            </a>
            .
          </>
        )}
      </p>
    </NoSSR>
  )
}
