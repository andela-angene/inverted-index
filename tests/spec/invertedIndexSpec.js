const books = require('./books.json');
const wrongdata = require('./wrongdata.json');
const emptyfile = require('./emptyfile.json');
const wrongfile = require('./wrongfile.js');

const InvertedIndex = require('../src/invertedIndex.js');

describe('InvertedIndex Class', () => {
  beforeAll(() => {
    this.invertedIndex = new InvertedIndex();
  });

  describe('Validate Files ', () => {
    it('verifies that the JSON file is valid', () => {
      expect(InvertedIndex.validateFile(books)).toBe(true);
      expect(InvertedIndex.validateFile(wrongfile)).toBe(false);
      expect(InvertedIndex.validateFile(emptyfile)).toBe(false);
      expect(InvertedIndex.validateFile(wrongdata)).toBe(false);
    });
  });

});
