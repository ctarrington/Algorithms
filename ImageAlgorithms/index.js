var Jimp = require("jimp");

function initializeArray(size, value)
{
    value = value || 0;
    var array = [];
    for (ctr=0; ctr<size; ctr++)
    {
        array[ctr] = value;
    }

    return array;
}

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
            newValue = Math.max(newValue, 0);
            newValue = Math.min(newValue, 255);

            bitmap.data[index_r] = bitmap.data[index_r+1] = bitmap.data[index_r+2] = newValue;
        }
    }
}

function createHistogram(bitmap, region)
{
    if (!region) { region = {x:0, y:0, width: bitmap.width, height: bitmap.height}; }

    var extremes = {min: 255, max: 0};
    var intensityFrequency = initializeArray(256,0);
    var cumulativeIntensityFrequency = initializeArray(256,0);
    var valueCount = 0;

    // total up the occurrences per intensity
    for (var x = region.x; x < region.x+region.width; x++)
    {
        for (var y = region.y; y < region.y+region.height; y++)
        {
            var index_r = y*bitmap.width*4 + x*4;
            var intensity = bitmap.data[index_r];

            extremes.min = Math.min(extremes.min, intensity);
            extremes.max = Math.max(extremes.max, intensity);

            intensityFrequency[intensity]++;
        }
    }

    // accumulate the cumulative occurrences
    cumulativeIntensityFrequency[0] = intensityFrequency[0];
    for (var ctr = 1; ctr<256; ctr++)
    {
        cumulativeIntensityFrequency[ctr] = cumulativeIntensityFrequency[ctr-1]+intensityFrequency[ctr];
    }

    // normalize
    var points = region.width*region.height;
    for (var ctr=0; ctr<256; ctr++)
    {
        intensityFrequency[ctr] = intensityFrequency[ctr]/points;
        cumulativeIntensityFrequency[ctr] = cumulativeIntensityFrequency[ctr]/points;
    }

    function intensityOfCumulativeFrequency(frequency) {
        var intensity = 0;

        while (intensity < 255)
        {
            if (cumulativeIntensityFrequency[intensity] >= frequency) { return intensity; }
            intensity++;
        }

        return intensity;
    }

    return {
        min: extremes.min,
        max: extremes.max,
        pdf: intensityFrequency,
        cdf: cumulativeIntensityFrequency,
        intensityOfCumulativeFrequency: intensityOfCumulativeFrequency
    };

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

function fillFromDistribution(bitmap, startX, height, distribution)
{
    var maxValue = 0;
    for (var intensity=0; intensity<256; intensity++)  { maxValue = Math.max(maxValue, distribution[intensity]); }
    var scale = height / maxValue;

    for (var intensity=0; intensity<256; intensity++)
    {
        var x = startX+intensity;
        var value = Math.ceil(distribution[intensity]*scale);
        for (var y=height-1; y>=height-value;y--)
        {
            var index_r = y*bitmap.width*4 + x*4;
            bitmap.data[index_r] = bitmap.data[index_r+1] = bitmap.data[index_r+2] = 0;
        }
    }
}

function gsFillImageFromHistogram(bitmap, histogram)
{
    fillFromDistribution(bitmap, 5,      256, histogram.pdf);
    fillFromDistribution(bitmap, 256+10, 256, histogram.cdf);
}

function jimpWriteHistogramToFile(histogram, filename)
{
    var histogramImage = new Jimp(256*2+15, 256, 0xFFFFFFFF);
    gsFillImageFromHistogram(histogramImage.bitmap, histogram);
    histogramImage.write(filename);
}

Jimp.read("landscape.jpg", function (err, image) {
    if (err) throw err;

    image.greyscale();
    var bitmap = image.bitmap;

    image.write("out/original.png");

    var histogramOfOriginal = createHistogram(bitmap);
    jimpWriteHistogramToFile(histogramOfOriginal, 'out/original-histogram.png');

    var darken = createGsLinearRescaleFunction({min:0, max:255}, {min:0, max:40});
    gsPointOperation(bitmap, darken);
    image.write("out/dark.png");


    var histogramOfDark = createHistogram(bitmap);
    jimpWriteHistogramToFile(histogramOfDark, 'out/dark-histogram.png');

    var leftStop = histogramOfDark.intensityOfCumulativeFrequency(0.001);
    var rightStop = histogramOfDark.intensityOfCumulativeFrequency(0.90);
    console.log('leftStop = '+leftStop+ ' rightStop = '+rightStop);

    var lighten = createGsLinearRescaleFunction({min: leftStop, max: rightStop}, {min:0, max:255});
    gsPointOperation(bitmap, lighten);
    image.write("out/lightened.png");


    var histogramOfLightened = createHistogram(bitmap);
    jimpWriteHistogramToFile(histogramOfLightened, 'out/lightened-histogram.png');

});

Jimp.read("landscape.jpg", function (err, image) {
    if (err) throw err;

    image.greyscale();
    var bitmap = image.bitmap;

    var inverted = function(intensity) { return 255-intensity; }
    gsPointOperation(bitmap, inverted);
    image.write("out/inverted.png");

    var histogramOfInverted = createHistogram(bitmap);
    jimpWriteHistogramToFile(histogramOfInverted, 'out/inverted-histogram.png');

});