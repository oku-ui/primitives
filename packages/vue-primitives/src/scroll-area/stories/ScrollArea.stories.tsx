import CAnimated from './Animated.vue'
import CBasic from './Basic.vue'
import CChromatic from './Chromatic.vue'
import CChromaticDynamicContentBeforeLoaded from './ChromaticDynamicContentBeforeLoaded.vue'
import CContentChange from './ContentChange.vue'
import CResizable from './Resizable.vue'

export default { title: 'Components/ScrollArea' }

export function Basic() {
  return CBasic
}

export function Resizable() {
  return CResizable
}

export function ContentChange() {
  return CContentChange
}

export function Animated() {
  return CAnimated
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }

export function ChromaticDynamicContentBeforeLoaded() {
  return CChromaticDynamicContentBeforeLoaded
}
ChromaticDynamicContentBeforeLoaded.parameters = { chromatic: { disable: false } }

export const ChromaticDynamicContentAfterLoaded = () => <CChromaticDynamicContentBeforeLoaded />
ChromaticDynamicContentAfterLoaded.parameters = {
  chromatic: { disable: false, delay: 2000 },
}
