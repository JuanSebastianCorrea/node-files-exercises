const fs = require('fs');
const axios = require('axios');

function handleOutput(text, fileToOutputTo) {
	if (fileToOutputTo) {
		fs.writeFile(fileToOutputTo, text, 'utf8', (err) => {
			console.log(`Error writing to ${fileToOutputTo} : ${err}`);
			process.exit(1);
		});
	} else {
		console.log(text);
	}
}

function cat(path, out) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(`Error reading ${path}: ${err}`);
			process.exit(1);
		} else {
			handleOutput(data, out);
		}
	});
}

async function webCat(url, out) {
	try {
		let res = await axios.get(url);
		handleOutput(res.data, out);
	} catch (err) {
		console.error(`Error fetching ${url}: ${err}`);
		process.exit(1);
	}
}

let path;
let out;

if (process.argv[2] === '--out') {
	out = process.argv[3];
	path = process.argv[4];
} else {
	path = process.argv[2];
}

if (path.startsWith('http')) {
	webCat(path, out);
} else {
	cat(path, out);
}
