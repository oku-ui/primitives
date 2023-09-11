import * as matchers from 'vitest-axe/matchers'
import 'vitest-axe/extend-expect'

import { expect } from 'vitest'

expect.extend(matchers)
