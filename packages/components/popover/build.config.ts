import { defineBuildConfig } from 'unbuild'

const isClean = (process.env.CLEAN || 'false') === 'true'
export default defineBuildConfig({
  clean: isClean,
})
