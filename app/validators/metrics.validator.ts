import vine from '@vinejs/vine'
import { InferInput } from '@vinejs/vine/types'

export const MetricReq = vine.compile(
  vine.object({
    start: vine.string(),
    end: vine.string(),
  })
)
export type MetricReqType = InferInput<typeof MetricReq>
