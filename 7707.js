var tryspree      = 'http://www.tryspree.com';
//var tryspree      = 'http://tryspree.dev';

var user;
var user_id  = casper.cli.get('user_id');
var user_url = tryspree + '/users/' + user_id + '.json;

var page_url      = 'http://singlegrain.us2.list-manage.com/subscribe?u=e030bbec49bde8b85af8087b6&id=48c0fcd4dc';
var form_selector = 'div#mergeTable';

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
    'MERGE1':user.first_name
	'MERGE2':user.last_name
	'MERGE4':user.size
	'MERGE3':user.shippingaddress
	'MERGE0':user.email	
  }, false);
});

casper.then(function() {
  this.click('submit');
});

casper.then(function() {
    this.exit();
});

casper.run();




