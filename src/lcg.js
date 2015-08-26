// Linear congruential generator

var lcg = function(seed) {
    var M = power(2, 32);
    var a = 1664525;
    var c = 1013904223;
    var x = seed;

    return {
        next: function() {
            x = (a*x+c)%M;
            return x/M;
        }
    };

}