import { defineBuildConfig } from 'unbuild'

const isClean = (process.env.CLEAN || 'false') === 'true'
export default defineBuildConfig({
  declaration: true,
  clean: isClean,
})
