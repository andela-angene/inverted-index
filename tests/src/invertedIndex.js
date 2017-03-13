class InvertedIndex {


    constructor() {
        this.database = {
            totalBooks: [],
            bookTitles: [],
            allWords: []
        }
    }

    static readFile(fileInput, database, resolve) {
        database = this.resetDatabase(database);
        let file = fileInput[0].files[0];
        if (file === undefined) return;
        const fileType = /json$/;
        const reader = new FileReader();
        let result;
        if (!file.type.match(fileType)) {
            $('#flash').html('Invalid file type.');
            return false;
        }
        $('#flash').html('');
        reader.readAsText(file);
        reader.onload = function () {
            try {
                result = JSON.parse(reader.result);
            } catch (err) {
                console.log('invalid JSON file');
                return;
            }

            if (InvertedIndex.validateFile(result)) {
                InvertedIndex.createIndex(result, database)
            } else {
                console.log('invalid file')
            }

            resolve(database);
        }
    }



    static validateFile(fileContent) {
        if (fileContent.constructor !== Array) return false;
        for (var i = 0; i < fileContent.length; i++) {
            var title = fileContent[i]['title'],
                text = fileContent[i]['text'];
            if (title === undefined || text === undefined) return false;
            if (text.length < 1) return false;
        }
        return true;
    }

    static tokenize(text) {
        return text.replace(/[^\w\s-]/g, '').split(/\s+/);
    }

    static createIndex(file, database) {
        for (let i = 0; i < file.length; i++) {
            database.totalBooks.push(i);
            database.bookTitles.push(file[i]['title']);
            let words = this.tokenize(file[i]['text']);
            database['book' + i] = {
                'title#': file[i]['title']
            };

            for (let j = 0; j < words.length; j++) {
                if (database.allWords.indexOf(words[j]) === -1) database.allWords.push(words[j]);
                database['book' + i][words[j]] = true;
            }
        }
        return database
    }

    static resetDatabase(database){
        database = {};
        database = {
            totalBooks: [],
            bookTitles: [],
            allWords: []
        }
        return database;
    }

}

module.exports = InvertedIndex;