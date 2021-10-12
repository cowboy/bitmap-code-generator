import * as React from 'react'
import Head from 'next/head'
import NoSSR from 'react-no-ssr'
import { reducer } from 'src/reducer'
import { Notification } from 'components/Notification'

import '../styles/globals.css'

export async function getStaticProps() {
  return {
    props: {
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA || false,
    },
  }
}

function MyApp({ Component, pageProps, commitSha }) {
  const [state, dispatch] = React.useReducer(reducer, {})
  return (
    <NoSSR>
      <Head>
        <title>Bitmap ⇔ Code Generator</title>
        <meta name="description" content="Bitmap ⇔ Code Generator" />
      </Head>
      <h1>Bitmap ⇔ Code Generator</h1>
      <Notification state={state} dispatch={dispatch} />
      <Component
        {...pageProps}
        state={state}
        dispatch={dispatch}
        commitSha={commitSha}
      />
    </NoSSR>
  )
}

export default MyApp
