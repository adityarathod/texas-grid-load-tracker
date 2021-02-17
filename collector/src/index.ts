import { getStatus } from './request'
import { parseStatus } from './parser'
import { readDataFile, writeDataFile } from './persist'

async function main() {
  try {
    const html = await getStatus()
    const res = parseStatus(html)
    const existingData = readDataFile()
    let newData: any[]
    if (!existingData) {
      newData = [res]
    } else {
      newData = [...existingData, res]
    }
    writeDataFile(newData)
    console.log('Written data successfully.')
  } catch (err) {
    console.error('Unable to update status.')
    console.error(err)
  }
}

main()
