var assert = require('assert');
var Book = require('../../../main/js/models/book');
var BookView = require('../../../main/js/views/bookView');

describe('BookView', function () {
  describe('# dummy test', function () {

    it('should have default name', function () {
      var book = new Book();
      assert.equal('no title', book.get('title'));
    });

    it('should have some el value', function () {
      var bookView = new BookView({
        model: new Book()
      });

      bookView.render();
      assert.equal(bookView.$('.title').text(), 'no title');
      assert.equal(bookView.$('.author').text(), '');
    });

  });
});
