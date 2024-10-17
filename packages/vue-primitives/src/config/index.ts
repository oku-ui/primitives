import type { Ref } from 'vue'
import type { Direction } from '../direction/index.ts'
import { createContext } from '@oku-ui/hooks'

export interface ConfigContext {
  dir?: Ref<Direction>
}

export const [provideConfigContext, useConfigContext] = createContext<ConfigContext>('Config', {})
