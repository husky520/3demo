const http = require('http');
const url = require('url');
const fs = require('fs');
const path =require('path');

console.log('\r\n请打开浏览器并在地址栏输入"localhost:8888"\r\n');
http.createServer((req, res) => {
	// parse request source
	const pathNameParsed = url.parse(req.url).pathname;
	
	console.log('# ' + pathNameParsed + ' #');

	if (pathNameParsed === '/') {
		res.writeHead(200, {'content-type': 'text/html'});
		res.end(fs.readFileSync('./index.html'));
	} else if (/.jpg$/.test(pathNameParsed)) {
		res.writeHead(200, {'content-type': 'image/jpg'});
		res.end(fs.readFileSync(path.join(__dirname, pathNameParsed)));
	} else if (/.js$/.test(pathNameParsed)) {
		res.writeHead(200, {'content-type': 'application/text'});
		res.end(fs.readFileSync(path.join(__dirname, pathNameParsed), 'utf8'));
	} else {
		res.end('error');
	}

	
}).listen(8888);