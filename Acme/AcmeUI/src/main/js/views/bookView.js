/*global alert*/
var Backbone = require('backbone');
var template = require('../templates/book.html');
var moment = require('moment');

var BookView = Backbone.View.extend({

  className: 'book',

  events: {
    'click': 'toggle'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'change:title', this.titleChange);
  },

  titleChange: function () {
    console.log('title changed : ' + this.model.get('title'));
    this.$el.tooltip('destroy');
  },

  render: function () {
    console.log('render');
    this.$el.html(template(this.model.toJSON()));
    this.$el.tooltip({
      title: this.model.get('title'),
      placement: 'auto'
    });
    return this;
  },

  toggle: function () {
    this.model.fetch();
    alert('Time is ' + moment().format());
  }
});

module.exports = BookView;
