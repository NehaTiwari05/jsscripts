var tryspree      = 'http://www.tryspree.com';
//var tryspree      = 'http://tryspree.dev';

var user;
var user_id  = casper.cli.get('user_id');
var user_url = tryspree + '/users/' + user_id + '.json;

var page_url      = 'http://www.marshlandapparel.com/free-decal.html';
var form_selector = 'form#form-239874028286321186';

var casper  = require('casper').create({
  webSecurityEnabled: false,
  waitTimeout: 5000,
  clientScripts: null,
  pageSettings: {
    loadImages: false,
    loadPlugins: false
  },
  verbose: true,
  logLevel: 'debug'
});

casper.options.viewportSize = { width: 1440, height: 778 };

casper.start();

casper.then(function() {
  this.open(user_url);
});

casper.then(function() {
  user = JSON.parse(this.getPageContent());
})

casper.thenOpen(page_url);

casper.then(function() {
  this.fill(form_selector, {
    '_u807587788358469928[first]':user.first_name
	'_u807587788358469928[last]':user.last_name
	'_u281190117121911815':user.email
	'_u471984525375487825':user.address	
  }, false);
});

casper.then(function() {
  this.click('.wsite-button-inner');
});

casper.then(function() {
    this.exit();
});

casper.run();




