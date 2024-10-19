import vine from '@vinejs/vine'
import { InferInput } from '@vinejs/vine/types'

export const SnapshotPolicyValidator = vine.compile(
  vine.object({
    policyName: vine.string().trim().minLength(3).maxLength(50),
    applyToDirectory: vine.string().trim().minLength(1),
    scheduleType: vine.enum(['Daily or Weekly', 'Monthly']),
    timeZone: vine.string().trim().optional(),
    snapshotTime: vine.object({
      hours: vine.number().min(0).max(23),
      minutes: vine.number().min(0).max(59),
    }),
    days: vine.array(vine.enum(['Every day', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])),
    deleteEachSnapshot: vine.union([
      vine.union.if((value) => typeof value === 'string', vine.literal('Never')),
      vine.union.else(
        vine.object({
          after: vine.number().min(1).optional(),
          unit: vine.enum(['day', 'week', 'month']).optional(),
        })
      ),
    ]),
    enableLockedSnapshots: vine.boolean(),
    enablePolicy: vine.boolean(),
    id: vine.string().optional(),
  })
)

export type SnapshotPolicyType = InferInput<typeof SnapshotPolicyValidator>
