var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var Book = require('../../../src/main/js/models/book');

describe('Book', function () {
  describe('# new Book()', function () {
    it('should have default title', function () {
      var book = new Book();
      assert.equal('no title', book.get('title'));
    });

    it('should do something useful', function () {
      expect(true).to.equal(true);
      assert.equal(true, true);
    });
  });
});
