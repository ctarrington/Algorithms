var Jimp = require("jimp");

function gsPointOperation(bitmap, operation, region)
{
    if (!region) { region = {x:0, y:0, width: bitmap.width, height: bitmap.height}; }

    for (var x = region.x; x < region.x+region.width; x++)
    {
        for (var y = region.y; y < region.y+region.height; y++)
        {
            var index_r = y*bitmap.width*4 + x*4;
            var red = bitmap.data[index_r];

            var newValue = operation(red);

            bitmap.data[index_r] = bitmap.data[index_r+1] = bitmap.data[index_r+2] = newValue;
        }
    }
}

function gsPointMeasurement(bitmap, measurement, region)
{
    if (!region) { region = {x:0, y:0, width: bitmap.width, height: bitmap.height}; }

    for (var x = region.x; x < region.x+region.width; x++)
    {
        for (var y = region.y; y < region.y+region.height; y++)
        {
            var index_r = y*bitmap.width*4 + x*4;
            var red = bitmap.data[index_r];

            measurement.process(red);
        }
    }

    return measurement.result();
}

function createExtremeFinder()
{
    var extremes = {min: 255, max: 0};

    var measurementFunction = {
        process: function(intensity) {
            extremes.min = Math.min(extremes.min, intensity);
            extremes.max = Math.max(extremes.max, intensity);
        },
        result: function() { return extremes; }
    };

    return measurementFunction;
}

function createGsLinearRescaleFunction(oldRange, newRange)
{
    var lrf = function (intensity) {
        intensity = Math.max(intensity, oldRange.min);
        intensity = Math.min(intensity, oldRange.max);

        var newValue = newRange.min+(newRange.max-newRange.min)*(intensity - oldRange.min)/(oldRange.max-oldRange.min);
        return newValue;
    }

    return lrf;
}

Jimp.read("landscape.jpg", function (err, image) {
    if (err) throw err;

    var bitmap = image.bitmap;
    var rightTwoThirds = {x: bitmap.width/3, y: 0, width: 2*bitmap.width/3, height: bitmap.height  };
    var rightOneThird = {x: 2*bitmap.width/3, y: 0, width: bitmap.width/3, height: bitmap.height  };

    var darken = createGsLinearRescaleFunction({min:0, max:255}, {min:0, max:30});
    image.greyscale();
    gsPointOperation(bitmap, darken, rightTwoThirds);

    var extremeFinder = createExtremeFinder();
    var extremes = gsPointMeasurement(bitmap, extremeFinder, rightOneThird);
    var lighten = createGsLinearRescaleFunction(extremes, {min:0, max:255});
    gsPointOperation(bitmap, lighten, rightOneThird);
    // will result in striations


    image.write("landscape-modified.png");
});