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
    const v4Results = this.results.filter(r => r.version === 'useControllableStateV4')
    const vueUseResults = this.results.filter(r => r.version === 'useVModel_VueUse')

    const v3Avg = this.calculateAverage(v3Results)
    const v4Avg = this.calculateAverage(v4Results)
    const vueUseAvg = this.calculateAverage(vueUseResults)

    const comparison = {
      v3Average: v3Avg,
      v4Average: v4Avg,
      vueUseAverage: vueUseAvg,
      performance: [] as string[],
    }

    if (v3Avg && v4Avg && vueUseAvg) {
      const implementations = [
        { name: 'V3', time: v3Avg.executionTimeMs },
        { name: 'V4', time: v4Avg.executionTimeMs },
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

  static clearWarmupResults() {
    this.results = this.results.slice(-5) // Keep only last 5 results
  }

  private static calculateAverage(results: PerformanceResult[]) {
    if (results.length === 0)
      return null

    // Remove outliers
    const sorted = [...results].sort((a, b) => a.executionTimeMs - b.executionTimeMs)
    const q1Index = Math.floor(sorted.length * 0.25)
    const q3Index = Math.floor(sorted.length * 0.75)
    const validResults = sorted.slice(q1Index, q3Index + 1)

    return {
      executionTimeMs: validResults.reduce((sum, r) => sum + r.executionTimeMs, 0) / validResults.length,
      onChangeCallCount: validResults.reduce((sum, r) => sum + r.onChangeCallCount, 0) / validResults.length,
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
