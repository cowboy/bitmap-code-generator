import { CopyToClipboard as CopyToClipboardLib } from 'react-copy-to-clipboard'
import { Icon } from './Icon'

export const CopyToClipboard = ({ text, titleText, onCopy }) => (
  <CopyToClipboardLib text={text} onCopy={onCopy}>
    <button title={`Copy ${titleText} to clipboard`}>
      <Icon icon="far:clipboard" />
    </button>
  </CopyToClipboardLib>
)
