var tryspree      = 'http://www.tryspree.com';
//var tryspree      = 'http://tryspree.dev';

var user;
var user_id  = casper.cli.get('user_id');
var user_url = tryspree + '/users/' + user_id + '.json;

var page_url      = 'http://www.chacos.com/US/en/stickers';
var form_selector = 'form#stickersPage';

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
    'dwfrm_stickers_a__FirstName':user.first_name
	'dwfrm_stickers_b__LastName':user.last_name
	'dwfrm_stickers_c__Email':user.email
	'dwfrm_stickers_d__Address':user.address
	'dwfrm_stickers_e__City':user.city
	'dwfrm_stickers_f__State_state':user.state
	'dwfrm_stickers_g__ZipCode':user.zipcode
	'dwfrm_stickers_h__EmailOptIn':'true'	
  }, false);
});

casper.then(function() {
  this.click('dwfrm_stickers_submit');
});

casper.then(function() {
    this.exit();
});

casper.run();




