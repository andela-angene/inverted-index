# Inverted Index
[![Build Status](https://api.travis-ci.org/andela-angene/inverted-index.svg?branch=develop)](https://travis-ci.org/andela-angene/inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-angene/inverted-index/badge.svg?branch=feature%2F1%2Fwrite-tests)](https://coveralls.io/github/andela-angene/inverted-index?branch=feature%2F1%2Fwrite-tests)
[![Code Climate](https://codeclimate.com/github/andela-angene/inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-angene/inverted-index)
## Introduction
Inverted index app takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words. 
## Why the project is useful
An inverted index allows the user to perform very fast text search
## Features
- Upload file(s)
- Create an index for uploaded file(s)
- Search through indexed files 
## Usage
You can access the app on [Heroku](http://tony-invertedindex-staging.herokuapp.com/), when the app starts:
- Click the 'Choose a file' button and select a valid json file
- Upon successful upload, click 'Create Index' to display the index(s) in a tabular format
- You can upload more files, click the file's name to view its index
- To perform a search, enter the word(s) you wish to search for in the input field separated by spaces
- By default, the app searches all indexed files but you can select a specific file to search in
- Click the search icon or hit enter to view search result
## Local Installation Guide
* Clone the repository
* Install dependencies using  `npm install`
* Run `node server.js` to start the application.
* Visit `http://localhost:5000/` to interact with the app
* Run tests with: `npm test`
## Technologies
* EcmaScript 6 (JavaScript 2015)
* Node.js
* Angular.js
* Gulp
## Contributing
* Fork this repository to your account.
* Clone your repository: git clone git@github.com:your-username/inverted-index.git
* Create your feature branch: git checkout -b new-feature
* Commit your changes: git commit -m "did something"
* Push to the remote branch: git push origin new-feature
* Open a pull request.
