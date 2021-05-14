import * as util from 'util';
import * as querystring from 'querystring';

const timestamp = () => {
    return new Date().toISOString();
}

export function sniffOn(server) {
    server.on('request', (req, res) => {
        console.log(`${timestamp()} request`);
        console.log(`${timestamp()} ${reqToString(req)}`);
    })

    server.on('close', errno => {
        console.log(`${timestamp()} close errno=${errno}`);
    })

    server.on('checkContinue', (req, res) => {
        console.log(`${timestamp()} checkContinue`);
        console.log(`${timestamp()} ${reqToString(req)}`);
        res.writeContinnue();
    })

    server.on('upgrade', (req, socker, head) => {
        console.log(`${timestamp()} upgrade`);
        console.log(`${timestamp()} ${reqToString(req)}`);
    })

    server.on('clientError', () => {
        console.log('client-Error');
    })
}

export function reqToString(req) {
    var str2Return = `request ${req.method} ${req.httpVersion} ${req.url} \n`;

    str2Return += req.url + '\n';

    var keys = Object.keys(req.headers);
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        str2Return += `${i} ${key}: ${req.headers[key]}` + '\n';
    }

    if (req.trailers)
        str2Return += util.inspect(req.trailers) + '\n';

    return str2Return;
}