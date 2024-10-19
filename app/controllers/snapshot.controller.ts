import { HttpContext } from '@adonisjs/core/http'
import SnapshotPolicyService from '#services/snapshot.service'
import { SnapshotPolicyValidator } from '#validators/snapshot.validator'

const SnapshotService = new SnapshotPolicyService()

export default class SnapshotPoliciesController {
  public async storeSnapshotPolicies({ request, response }: HttpContext) {
    try {
      const policyData = await request.validateUsing(SnapshotPolicyValidator)
      const newPolicy = await SnapshotService.createPolicy(policyData)

      return response.json({ message: 'Snapshot policy stored successfully', policy: newPolicy })
    } catch (error) {
      console.error('Error processing snapshot policies:', error)
      return this.handleErrorResponse(response, error)
    }
  }

  public async getSnapshotById({ params, response }: HttpContext) {
    try {
      const policy = await SnapshotService.getPolicyById(params.id)
      if (!policy) {
        return response.notFound({ message: 'Snapshot policy not found' })
      }

      return response.json(policy)
    } catch (error) {
      console.error('Error retrieving snapshot policy by ID:', error)
      return this.handleErrorResponse(response, error)
    }
  }

  public async updateSnapshot({ params, request, response }: HttpContext) {
    try {
      const policyData = await request.validateUsing(SnapshotPolicyValidator)
      const updatedPolicy = await SnapshotService.updatePolicy(params.id, policyData)

      if (!updatedPolicy) {
        return response.notFound({ message: 'Snapshot policy not found' })
      }

      return response.json({
        message: 'Snapshot policy updated successfully',
        policy: updatedPolicy,
      })
    } catch (error) {
      console.error('Error updating snapshot policy:', error)
      return this.handleErrorResponse(response, error)
    }
  }

  public async deleteSnapshot({ params, response }: HttpContext) {
    try {
      const deleted = await SnapshotService.deletePolicy(params.id)
      if (!deleted) {
        return response.notFound({ message: 'Snapshot policy not found' })
      }

      return response.json({ message: 'Snapshot policy deleted successfully' })
    } catch (error) {
      console.error('Error deleting snapshot policy:', error)
      return this.handleErrorResponse(response, error)
    }
  }

  private handleErrorResponse(response: HttpContext['response'], error: any) {
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
