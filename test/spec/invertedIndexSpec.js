const validFile = require('./books/validFile.json');
const simpleValidFile = require('./books/simpleValidFile.json');
const empty = require('./books/empty.json');
const emptyText = require('./books/emptyText.json');
const notArray = require('./books/notArray.json');
const wrongData = require('./books/wrongData.json');

const index = new InvertedIndex();

describe('InvertedIndex', () => {
  describe('Constructor', () => {
    it('can create an instance of InvertedIndex', () => {
      expect(typeof index).toEqual('object');
    });
    it('initializes properties correctly', () => {
      expect(index.files).toEqual([]);
      expect(index.showAllFiles).toBeFalsy();
      expect(index.indexed).toEqual({});
      expect(index.showAllFilesSearch).toBeFalsy();
      expect(index.searchAllResult).toEqual({});
    });
  });

  describe('ValidateFile', () => {
    it('should return false if an invalid file was uploaded', () => {
      expect(InvertedIndex.validateFile(empty)).toBeFalsy();
      expect(InvertedIndex.validateFile(emptyText)).toBeFalsy();
      expect(InvertedIndex.validateFile(notArray)).toBeFalsy();
      expect(InvertedIndex.validateFile(wrongData)).toBeFalsy();
    });
    it('should return the file content if a valid file was uploaded', () => {
      expect(InvertedIndex.validateFile(validFile)).not.toBeFalsy();
      expect(InvertedIndex.validateFile(simpleValidFile)).not.toBeFalsy();
      expect(typeof InvertedIndex.validateFile(validFile)).toEqual('object');
    });
  });

  describe('Tokenize', () => {
    it('should return an array of unique words', () => {
      expect(InvertedIndex.tokenize('tony is humble tony'))
      .toEqual(['tony', 'is', 'humble']);
    });
    it('should remove invalid characters', () => {
      expect(InvertedIndex.tokenize('$A%^n*del)a %i=s @a$w&es$om#e%'))
      .toEqual(['andela', 'is', 'awesome']);
    });
    it('should return case-insensitive result', () => {
      expect(InvertedIndex.tokenize('HI')).toEqual(['hi']);
    });
  });

  describe('CreateIndex', () => {
    beforeAll(() => {
      this.filename = 'simpleValidFile.json';
      this.check = index.createIndex(simpleValidFile, this.filename);
    });

    it('creates an index object', () => {
      expect(this.check).toBeTruthy();
      expect(typeof index.getIndex(this.filename)).toEqual('object');
    });
    it('returns false if file already exists', () => {
      expect(index.createIndex(simpleValidFile, this.filename)).toBeFalsy();
    });
    it('correctly stores the total number of books and their titles', () => {
      expect(index.getIndex(this.filename).bookTitles).toEqual(
        ['Alice', 'Lord of the Rings', 'Rings']
      );
      expect(index.getIndex(this.filename).bookTitles.length).toBe(3);
    });
    it('creates the correct index', () => {
      expect(index.getIndex(this.filename).words.alice).toEqual([true, false, false]);
      expect(index.getIndex(this.filename).words.falls).toEqual([true, true, false]);
      expect(index.getIndex(this.filename).words.alliance).toEqual([false, true, true]);
    });
    it('correctly stores all words in the file', () => {
      expect(index.getIndex(this.filename).allWords).toEqual(
        ['alice', 'falls', 'into', 'an', 'unusual', 'alliance']
      );
    });
  });

  describe('GetIndex', () => {
    it('should return correct index', () => {
      expect(typeof index.getIndex('simpleValidFile.json')).toEqual('object');
      expect(index.getIndex(this.filename)).toEqual(
        {
          bookTitles: ['Alice', 'Lord of the Rings', 'Rings'],
          allWords: ['alice', 'falls', 'into', 'an', 'unusual', 'alliance'],
          words: {
            alice: [true, false, false],
            falls: [true, true, false],
            into: [true, false, false],
            an: [false, true, true],
            unusual: [false, true, true],
            alliance: [false, true, true],
          }
        }
      );
    });
    it('should return false if file index was not found', () => {
      expect(index.getIndex('notIndex.json')).toBeFalsy();
    });
  });

  describe('SearchIndex', () => {
    it('should return false if filename does not exist', () => {
      expect(index.searchIndex('alice', 'wrongData.json')).toBeFalsy();
    });
    it('should return return the correct search result', () => {
      expect(typeof index.searchIndex('alice', this.filename)).toEqual('object');
      expect(index.searchIndex('alice hahaha unusual', this.filename)).toEqual(
        {
          bookTitles: ['Alice', 'Lord of the Rings', 'Rings'],
          allWords: ['alice', 'unusual'],
          words: {
            alice: [true, false, false],
            unusual: [false, true, true],
          }
        }
      );
    });
    it('should return false if searchKey is an empty string', () => {
      expect(index.searchIndex('', this.filename)).toBeFalsy();
    });
    it('should return false if nothing was found', () => {
      expect(index.searchAll('abcdefgh#', this.filename)).toBeFalsy();
    });
  });

  describe('SeachAll', () => {
    beforeAll(() => {
      index.createIndex(validFile, 'validFile.json');
    });

    it('should return an object containing the search results', () => {
      expect(typeof index.searchAll('alice').files).toEqual('object');
    });
    it('object should contain an array of files that contains the search key', () => {
      expect(index.searchAll('alice').files).toEqual(
        ['simpleValidFile.json', 'validFile.json']
        );
    });
    it('should return valid search results', () => {
      expect(index.searchAll('alice')[this.filename]).toEqual(
        {
          bookTitles: ['Alice', 'Lord of the Rings', 'Rings'],
          allWords: ['alice'],
          words: {
            alice: [true, false, false],
          }
        }
      );
    });
    it('should return false if nothing was found', () => {
      expect(index.searchAll('abcdefgh#')).toBeFalsy();
    });
  });

  describe('DeleteFile', () => {
    it('can successfully delete a file from the index', () => {
      expect(index.deleteFile(this.filename)).toBeTruthy();
      expect(index[this.filename]).toEqual(undefined);
      expect(index.files.indexOf(this.filename)).toBe(-1);
    });
    it('returns false if filename does not exist in the index', () => {
      expect(index.deleteFile('abcdef.json')).toBeFalsy();
    });
  });
});
