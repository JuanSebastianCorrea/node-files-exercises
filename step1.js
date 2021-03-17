const fs = require('fs');

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(`Error reading ${path}: ${err}`);
		} else {
			console.log(data);
		}
	});
}

cat(process.argv[2]);
