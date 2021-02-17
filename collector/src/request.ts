import http from 'http'
import { ercotURL } from './constants'
// Patch the HTTP module at runtime due to the CDN serving malformed headers.
import { HTTPParser } from 'http-parser-js'
// -_-
process.binding('http_parser').HTTPParser = HTTPParser
// Incapsula CDN, fix yo' stuff pls.

/**
 * Get the current contents of the ERCOT status page as HTML.
 */
export const getStatus = (): Promise<string> =>
  new Promise((resolve, reject) => {
    http.get(ercotURL, res => {
      if (res.statusCode !== 200) reject(res.statusCode)
      res.setEncoding('utf8')
      let str = ''
      res.on('data', chunk => (str += chunk))
      res.on('end', () => resolve(str))
    })
  })
