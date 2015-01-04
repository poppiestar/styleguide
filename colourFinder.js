
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

        var data = fs.readFileSync(openFile, 'utf8');

        filenames.push({
            filename: openFile,
            lines: search.searchFile(data)
        });
    }
    console.log(JSON.stringify(filenames));
});

