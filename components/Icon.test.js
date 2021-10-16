import * as React from 'react'
import { render } from '@testing-library/react'
import { stripIndents } from 'common-tags'

import { Icon } from './Icon'

const iconNames = stripIndents`
  fas:arrow-down
  fas:arrow-left
  fas:arrow-right
  fas:arrow-up
  far:clipboard
  fas:compress-arrows-alt
  fas:exclamation-triangle
  fas:expand-arrows-alt
  fas:info-circle
  far:save
  far:trash-alt
`.split('\n')

iconNames.forEach((iconName) => {
  const [prefix, icon] = iconName.split(':')
  it(`should render icon ${iconName}`, () => {
    /* eslint-disable testing-library/no-container, testing-library/no-node-access */
    const { container } = render(<Icon icon={iconName} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('data-prefix', prefix)
    expect(svg).toHaveAttribute('data-icon', icon)
  })
})
