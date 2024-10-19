import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { randomUUID } from 'crypto'
import { SnapshotPolicyType } from '#validators/snapshot.validator'
import { readDataFromFile } from '../utils/fileRead.js'
const FILE_PATH = join(process.cwd(), 'storage', 'snapshot_policy.json')

export default class SnapshotPolicyService {
  private async getAllPolicies(): Promise<SnapshotPolicyType[]> {
    try {
      const data = await readDataFromFile<SnapshotPolicyType[]>(FILE_PATH)
      return data || []
    } catch (error) {
      console.error('Error reading snapshot policies:', error)
      throw new Error('Failed to read snapshot policies')
    }
  }

  public async getPolicyById(id: string): Promise<SnapshotPolicyType | undefined> {
    const policies = await this.getAllPolicies()
    return policies.find((policy) => policy.id === id)
  }

  private async writePolicies(policies: SnapshotPolicyType[]): Promise<void> {
    try {
      const jsonData = JSON.stringify(policies, null, 2)
      await fs.writeFile(FILE_PATH, jsonData, 'utf-8')
    } catch (error) {
      console.error('Error writing snapshot data:', error)
      throw new Error('Failed to write snapshot data')
    }
  }

  public async createPolicy(
    policyData: Omit<SnapshotPolicyType, 'id'>
  ): Promise<SnapshotPolicyType> {
    const newPolicy: SnapshotPolicyType = { id: randomUUID(), ...policyData }
    const policies = await this.getAllPolicies()
    policies.push(newPolicy)
    await this.writePolicies(policies)
    return newPolicy
  }

  public async updatePolicy(
    id: string,
    updatedData: Partial<SnapshotPolicyType>
  ): Promise<boolean> {
    const policies = await this.getAllPolicies()
    const policyIndex = policies.findIndex((policy) => policy.id === id)

    if (policyIndex === -1) throw new Error('Snapshot policy not found')

    policies[policyIndex] = { ...policies[policyIndex], ...updatedData }
    await this.writePolicies(policies)
    return true
  }

  public async deletePolicy(id: string): Promise<void> {
    const policies = await this.getAllPolicies()
    const updatedPolicies = policies.filter((policy) => policy.id !== id)
    if (policies.length === updatedPolicies.length) throw new Error('Snapshot policy not found')
    await this.writePolicies(updatedPolicies)
  }
}
