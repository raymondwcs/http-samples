import * as http from 'http';
import * as util from 'util';
import * as os from 'os';
import { sniffOn } from './sniffer.js';

const listenOn = 'http://localhost:8099';
const server = http.createServer();

server.on('request', (req, res) => {
    const { url, headers, method } = req;

    let requrl = new URL(url, `http://${headers.host}`);

    switch (requrl.pathname) {
        case '/osinfo':
            osInfo(req, res);
            break;
        default:
            homePage(req, res);
    }
});

server.listen(new URL(listenOn).port);
sniffOn(server);
console.log(`listening at ${new URL(listenOn).port}`);

function homePage(req, res) {
    const { url, headers, method } = req;
    const requrl = new URL(url, `http://${headers.host}`);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body>");
    res.write(`Request method: ${method} <br>`);
    res.write(`Request path: ${requrl.pathname} <br>`);

    const querystring = JSON.stringify(requrl.searchParams).length > 0 ? requrl.searchParams : "nil"
    res.write(`Query String: ${querystring} <br>`);

    if (requrl.searchParams) {
        for (const [key, value] of requrl.searchParams) {
            res.write(`&nbsp; ${key} = ${value}`)
        }
    } else {
        res.write('There is no query string parameter!<br>');
    }

    res.write(`<br>User Agent: ${req.headers['user-agent']}`);
    res.write('<p><a href=/osinfo>OS Info</a></p>');
    res.end("</body></html>");
}

function osInfo(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
        `<html><head><title>Operating System Info</title></head>
        <body><h1>Operating System Info</h1>
        <table>
        <tr><th>TMP Dir</th><td>${os.tmpdir()}</td></tr>
        <tr><th>Host Name</th><td>${os.hostname()}</td></tr>
        <tr><th>OS Type</th><td>${os.type()} ${os.platform()} 
            ${os.arch()} ${os.release()}</td></tr>
        <tr><th>Uptime</th><td>${os.uptime()} ${util.inspect(os.loadavg())}</td></tr>
        <tr><th>Memory</th><td>total: ${os.totalmem()} free: ${os.freemem()}</td></tr>
        <tr><th>CPU's</th><td><pre>${util.inspect(os.cpus())}</pre></td></tr>
        <tr><th>Network</th><td><pre>${util.inspect(os.networkInterfaces())}</pre></td></tr>
        </table>
        </body></html>`
    );
}
