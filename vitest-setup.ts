import * as matchers from 'vitest-axe/matchers'
import 'vitest-axe/extend-expect'

import { expect } from 'vitest'

// eslint-disable-next-line no-restricted-globals
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

expect.extend(matchers)
