// Linear congruential generator

var lcg = function(seed) {
    var M = power(2, 32);
    var a = 1664525;
    var c = 1013904223;
    var x = seed;

    function next() {
        x = (a*x+c)%M;
        return x/M;
    }

    function nextInInterval(min, max) {
        return min + (max-min)*next();
    }

    return {
        next: next,
        nextInInterval: nextInInterval
    };

}