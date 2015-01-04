
// algorithm from http://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx
// and http://zoltanb.co.uk/how-to-calculate-the-perceived-brightness-of-a-colour/

function hexToRGB(hex) {
    // remove leading # character if supplied
    if ( hex.charAt(0) === '#' ) hex = hex.substring(1);

    // expand 3 character values
    if ( hex.length === 3 ) {
        hex = hex.charAt(0) + hex.charAt(0) + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2);
    }

    return {
        red: parseInt(hex.substring(0, 2), 16),
        green: parseInt(hex.substring(2, 4), 16),
        blue: parseInt(hex.substring(4, 6), 16)
    };
}

function colourWeight(hex) {
    var colour = hexToRGB(hex);

    return Math.round( Math.sqrt( (0.241 * colour.red * colour.red) +
                      (0.691 * colour.green * colour.green) +
                      (0.068 * colour.blue * colour.blue) ));
}

module.exports = {
    colourWeight: colourWeight,
    hexToRGB: hexToRGB
};

