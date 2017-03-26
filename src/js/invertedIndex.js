/**
 * InvertedIndex class
 * @class
 */
class InvertedIndex {
  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.files = [];
  }

   /**
   * Validate file content
   * @function
   * @param {Array} fileContent content of uploaded file
   * @return {Array} valid fileContent or false if invalid file
   */
  static validateFile(fileContent) {

  }

  /**
   * Remove invalid characters
   * @function
   * @param {String} text text from the book
   * @return {Array} An array of unique words in the text
   */
  static tokenize(text) {

  }

  /**
   * Creates an index object from the file content and stores it
   * @function
   * @param {Array} fileContent content of uploaded file
   * @param {String} filename name of uploaded file
   * @return {boolean} true if file index was successfully created, else false
   */
  static createIndex(fileContent, filename) {

  }

  /**
   * Returns stored index given a filename
   * @function
   * @param {Object} filename filen
   * @return {Array} Current indexed object (used by angular to display the content
   */
  static getIndex(filename) {

  }

  /**
   * Search index
   * @function
   * @param {String} searchKey string containing word(s) to be searched for
   * @param {Object} filename name of indexed file where the search will be performed
   * @return {Object} search result or false if nothing was found
   */
  static searchIndex(searchKey, filename) {

  }

  /**
   * Search All
   * @function
   * @param {String} searchKey string containing word(s) to be searched for
   * @return {Object} search result or false if nothing was found
   */
  static searchAll(searchKey) {

  }

  /**
   * Delete file from the index
   * @function
   * @param {String} filename name of file to be deleted
   * @return {boolean} true if file was successfully deleted, else false
   */
  static deleteFile(filename) {

  }
}
