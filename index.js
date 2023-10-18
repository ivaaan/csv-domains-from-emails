const fs = require('fs');
const { parse } = require('csv');

const fileName = './input.csv';
const records = [];
const domains = [];
let uniqueDomains;
let uniqueDomainsArr;

const parser = parse({
	delimiter: ',',
});

// reading and parsing email domains from csv file
parser.on('readable', function () {
	let record;
	while ((record = parser.read()) !== null) {
		records.push(record);
	}
});

parser.on('error', function (err) {
	console.error(err.message);
});

parser.on('end', function () {
	records.forEach((record) => {
		const email = record[0];
		const domain = email.split('@').pop();
		domains.push(domain);
		// removing duplicate domains
		uniqueDomains = Array.from(new Set(domains));
	});

	// writing domains array to a new csv file
	const csvContent = uniqueDomains.join('\n');

	fs.writeFile('output.csv', csvContent, function (err) {
		if (err) throw err;
		console.log('The output file has been created!');
	});
});

fs.createReadStream(fileName).pipe(parser);
