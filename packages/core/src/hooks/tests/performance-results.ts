import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface PerformanceResult {
  version: string
  updateCount: number
  executionTimeMs: number
  onChangeCallCount: number
  timestamp: string
}

export class PerformanceLogger {
  private static results: PerformanceResult[] = []
  private static readonly outputPath = resolve(__dirname, './.data/performance-results.json')

  static logResult(version: string, executionTimeMs: number, onChangeCallCount: number, updateCount = 5) {
    const result = {
      version,
      updateCount,
      executionTimeMs,
      onChangeCallCount,
      timestamp: new Date().toISOString(),
    }

    this.results.push(result)
    this.writeToFile() // Write to file after each new result
    return result
  }

  static getResults() {
    return [...this.results]
  }

  static compareVersions() {
    const v3Results = this.results.filter(r => r.version === 'useControllableStateV3')
    const v5Results = this.results.filter(r => r.version === 'useControllableStateV5')
    const v6Results = this.results.filter(r => r.version === 'useControllableStateV6')
    const vueUseResults = this.results.filter(r => r.version === 'useVModel_VueUse')

    const v3Avg = this.calculateAverage(v3Results)
    const v5Avg = this.calculateAverage(v5Results)
    const v6Avg = this.calculateAverage(v6Results)
    const vueUseAvg = this.calculateAverage(vueUseResults)

    const comparison = {
      v3Average: v3Avg,
      v5Average: v5Avg,
      v6Average: v6Avg,
      vueUseAverage: vueUseAvg,
      performance: [] as string[],
    }

    if (v3Avg && v5Avg && vueUseAvg && v6Avg) {
      const implementations = [
        { name: 'V3', time: v3Avg.executionTimeMs },
        { name: 'V5', time: v5Avg.executionTimeMs },
        { name: 'V6', time: v6Avg.executionTimeMs },
        { name: 'VueUse', time: vueUseAvg.executionTimeMs },
      ].sort((a, b) => a.time - b.time)

      const fastest = implementations[0]

      implementations.slice(1).forEach((impl) => {
        const diff = impl.time - fastest.time
        const percentage = (diff / fastest.time) * 100
        comparison.performance.push(
          `${fastest.name} is ${percentage.toFixed(2)}% faster than ${impl.name}`,
        )
      })
    }

    return comparison
  }

  private static calculateAverage(results: PerformanceResult[]) {
    if (results.length === 0)
      return null

    return {
      executionTimeMs: results.reduce((sum, r) => sum + r.executionTimeMs, 0) / results.length,
      onChangeCallCount: results.reduce((sum, r) => sum + r.onChangeCallCount, 0) / results.length,
    }
  }

  private static writeToFile() {
    const output = {
      timestamp: new Date().toISOString(),
      results: this.results,
      comparison: this.compareVersions(),
      summary: this.compareVersions().performance,
    }

    // .data directory must exist before writing to it
    if (!existsSync(resolve(__dirname, './.data'))) {
      mkdirSync(resolve(__dirname, './.data'))
    }

    try {
      writeFileSync(
        this.outputPath,
        JSON.stringify(output, null, 2),
        'utf-8',
      )
    }
    catch (error) {
      console.error('Failed to write performance results:', error)
    }
  }
}
