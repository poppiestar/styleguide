var search = require('./lib/search');

var results = search.findColours('#fff #000 #d04266');

console.log(results);

/*
needlePosition = 0;

haystack = "#f00 #f00";
colour = "#f00";

// get position of first colour from the needlePosition
stringPos = haystack.indexOf(colour, needlePosition);
colours.push({ position: stringPos });

// move needlePosition on to skip last match
needlePosition += colour.length;

// do it again

*/
