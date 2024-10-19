import type { HttpContext } from '@adonisjs/core/http'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

interface Metric {
  date: string
  read: number
  write: number
}

export default class MetricsController {
  private async getFilteredData(
    filePath: string,
    startDate: Date,
    endDate: Date
  ): Promise<Metric[]> {
    const fileContent = await readFile(filePath, 'utf-8')
    const data: Metric[] = JSON.parse(fileContent)

    return data.filter((metric) => {
      const metricDate = new Date(metric.date)
      return metricDate >= startDate && metricDate <= endDate
    })
  }

  private calculateAverage(data: Metric[], key: 'read' | 'write'): number {
    if (data.length === 0) return 0
    const sum = data.reduce((acc, metric) => acc + metric[key], 0)
    return sum / data.length
  }

  public async getIOPS({ request, response }: HttpContext) {
    try {
      const start = request.input('start') as string
      const end = request.input('end') as string

      const startDate = new Date(start)
      const endDate = new Date(end)

      const filePath = join(process.cwd(), 'storage', 'iops_data_100.json')
      const filteredData = await this.getFilteredData(filePath, startDate, endDate)
      const sortedData = filteredData.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
      const result = {
        from: startDate.toISOString(),
        to: endDate.toISOString(),
        readAvg: this.calculateAverage(filteredData, 'read'),
        writeAvg: this.calculateAverage(filteredData, 'write'),
        data: sortedData,
      }

      return response.json(result)
    } catch (error) {
      console.error('Error processing IOPS data:', error)
      return response.internalServerError({
        error: 'An error occurred while processing the request',
      })
    }
  }

  public async getThroughputs({ request, response }: HttpContext) {
    try {
      const startDate = request.input('parsedStartDate') as Date
      const endDate = request.input('parsedEndDate') as Date

      const filePath = join(process.cwd(), 'storage', 'throughput_data.json')
      const filteredData = await this.getFilteredData(filePath, startDate, endDate)
      const sortedData = filteredData.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
      const result = {
        from: startDate.toISOString(),
        to: endDate.toISOString(),
        readAvg: this.calculateAverage(filteredData, 'read'),
        writeAvg: this.calculateAverage(filteredData, 'write'),
        data: sortedData,
      }

      return response.json(result)
    } catch (error) {
      console.error('Error processing throughput data:', error)
      return response.internalServerError({
        error: 'An error occurred while processing the request',
      })
    }
  }
}
