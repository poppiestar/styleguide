
// open all files and find all occurrences of a hex value

var glob = require('glob');
var fs = require('fs');

glob('sass/**/*.scss', function (err, files) {
    if (err) {
        return console.log(err);
    }

    console.log(files);

    // open each file and look for colour hex values

});

// sort all the colours 
