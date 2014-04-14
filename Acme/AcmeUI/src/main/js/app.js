var $ = global.jQuery = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;
require('bootstrap');

var AppRouter = require('./router');
var router = new AppRouter();
Backbone.history.start();
// router.navigate('client', {trigger: true});
