function bigPower(value, exponent) {

    // find powers up to exponent
    var power = bigInt(1);
    var last = value;
    var poweredValues = {};
    poweredValues["1"] = value;

    while (power.times(2).lesserOrEquals(exponent)) {
        power = power.times(2);
        last = poweredValues[power.toString()] = last.times(last);
    }

    // use the powers as needed
    var total = bigInt(1);
    while (exponent.gt(0)) {

        if (exponent.minus(power).greaterOrEquals(0)) {
            total = total.times(poweredValues[power.toString()]);
            exponent = exponent.minus(power);
        }

        power = power.divide(2);
    }

    return total;

}