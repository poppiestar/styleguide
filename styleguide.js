
var fs = require('fs');

// open the sass file


function extractColours(block) {
    var pairs = [];
    var lines = block.split('\n');

    // only process actual lines
    for (var line in lines) {
        if (lines[line].trim() !== '') {
            var pair = lines[line].split(':');
            pairs.push({ variable: pair[0].trim(), value: pair[1].trim() });
        }
    }

    return pairs;
}

fs.readFile('sass/variables.scss', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    // split file up by thingies
    var sections = data.split('// ---------------------------------------------------\n');

    // remove empty rows
    for (var section in sections) {
        if (sections[section].trim() === '') {
            sections.splice(section, 1);
        }
    }

    var groups = [];
    var counter = -1;

    // create group objects
    for (section in sections) {
        if ( sections[section].substring(0, 2) === '//' ) {
            groups.push({ title: sections[section].substring(3).trim() });
            counter++;
        } else {
            groups[counter].body = extractColours(sections[section]);
        }
    }

    console.log(JSON.stringify(groups));
});

