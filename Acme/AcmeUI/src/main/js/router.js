var Backbone = require('backbone');
var Book = require('./models/book');
var BookView = require('./views/bookView');

var AppRouter = Backbone.Router.extend({

  routes: {
    '': 'start',
    'about': 'showAbout', // http://app.acme.com/#about
    'search/:query': 'search',
    'book': 'showBook'
  },

  start: function () {
    console.log('starting point...');
    this.navigate('book', {trigger: true});
  },

  showAbout: function () {
    console.log('showAbout');
  },

  search: function (query) {
    console.log('search with query [' + query + ']');
  },

  showBook: function () {
    var view = new BookView({
      model: new Book()
    });
    
    Backbone.$('body').append(view.render().el);
  }
});

module.exports = AppRouter;
