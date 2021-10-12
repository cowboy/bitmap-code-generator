import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faInfoCircle,
  faExclamationTriangle,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faExpandArrowsAlt,
  faCompressArrowsAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
  faClipboard,
  faTrashAlt,
  faSave,
} from '@fortawesome/free-regular-svg-icons'

library.add(
  faClipboard,
  faTrashAlt,
  faSave,
  faInfoCircle,
  faExclamationTriangle,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faExpandArrowsAlt,
  faCompressArrowsAlt
)

export const Icon = ({ icon, ...props }) => {
  if (typeof icon === 'string') {
    icon = icon.split(':')
  }
  return <FontAwesomeIcon icon={icon} {...props} />
}
