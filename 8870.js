var tryspree      = 'http://www.tryspree.com';
//var tryspree      = 'http://tryspree.dev';

var user;
var user_id  = casper.cli.get('user_id');
var user_url = tryspree + '/users/' + user_id + '.json;

var page_url      = 'http://www.cottonwork.com/starterkit/';
var form_selector = 'div#form-body';

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
    'entry.0.single':user.email
	'entry.2.single':user.name
	'entry.3.single':user.address
	'entry.4.single':user.state
	'entry.5.single':user.zipcode
	'entry.6.single':'United States'
  }, false);
});

casper.then(function() {
  this.click('submit');
});

casper.then(function() {
    this.exit();
});

casper.run();




