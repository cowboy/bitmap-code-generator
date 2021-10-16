import { App } from 'components/App'

export async function getStaticProps() {
  return {
    props: {
      commitSha: process.env.VERCEL_GIT_COMMIT_SHA || false,
    },
  }
}

export default App
