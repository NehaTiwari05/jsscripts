var tryspree      = 'http://www.tryspree.com';
//var tryspree      = 'http://tryspree.dev';

var user;
var user_id  = casper.cli.get('user_id');
var user_url = tryspree + '/users/' + user_id + '.json;

var page_url      = 'http://www.graduationsource.com/educator-resources/product-samples.html';
var form_selector = 'form#request-form';

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
    'custentity_graduation_type':'College or University',
	'custentity_num_annual_graduates':'2-9',
	'custentity_graduationmonths':'January',
	'custentity_sampreq_color_pref':'Black',
	'custentity_sampreq_fabric_pref':'Environmental',
	'companyname':user.school_name
	'firstname':user.first_name
	'lastname':user.last_name
	'email':user.email
	'phone':user.phone
	'custentity_role_in_graduation': 'Work at the school',
	'address1':user.address1
	'address2':user.address2
	'city':user.city
	'state':'Texas',
	'zipcode':user.zipcode	
  }, false);
});

casper.then(function() {
  this.click('.button');
});

casper.then(function() {
    this.exit();
});

casper.run();




