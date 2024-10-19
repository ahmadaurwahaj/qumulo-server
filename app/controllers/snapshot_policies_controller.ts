import { SnapshotPolicyType, snapshotPolicyValidator } from '#validators/snapshot_policy'
import type { HttpContext } from '@adonisjs/core/http'
import { randomUUID } from 'crypto'
import { join } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import logger from '@adonisjs/core/services/logger'

export default class SnapshotPoliciesController {
  private async getSnapshotData(filePath: string): Promise<SnapshotPolicyType[]> {
    const fileContent = await readFile(filePath, 'utf-8')
    const data: SnapshotPolicyType[] = JSON.parse(fileContent)
    return data
  }

  private async writeSnapshotData(filePath: string, data: SnapshotPolicyType[]): Promise<void> {
    try {
      const jsonData = JSON.stringify(data, null, 2)
      await writeFile(filePath, jsonData, 'utf-8')
    } catch (error) {
      console.error('Error writing snapshot data:', error)
      throw new Error('Failed to write snapshot data')
    }
  }

  public async storeSnapshotPolicies({ request, response }: HttpContext) {
    try {
      const { id, ...res } = await request.validateUsing(snapshotPolicyValidator)

      const snapshotPolicyId = randomUUID()
      const newSnapshotPolicy: SnapshotPolicyType = {
        id: snapshotPolicyId,
        ...res,
      }

      const filePath = join(process.cwd(), 'storage', 'snapshot_policy.json')

      const filteredData = await this.getSnapshotData(filePath)

      const newOldData = [...filteredData, newSnapshotPolicy]

      await this.writeSnapshotData(filePath, newOldData)

      return response.json({ message: 'Snapshot policy stored successfully' })
    } catch (error) {
      console.error('Error processing snapshot policies:', error)

      if (error.status && error.messages) {
        return response.badRequest({
          status: error.status,
          messages: error.messages,
          error: error.message,
        })
      }

      return response.internalServerError({
        error: 'An error occurred while processing the request',
      })
    }
  }

  public async getSnapshotById({ params, response }: HttpContext) {
    const { id } = params
    const filePath = join(process.cwd(), 'storage', 'snapshot_policy.json')

    try {
      const snapshotPolicies = await this.getSnapshotData(filePath)
      const snapshotPolicy = snapshotPolicies.find((policy) => policy.id === id)

      if (!snapshotPolicy) {
        return response.notFound({ message: 'Snapshot policy not found' })
      }
      logger.info('snapshotPolicy', snapshotPolicy)
      console.log('snapshotPolicy', snapshotPolicy)
      return response.json(snapshotPolicy)
    } catch (error) {
      console.error('Error retrieving snapshot policy by ID:', error)
      return response.internalServerError({
        error: 'An error occurred while retrieving the snapshot policy',
      })
    }
  }

  public async updateSnapshot({ params, request, response }: HttpContext) {
    const { id } = params
    const filePath = join(process.cwd(), 'storage', 'snapshot_policy.json')

    try {
      const res = await request.validateUsing(snapshotPolicyValidator)
      const snapshotPolicies = await this.getSnapshotData(filePath)

      const policyIndex = snapshotPolicies.findIndex((policy) => policy.id === id)

      if (policyIndex === -1) {
        return response.notFound({ message: 'Snapshot policy not found' })
      }

      const updatedPolicy: SnapshotPolicyType = {
        ...snapshotPolicies[policyIndex],
        ...res,
      }

      snapshotPolicies[policyIndex] = updatedPolicy

      await this.writeSnapshotData(filePath, snapshotPolicies)

      return response.json({ message: 'Snapshot policy updated successfully' })
    } catch (error) {
      console.error('Error updating snapshot policy:', error)
      if (error.status && error.messages) {
        return response.badRequest({
          status: error.status,
          messages: error.messages,
          error: error.message,
        })
      }
      return response.internalServerError({
        error: 'An error occurred while updating the snapshot policy',
      })
    }
  }

  public async deleteSnapshot({ params, response }: HttpContext) {
    const { id } = params
    const filePath = join(process.cwd(), 'storage', 'snapshot_policy.json')

    try {
      const snapshotPolicies = await this.getSnapshotData(filePath)

      const policyIndex = snapshotPolicies.findIndex((policy) => policy.id === id)

      if (policyIndex === -1) {
        return response.notFound({ message: 'Snapshot policy not found' })
      }

      snapshotPolicies.splice(policyIndex, 1)

      await this.writeSnapshotData(filePath, snapshotPolicies)

      return response.json({ message: 'Snapshot policy deleted successfully' })
    } catch (error) {
      console.error('Error deleting snapshot policy:', error)
      return response.internalServerError({
        error: 'An error occurred while deleting the snapshot policy',
      })
    }
  }
}
