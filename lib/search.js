
function findColours(haystack) {
    var matches = haystack.match(/#[0-9A-F]{3,6}/ig);
    var colours = [];
    var needlePosition = 0;
    var stringPosition;

    for (var match in matches) {
        stringPosition = haystack.indexOf(matches[match], needlePosition);
        colours.push({ value: matches[match], position: stringPosition});
        needlePosition += matches[match].length;
    }

    return colours;
}

exports.findColours = findColours;

