// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

function createPrimeSieve(max) {

    var numberOfPrimes = 0;
    var numbers = [];

    function strikeMultiples(prime) {
        for (var ctr=prime*2;ctr<=max; ctr = ctr+prime) {
            numbers[ctr] = 0;
        }
    }

    // initialize odd numbers
    numbers[2] = 1;
    for (var ctr=3;ctr<=max;ctr=ctr+2)
    {
        numbers[ctr] = 1;
    }

    // strike out numbers up to sqrt(max)
    var last = Math.ceil(Math.sqrt(max)); // todo - floor ok?
    var done = false;
    ctr = 3;
    while (!done) {
        if (numbers[ctr] == 1) {
            strikeMultiples(ctr);
        }

        ctr++;
        done = (ctr > last);
    }

    // count the primes
    for (ctr=2;ctr<=max;ctr++) {
        if (numbers[ctr] == 1) { numberOfPrimes++; }
    }

    function createIterator() {
        var pointer = 2;

        return {
            next: function() {
                var current = pointer;

                pointer++;
                while (pointer <= max && numbers[pointer] !== 1) { pointer++; }

                return (numbers[current] == 1) ? current : null;
            }
        }
    }

    function count() { return numberOfPrimes; }

    function contains(value) { return (numbers[value] == 1); }

    return {
        iterator: createIterator,
        count: count,
        contains: contains
    }
}