/// <reference types="vite/client" />
import 'vitest'
import type { AxeMatchers } from 'vitest-axe/matchers'

declare module 'vitest' {
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
  export interface Assertion extends AxeMatchers {}
}
