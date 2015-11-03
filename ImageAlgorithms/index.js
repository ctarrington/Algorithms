var Jimp = require("jimp");

function createContrast(threshold) {

    var contrast = function (x, y, idx) {
        var red = this.bitmap.data[idx];
        var green = this.bitmap.data[idx + 1];
        var blue = this.bitmap.data[idx + 2];
        var alpha = this.bitmap.data[idx + 3];

        var newValue = (red > threshold) ? 255 : red;
        this.bitmap.data[idx] = newValue;
        this.bitmap.data[idx + 1] = newValue;
        this.bitmap.data[idx + 2] = newValue;
    }

    return contrast;
}

Jimp.read("landscape.jpg", function (err, image) {
    if (err) throw err;

    image
        .greyscale()
        .scan(image.bitmap.width/4, image.bitmap.height/4, image.bitmap.width/2, image.bitmap.height/2, createContrast(128))
        .write("landscape-modified.jpg");
});