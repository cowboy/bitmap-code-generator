import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useForceUpdate } from 'src/useForceUpdate'
import { formatters } from 'src/formatters'
import { Presets, savePreset } from 'components/Presets'
import { Loading } from 'components/Loading'
import { Bitmap } from 'components/Bitmap'

import styles from '../styles/Home.module.css'

const GITHUB_URL = 'https://github.com/cowboy/bitmap-code-generator'

export async function getStaticProps() {
  return {
    props: {
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA || false,
    },
  }
}

export default function Home({ state, dispatch, commitSha }) {
  const update = useForceUpdate()

  React.useEffect(() => {
    if (!state.loaded) {
      dispatch({ type: 'initialLoad' })
    }
  }, [dispatch, state.loaded])

  if (!state.loaded) {
    return <Loading />
  }

  const handleEventChange = (type) => (event) => {
    const payload = event.target.value
    dispatch({ type, payload })
  }

  const handleChange = (type) => (payload) => {
    dispatch({ type, payload })
  }

  const save = () => {
    if (savePreset(state.name, state.array)) {
      update()
    }
  }

  const notifyClipboard = () => {
    dispatch({
      type: 'notify',
      payload: { message: 'URL copied to clipboard' },
    })
  }

  return (
    <>
      <label>
        <h3>Name</h3>
        <input
          value={state.name}
          onChange={handleEventChange('name')}
          className={styles.code}
        />
        <button onClick={save}>Save local bitmap</button>
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
        <h3>Shareable URL</h3>
        <div className={styles.horizontalRow}>
          <input value={state.url} className={styles.url} readOnly />
          <CopyToClipboard text={state.url} onCopy={notifyClipboard}>
            <button>Copy to clipboard</button>
          </CopyToClipboard>
        </div>
      </label>
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
          className={styles.code}
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
    </>
  )
}
