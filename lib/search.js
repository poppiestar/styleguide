
function searchFile(haystack) {
    var searchLines = haystack.split('\n');
    var foundLines = [];
    var currentLine, lastLine, matches;

    for (currentLine=0, lastLine=searchLines.length; currentLine < lastLine; currentLine++ ) {
        matches = findColours(searchLines[currentLine]);

        if (matches.length > 0) {
            foundLines.push({
                line: currentLine + 1,
                colours: matches
            });
        }
    }

    return foundLines;
}

function findColours(haystack) {
    var matches = haystack.match(/#[0-9A-F]{3,6}/ig);
    var colours = [];
    var needlePosition = 0;
    var stringPosition;

    for (var match in matches) {
        stringPosition = haystack.indexOf(matches[match], needlePosition);
        colours.push({
            value: matches[match],
            position: stringPosition
        });
        needlePosition += matches[match].length;
    }

    return colours;
}

module.exports = {
    findColours: findColours,
    searchFile: searchFile
};

