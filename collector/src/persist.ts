import fs from 'fs'

export const readDataFile = (path: string = '../data/points.json') => {
  if (!fs.existsSync(path)) return null
  const file = fs.readFileSync(path, { encoding: 'utf-8' })
  const json = JSON.parse(file)
  return json
}

export const writeDataFile = (
  data: any,
  path: string = '../data/points.json',
  overwrite: boolean = true
) => {
  if (!overwrite && !fs.existsSync(path)) {
    throw new Error('Attempting to overwrite data file accidentally!')
  }
  const jsonStr = JSON.stringify(data)
  const buf = Buffer.from(jsonStr)
  fs.writeFileSync(path, buf)
}
