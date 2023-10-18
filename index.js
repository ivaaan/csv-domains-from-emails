const fs = require('fs');
const { parse } = require('csv');

const inputFilePath = './input.csv';
const outputFilePath = './output.csv';

const parseEmailDomains = () => {
	const records = [];
	const domains = [];

	const parser = parse({
		delimiter: ',',
	});

	parser.on('readable', function () {
		let record;
		while ((record = parser.read()) !== null) {
			records.push(record);
		}
	});

	parser.on('error', function (err) {
		console.error(`Error while parsing input file: ${err.message}`);
	});

	parser.on('end', function () {
		records.forEach((record) => {
			const email = record[0];
			const domain = email.split('@').pop();
			domains.push(domain);
		});

		const uniqueDomains = Array.from(new Set(domains));
		const csvContent = uniqueDomains.join('\n');

		fs.writeFile(outputFilePath, csvContent, function (err) {
			if (err) {
				console.error(`Error while writing output file: ${err.message}`);
				return;
			}

			console.log('The output file has been created!');
		});
	});

	fs.createReadStream(inputFilePath).pipe(parser);
};

parseEmailDomains();
