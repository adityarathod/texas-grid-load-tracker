import cheerio from 'cheerio'
import { keyMappings } from './constants'

// this is described in plain English in constants.ts.
interface StatusParseResult {
  cfr: number
  ite: number
  baal: number
  demand: number
  capacity: number
  windout: number
  pvgrout: number
  inertia: number
  tfdce: number
  tfdcl: number
  tfdcn: number
  tfdcr: number
  tfdcs: number
  lastup: string
}

/**
 * Parse ERCOT status table as HTML and return the information inside it.
 * @param html The HTML string containing the data to parse.
 */
export const parseStatus = (html: string): StatusParseResult => {
  const $ = cheerio.load(html)
  const data: Record<string, string> = {}
  $('tr').each((_, row) => {
    const rowContent = $(row)
      .children()
      .toArray()
      .map(td => $(td).text())
    if (rowContent.length == 2 && rowContent[0] in keyMappings) {
      const key = keyMappings[rowContent[0]]
      data[key] = rowContent[1]
    }
  })
  data['lastup'] = $('.schedTime').text().replace('Last Updated:', '').trim()
  const res: StatusParseResult = {
    cfr: parseFloat(data['cfr']),
    ite: parseFloat(data['ite']),
    baal: parseFloat(data['baal']),
    demand: parseFloat(data['demand']),
    capacity: parseFloat(data['capacity']),
    windout: parseFloat(data['windout']),
    pvgrout: parseFloat(data['pvgrout']),
    inertia: parseFloat(data['inertia']),
    tfdce: parseFloat(data['tfdce']),
    tfdcl: parseFloat(data['tfdcl']),
    tfdcn: parseFloat(data['tfdcn']),
    tfdcr: parseFloat(data['tfdcr']),
    tfdcs: parseFloat(data['tfdcs']),
    lastup: data['lastup'],
  }
  return res
}
