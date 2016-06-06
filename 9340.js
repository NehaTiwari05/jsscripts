var tryspree      = 'http://www.tryspree.com';
//var tryspree      = 'http://tryspree.dev';

var user;
var user_id  = casper.cli.get('user_id');
var user_url = tryspree + '/users/' + user_id + '.json;

var page_url      = 'http://www.westernreservehospital.org/healthy-living.aspx';
var form_selector = 'form#ctl02';

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
    'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$rblAvailable':'Yes',
	'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$rblEducation':'Yes',
	'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$ddlImportant':'Quality',
	'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$chbEmail':'on',
	'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$txtFirstName': user.first_name,
	'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$txtLastName': user.last_name,
	'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$txtAddress': user.address,
	'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$txtAddress2': user.address2,
	'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$txtCity': user.city,
	'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$txtState': user.state,
	'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$txtZIP': user.zip,
	'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$ddlTShirt':'L',
	'ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$txtEmail': user.email
  }, false);
});

casper.then(function() {
  this.click('.ctl00$ctl00$Body$Body$ctl00$HealthyLiving_8$btnSubmit');
});

casper.then(function() {
    this.exit();
});

casper.run();




