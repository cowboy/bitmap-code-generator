import * as React from 'react'

// I'm so lazy
export const useForceUpdate = () => {
  const [value, setValue] = React.useState(0)
  return () => setValue((value) => value + 1)
}
