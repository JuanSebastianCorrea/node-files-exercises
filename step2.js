const fs = require('fs');
const axios = require('axios');

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(`Error reading ${path}: ${err}`);
		} else {
			console.log(data);
		}
	});
}

async function webCat(url) {
	try {
		let res = await axios.get(url);
		console.log(url);
		console.log(res.data);
	} catch (err) {
		console.error(`Error fetching ${url}: ${err}`);
		process.exit(1);
	}
}

if (process.argv[2].startsWith('http')) {
	webCat(process.argv[2]);
} else {
	cat(process.argv[2]);
}
