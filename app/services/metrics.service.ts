import { join } from 'node:path'
import { readDataFromFile } from '../utils/fileRead.js'

interface Metric {
  date: string
  read: number
  write: number
}

export default class MetricsService {
  public async getFilteredData(
    fileName: string,
    startDate: Date,
    endDate: Date
  ): Promise<Metric[]> {
    const filePath = join(process.cwd(), 'storage', fileName)
    const data: Metric[] = await readDataFromFile(filePath)

    return data.filter((metric) => {
      const metricDate = new Date(metric.date)
      return metricDate >= startDate && metricDate <= endDate
    })
  }

  public calculateAverage(data: Metric[], key: 'read' | 'write'): number {
    if (data.length === 0) return 0
    const sum = data.reduce((acc, metric) => acc + metric[key], 0)
    return sum / data.length
  }

  public sortDataByDate(data: Metric[]): Metric[] {
    return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }
}
