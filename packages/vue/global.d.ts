import type { AxeMatchers } from 'vitest-axe/matchers'
/// <reference types="vite/client" />
import 'vitest'

declare module 'vitest' {
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
  export interface Assertion extends AxeMatchers {}
}
