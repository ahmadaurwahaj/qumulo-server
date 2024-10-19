import { readFile } from 'node:fs/promises'

/**
 * Reads JSON data from a file and parses it into a JavaScript object.
 * @param filePath The path to the JSON file.
 * @returns Parsed data from the file.
 */
export async function readDataFromFile<T>(filePath: string): Promise<T> {
  try {
    const fileContent = await readFile(filePath, 'utf-8')
    return JSON.parse(fileContent) as T
  } catch (error) {
    console.error('Error reading data from file:', error)
    throw new Error('Failed to read data from file')
  }
}
