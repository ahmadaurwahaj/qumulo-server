import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class DateRangeValidatorMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    const startTime = request.input('start')
    const endTime = request.input('end')

    if (!startTime || !endTime) {
      return response.badRequest({
        error: 'Start and end times are required',
      })
    }

    const startDate = new Date(startTime)
    const endDate = new Date(endTime)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return response.badRequest({
        error: 'Invalid date format',
      })
    }

    if (startDate > endDate) {
      return response.badRequest({
        error: 'Start date should be earlier than end date',
      })
    }

    request.updateBody({
      parsedStartDate: startDate,
      parsedEndDate: endDate,
    })

    await next()
  }
}
