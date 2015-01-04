
// open all files and find all occurrences of a hex value

var glob = require('glob');
var fs = require('fs');
var search = require('./lib/search');

var filenames = [];

glob('sass/**/*.scss', function (err, files) {
    if (err) {
        return console.log(err);
    }

    // open each file and look for colour hex values
    for (var file in files) {
        var openFile = files[file];

        fs.readFile(openFile, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            filenames.push({
                filename: openFile,
                lines: search.searchFile(data)
            });
        });
    }
});

