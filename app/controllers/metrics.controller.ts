import type { HttpContext } from '@adonisjs/core/http'
import MetricsService from '#services/metrics.service'

const metricsService = new MetricsService()

export default class MetricsController {
  public async getIOPS({ request, response }: HttpContext) {
    try {
      const start = request.input('start') as string
      const end = request.input('end') as string

      const startDate = new Date(start)
      const endDate = new Date(end)

      const filteredData = await metricsService.getFilteredData(
        'iops_data_100.json',
        startDate,
        endDate
      )

      const sortedData = metricsService.sortDataByDate(filteredData)

      const result = {
        from: startDate.toISOString(),
        to: endDate.toISOString(),
        readAvg: metricsService.calculateAverage(filteredData, 'read'),
        writeAvg: metricsService.calculateAverage(filteredData, 'write'),
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
      const start = request.input('start') as string
      const end = request.input('end') as string

      const startDate = new Date(start)
      const endDate = new Date(end)

      const filteredData = await metricsService.getFilteredData(
        'throughput_data.json',
        startDate,
        endDate
      )

      const sortedData = metricsService.sortDataByDate(filteredData)

      const result = {
        from: startDate.toISOString(),
        to: endDate.toISOString(),
        readAvg: metricsService.calculateAverage(filteredData, 'read'),
        writeAvg: metricsService.calculateAverage(filteredData, 'write'),
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
