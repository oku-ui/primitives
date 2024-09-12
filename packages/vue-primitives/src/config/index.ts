import type { Ref } from 'vue'
import { createContext } from '../hooks/index.ts'
import type { Direction } from '../direction/index.ts'

export interface ConfigContext {
  dir?: Ref<Direction>
}

export const [provideConfigContext, useConfigContext] = createContext<ConfigContext>('Config', {})
