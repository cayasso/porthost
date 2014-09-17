var address = require('../');
var fn = function () {};

describe('verifyd-address', function(){

  it('should return default values', function(){
    address().should.be.eql({
      host: '127.0.0.1'
    });
  });

  it('should accept object with address and port', function(){
    var obj = { address: '1.2.3.4', port: 8080 };
    address(obj).should.be.eql({
      host: '1.2.3.4',
      port: 8080
    });
  });

  it('should accept object with host and port', function(){
    var obj = { host: '1.2.3.4', port: 8080 }
    address(obj).should.be.eql({
      host: '1.2.3.4',
      port: 8080
    });
  });

  it('should accept single port', function(){
    address(8080).should.be.eql({
      host: '127.0.0.1',
      port: 8080
    });
  });

  it('should accept port as string', function(){
    address('8080').should.be.eql({
      host: '127.0.0.1',
      port: 8080
    });
  });

  it('should accept :port', function(){
    address(':8080').should.be.eql({
      host: '127.0.0.1',
      port: 8080
    });
  });

  it('should accept host:port', function(){
    address('1.2.3.4:8080').should.be.eql({
      host: '1.2.3.4',
      port: 8080
    });
  });

  it('should accept port and host', function(){
    address(8080, '1.2.3.4').should.be.eql({
      host: '1.2.3.4',
      port: 8080
    });
  });

  it('should accept port as string and host', function(){
    address('8080', '1.2.3.4').should.be.eql({
      host: '1.2.3.4',
      port: 8080
    });
  });

  it('should accept :port and host', function(){
    address(':8080', '1.2.3.4').should.be.eql({
      host: '1.2.3.4',
      port: 8080
    });
  });

  it('should accept null and host', function(){
    address(null, '1.2.3.4').should.be.eql({
      host: '1.2.3.4'
    });
  });

  it('should accept port, host and fn', function(){
    address(8080, '1.2.3.4', fn).should.be.eql({
      host: '1.2.3.4',
      port: 8080,
      fn: fn
    });
  });

  it('should accept port as string, host, fn', function(){
    address('8080', '1.2.3.4', fn).should.be.eql({
      host: '1.2.3.4',
      port: 8080,
      fn: fn
    });
  });

  it('should accept :port, host and fn', function(){
    address(':8080', '1.2.3.4', fn).should.be.eql({
      host: '1.2.3.4',
      port: 8080,
      fn: fn
    });
  });

  it('should accept null, host and fn', function(){
    address(undefined, '1.2.3.4', fn).should.be.eql({
      host: '1.2.3.4',
      fn: fn
    });
  });

  it('should accept tcp protocol with no port', function () {
    address('tcp://1.2.3.4').should.be.eql({
      host: '1.2.3.4'
    });
  });

  it('should accept tcp protocol', function () {
    address('tcp://1.2.3.4:8080').should.be.eql({
      host: '1.2.3.4',
      port: 8080
    });
  });

  it('should accept tcp protocol as second argument', function () {
    address(8080, 'tcp://1.2.3.4').should.be.eql({
      host: '1.2.3.4',
      port: 8080
    });
  });

  it('should accept string port with tcp protocol as second argument', function () {
    address('8080', 'tcp://1.2.3.4').should.be.eql({
      host: '1.2.3.4',
      port: 8080
    });
  });

  it('should accept :port with tcp protocol as second argument', function () {
    address(':8080', 'tcp://1.2.3.4').should.be.eql({
      host: '1.2.3.4',
      port: 8080
    });
  });  

  it('should accept tcp protocol as second argument', function () {
    address({ port: 8080, host: 'tcp://1.2.3.4' }).should.be.eql({
      host: '1.2.3.4',
      port: 8080
    });
  });

  it('should accept object tcp protocol as second argument and function', function () {
    address({ port: 8080, host: 'tcp://1.2.3.4' }, fn).should.be.eql({
      host: '1.2.3.4',
      port: 8080,
      fn: fn
    });
  });

  it('should accept unix socket address', function () {
    var path = process.cwd() + '/test.sock';
    var protocol = 'unix://';
    address(protocol + path).should.be.eql({
      port: path
    });
  });

});
