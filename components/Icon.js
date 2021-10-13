import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faCompressArrowsAlt,
  faExclamationTriangle,
  faExpandArrowsAlt,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import {
  faClipboard,
  faSave,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons'

library.add(
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faClipboard,
  faCompressArrowsAlt,
  faExclamationTriangle,
  faExpandArrowsAlt,
  faInfoCircle,
  faSave,
  faTrashAlt
)

export const Icon = ({ icon, ...props }) => {
  if (typeof icon === 'string') {
    icon = icon.split(':')
  }
  return <FontAwesomeIcon icon={icon} {...props} />
}
