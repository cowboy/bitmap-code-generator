import * as React from 'react'
import cx from 'classnames'

import styles from './Notification.module.css'
import { Icon } from './Icon'

export const Notification = ({ state, dispatch }) => {
  const [notificationChanged, setNotificationChanged] = React.useState(false)
  const clearNotification = React.useCallback(
    () => dispatch({ type: 'clearNotification' }),
    [dispatch]
  )

  React.useEffect(() => {
    let id = setTimeout(clearNotification, 10000)
    setNotificationChanged(true)
    return () => {
      clearTimeout(id)
    }
  }, [dispatch, state.notification, clearNotification])

  React.useEffect(() => {
    if (notificationChanged) {
      setNotificationChanged(false)
    }
  }, [notificationChanged, setNotificationChanged])

  const { type = 'info', message } =
    (!notificationChanged && state.notification) || {}

  const icons = {
    info: 'fas:info-circle',
    error: 'fas:exclamation-triangle',
  }

  return (
    <div className={cx(styles.root, styles[type])} onClick={clearNotification}>
      {message && (
        <span className={styles.icon}>
          <Icon icon={icons[type]} />
        </span>
      )}
      {message}
    </div>
  )
}
