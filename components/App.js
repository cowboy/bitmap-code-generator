import * as React from 'react'

import { useForceUpdate } from 'src/useForceUpdate'
import { formatters } from 'src/formatters'
import { Presets, saveBitmap } from 'components/Presets'
import { Loading } from 'components/Loading'
import { Bitmap } from 'components/Bitmap'
import { CopyToClipboard } from 'components/CopyToClipboard'
import { Icon } from 'components/Icon'

import styles from './App.module.css'

const GITHUB_URL = 'https://github.com/cowboy/bitmap-code-generator'

export const App = ({ state, dispatch, commitSha }) => {
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
    if (saveBitmap(state)) {
      update()
    }
  }

  const notifyClipboard = (msg) => () => {
    dispatch({
      type: 'notify',
      payload: { message: `${msg} copied to clipboard` },
    })
  }

  return (
    <>
      <div>
        <h3>
          <label htmlFor="name-field">Name</label>
        </h3>
        <input
          id="name-field"
          value={state.name}
          onChange={handleEventChange('name')}
          className={styles.code}
        />
        <button onClick={save}>
          <Icon icon="far:save" /> Save local bitmap
        </button>
      </div>
      <h3>Bitmap</h3>
      <Bitmap
        {...state}
        onChangeBitmap={handleChange('bitmapArray')}
        onChangeScale={handleChange('scale')}
      />
      <div>
        <h3>
          <label htmlFor="url-field">Shareable URL</label>
        </h3>
        <div className={styles.horizontalRow}>
          <input
            id="url-field"
            value={state.shareUrl}
            className={styles.url}
            readOnly
          />
          <CopyToClipboard
            text={state.shareUrl}
            titleText="URL"
            onCopy={notifyClipboard('URL')}
          />
        </div>
      </div>
      <div>
        <h3>
          <label htmlFor="format-field">Code format</label>
        </h3>
        <select
          id="format-field"
          value={state.format}
          onChange={handleEventChange('format')}
        >
          {Object.keys(formatters).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>
          <label htmlFor="code-field">Code</label>{' '}
          <CopyToClipboard
            text={state.code}
            titleText="code"
            onCopy={notifyClipboard('Code')}
          />
        </h3>
        <textarea
          id="code-field"
          value={state.code}
          onChange={handleEventChange('code')}
          onBlur={handleEventChange('formatCode')}
          className={styles.code}
        />
      </div>
      <Presets onClick={handleChange('preset')} />
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
