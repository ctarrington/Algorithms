function power(value, exponent) {

    // find powers up to exponent
    var power = 1;
    var last = value;
    var poweredValues = {};
    poweredValues[1] = value;

    while (power*2 <= exponent) {
        power = power*2;
        last = poweredValues[power] = last*last;
    }

    // use the powers as needed
    var total = 1;
    while (exponent > 0) {

        if (exponent-power >= 0) {
            total = total*poweredValues[power];
            exponent = exponent - power;
        }

        power = power/2;
    }

    return total;

}