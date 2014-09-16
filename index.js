 'use strict';

/**
 * Module dependencies.
 */

var url = require("fast-url-parser");

/**
 * Constants.
 */

var DEFAULT_HOST = '127.0.0.1';
var IS_INTEGER = /^:?\d+$/;
var IS_HOST_PORT = /^.+:\d+$/;
var IS_PROTOCOL = /:?\/\//;

/**
 * Expose `address`.
 */

module.exports = address;

/**
 * Parse arguments.
 *
 * @param {Mixed} obj
 * @param {String|Function} [host]
 * @param {Function} [fn]
 * @return {Object}
 * @api private
 */

function address(port, host, fn) {

  var res = {}
  var unix = false;

  if ('function' === typeof host) {
    fn = host;
    host = undefined;
  }

  if (port) {

    if ('function' === typeof port) {
      fn = port;
      port = undefined;
      host = undefined;    
    } else if ('number' === typeof port) {
      host = host || DEFAULT_HOST;
    } else if ('object' === typeof port) {
      fn = host;
      host = port.address || port.host;
      port = port.port;
    } else if ('string' === typeof port) {

      // Test to see if this is a valid number
      // if it is then we convert to integer.
      if (IS_INTEGER.test(port)) { 

        // Make sure the port number is an integer
        // for this we parse it.
        port = parseInt(port.replace(':', ''), 10);

        // We check to see if this host string has
        // a protocol, if it does then we asign
        // host name to host.
        if (IS_PROTOCOL.test(host)) {
          host = url.parse(host);
          host = host.hostname;
        }

      } else if (IS_PROTOCOL.test(port)) {
        
        // This port seems to be a valid address, lets
        // parse it to get real address information.
        port = url.parse(port);

        if ('unix:' === port.protocol) {          

          unix = true;

          // Our function if any will be the host because
          // of the extra parametter
          host = fn;

          // No function
          fn = undefined;

          // In this case the pathname is the port
          // so we pass it over.
          port = port.pathname;
        } else {

          // So if we dont have a hostname we need to use
          // the default one.
          host = port.hostname || DEFAULT_HOST;

          // Make sure the port number is an integer
          // for this we parse it.
          port = parseInt(port.port, 10);
        }

      // Test to see if this is a host:port
      } else if (IS_HOST_PORT.test(port)) {

        var parts = port.split(':');

        // Here we need to get the port value
        port = parts.pop();

        // Make sure the port number is an integer
        // for this we parse it.
        port = parseInt(port, 10);
        if (parts[0]) host = parts[0];
      } else {
        host = host || DEFAULT_HOST;
      }
    }
  }

  // We still have the last chance to check if there
  // is a host, if not then we set to our default one.
  if (!host && !unix) host = DEFAULT_HOST;

  // Ensure we only include in the result object
  // the valid properties.
  if (port) res.port = port;
  if (host) res.host = host;
  if (fn) res.fn = fn;

  return res;
}
