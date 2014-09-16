# porthost

[![Build Status](https://travis-ci.org/cayasso/porthost.svg?branch=master)](https://travis-ci.org/cayasso/porthost)
[![NPM version](https://badge.fury.io/js/porthost.svg)](http://badge.fury.io/js/porthost)

Make working with NodeJS net dead simple and slicker.

## Usage

```js
var ph = require('porthost');
var net = require('net');

var Api = {
  connect: function (port, host, fn) {
    var addr = ph(port, host, fn);
    net.connect(addr.port, addr.host, addr.fn);
  }
};

Api.connect(8080, fn);
Api.connect('8080', fn);
Api.connect(':8080', fn);
Api.connect('127.0.0.1', fn);
Api.connect('127.0.0.1:8080', fn);
Api.connect('tcp://127.0.0.1', fn);
Api.connect('tcp://127.0.0.1:8080', fn);
Api.connect(8080, '127.0.0.1', fn);
Api.connect(8080, 'tcp://127.0.0.1', fn);
Api.connect(undefined, 'tcp://127.0.0.1', fn);
Api.connect({ host: '127.0.0.1', port: 8080 }, fn);
Api.connect({ address: '127.0.0.1', port: 8080 }, fn);

// UNIX domain connections
Api.connect('unix://' + __dirname + '/conn.sock')
```

If `port`, `host` or `fn` are `undefined` then it will be omitted in the address object result.

## Installation

```bash
$ npm install porthost
```

## Run Test

```bash
$ make test
```

## License

(The MIT License)

Copyright (c) 2014 Jonathan Brumley &lt;cayasso@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


