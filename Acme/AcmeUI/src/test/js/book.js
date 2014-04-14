/*global sinon*/
var assert = require('assert');
var Book = require('../../../src/main/js/models/book');

describe('Book model', function () {
  describe('with useFakeXMLHttpRequest', function () {
    var xhr, requests;

    beforeEach(function () {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      xhr.onCreate = function (req) {
        requests.push(req);
      };
    });

    afterEach(function () {
      xhr.restore();
    });

    it('should fetch the book', function () {
      var book = new Book();
      book.fetch();
      assert.equal(requests.length, 1);
      assert.equal('/api/book', requests[0].url);
    });
  });
});
