var Jimp = require("jimp");

// linear rescale
// scale down and back up results in artifacts
function createLinearRescaleFunctions(newMin, newMax)
{
    var extremes = { min: 255, max: 0 };

    var measure = function(x, y, idx) {
        var red = this.bitmap.data[idx];

        extremes.min = Math.min(extremes.min, red);
        extremes.max = Math.max(extremes.max, red);
    }

    var rescale = function (x, y, idx) {
        var red = this.bitmap.data[idx];


        var newValue = newMin+(newMax-newMin)*(red - extremes.min)/(extremes.max-extremes.min);
        this.bitmap.data[idx] = newValue;
        this.bitmap.data[idx + 1] = newValue;
        this.bitmap.data[idx + 2] = newValue;
    }

    return {measure: measure, rescale: rescale};
}

function removeBlue(x, y, idx)
{
    var red = this.bitmap.data[idx];
    var green = this.bitmap.data[idx + 1];
    var blue = this.bitmap.data[idx + 2];

    if (blue > 150 && blue > red && blue > green)
    {
        this.bitmap.data[idx + 3] = 0;
    }
}

Jimp.read("landscape.jpg", function (err, image) {
    if (err) throw err;

    var rescaleDownFunctions = createLinearRescaleFunctions(0, 25);
    var rescaleUpFunctions = createLinearRescaleFunctions(0, 255);

    image
        .greyscale()
        .scan(1*image.bitmap.width/3, 0, 2*image.bitmap.width/3, image.bitmap.height, rescaleDownFunctions.measure)
        .scan(1*image.bitmap.width/3, 0, 2*image.bitmap.width/3, image.bitmap.height, rescaleDownFunctions.rescale)
        .scan(2*image.bitmap.width/3, 0, 1*image.bitmap.width/3, image.bitmap.height, rescaleUpFunctions.measure)
        .scan(2*image.bitmap.width/3, 0, 1*image.bitmap.width/3, image.bitmap.height, rescaleUpFunctions.rescale)
        .write("landscape-modified.png");
});