function isFermatPrime(candidate) {

    // if p is prime and 1 ≤ n ≤ p, n^(p−1) Mod p = 1
    // if any n yields anything else then p is definitively not prime
    // you can't really prove that p is prime
    // but the odds of a false positive is 1/2^samples

    var SAMPLES = 20;

    console.log('\ncandidate = '+candidate);
    for (var ctr = 0; ctr<SAMPLES; ctr++) {
        var n = Math.floor(Math.random()*(candidate-1))+1;
        var bigValue = bigInt(n).modPow(candidate-1, candidate);
        var value = bigValue.valueOf();

        console.log('n = '+n+' value = '+value);
        if (value != 1) { return false; }
    }

    return true;
}