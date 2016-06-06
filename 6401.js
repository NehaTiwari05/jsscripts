var tryspree      = 'http://www.tryspree.com';
//var tryspree      = 'http://tryspree.dev';

var user;
var user_id  = casper.cli.get('user_id');
var user_url = tryspree + '/users/' + user_id + '.json;

var page_url      = 'https://fiber.google.com/cities/saltlakecity/';
var form_selector = 'form#notify-form';

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
    'street_address':user.address
	'unit_number':user.unit_number
	'zip_code':user.zipcode
  }, false);
});

casper.then(function() {
  this.click('.fiber-button-alt');
});

casper.then(function() {
    this.exit();
});

casper.run();