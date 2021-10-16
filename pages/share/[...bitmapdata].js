import * as React from 'react'
import { useRouter } from 'next/router'
import { Loading } from 'components/Loading'

export default function Share({ dispatch }) {
  const router = useRouter()
  const { bitmapdata } = router.query

  React.useEffect(() => {
    if (bitmapdata) {
      dispatch({ type: 'initialLoad', payload: bitmapdata.join('/') })
      router.replace('/')
    }
  }, [dispatch, bitmapdata, router])
  return <Loading />
}
