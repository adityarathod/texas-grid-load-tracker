import { getStatus } from './request'
import { parseStatus } from './parser'

async function main() {
  try {
    const html = await getStatus()
    const res = parseStatus(html)
    console.log(res)
  } catch (err) {
    console.error('Unable to update status.')
    console.error(err)
  }
}

main()
setInterval(() => main(), 15 * 1000)
