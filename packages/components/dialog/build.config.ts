import { defineBuildConfig } from 'unbuild'

const isClean = true
export default defineBuildConfig({
  declaration: true,
  clean: isClean,
})
