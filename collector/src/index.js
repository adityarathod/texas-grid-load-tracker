const cheerio = require('cheerio')
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser
const http = require('http')

const ERCOT_URL = `http://www.ercot.com/content/cdr/html/real_time_system_conditions.html`
const MAPPINGS = {
	"Current Frequency": 'cfr',
	"Instantaneous Time Error": 'ite',
	"Consecutive BAAL Clock-Minute Exceedances (min)": 'baal',
	"Actual System Demand": 'demand',
	"Total System Capacity (not including Ancillary Services)": 'capacity',
	"Total Wind Output": 'windout',
	"Total PVGR Output": 'pvgrout',
	"Current System Inertia": 'inertia',
	"DC_E (East)": 'tfdce',
	"DC_L (Laredo VFT)": 'tfdcl',
	"DC_N (North)": 'tfdcn',
	"DC_R (Railroad)": 'tfdcr',
	"DC_S (Eagle Pass)": 'tfdcs',
}

function getSystemConditions() {
	return new Promise((resolve, reject) => {
		http.get(ERCOT_URL, res => {
			if (res.statusCode !== 200) reject(statusCode)
			res.setEncoding('utf8')
			let str = ''
			res.on('data', chunk => str += chunk)
			res.on('end', () => resolve(str))
		})
	})
}

function parseSystemConditions(html) {
	const $ = cheerio.load(html, {encoding: 'utf-8'})
	let data = {}
	$('tr').each((idx, el) => {
		const infoLine = $(el).children().toArray().map(x => $(x).text())
		if (infoLine.length == 2) {
			if (infoLine[0] in MAPPINGS) {
				data[MAPPINGS[infoLine[0]]] = infoLine[1]
			}
		}
	})
	data['lastup'] = $('.schedTime').text().replace('Last Updated:', '').trim()
	return data
}


async function main() {
	const html = await getSystemConditions()
	const res = parseSystemConditions(html) 
	console.log(res)
}

main()
setInterval(() => main(), 15 * 1000)