// Euclidean algorithm
// https://www.cs.sfu.ca/~ggbaker/zju/math/int-alg.html#euclidean
function gcd(a, b) {

    while (b != 0) {
        var oldB = b;
        b = a % b;
        a = oldB;
    }
    return a;
}