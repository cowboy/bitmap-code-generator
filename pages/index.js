import * as React from 'react'
import { encode } from 'js-base64'
import { useRouter } from 'next/router'
import { Presets } from 'components/Presets'

import styles from '../styles/Home.module.css'

const GITHUB_URL = 'https://github.com/cowboy/bitmap-code-generator'
const NEW_URL_BASE = 'https://bitmap-code-generator.benalman.com/'

export async function getStaticProps() {
  return {
    props: {
      commitSha: process.env.GITHUB_SHA || false,
    },
  }
}

export default function Home({ commitSha }) {
  const router = useRouter()
  const presetClick = ({ name, array }) => {
    const json = JSON.stringify({ name, array })
    const bitmapdata = encode(json)
    const url = `${NEW_URL_BASE}share/${bitmapdata}`
    router.push(url)
  }
  return (
    <>
      <p>
        This site has moved to <a href={NEW_URL_BASE}>{NEW_URL_BASE}</a>. Please
        update your bookmarks!
      </p>
      <Presets onClick={presetClick} />
      <p>
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
