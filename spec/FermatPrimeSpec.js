describe("A Fermat Prime Checker", function() {

    it("can tell if a small number is prime", function () {
        expect(isFermatPrime(11)).toBe(true);
    });

    it("can tell if a small number is not prime", function () {
        expect(isFermatPrime(9)).toBe(false);
    });

    it("can tell if a large number is prime", function () {
        var primes = [596861, 1299827, 14727029, 161506217, 22801761379];
        for (var ctr=0;ctr<primes.length;ctr++) {
            expect(isFermatPrime(primes[ctr])).toBe(true);
        }
    });

    it("can tell if a large number is not prime", function () {
        var nonprimes = [596859, 1299825, 14727021, 161506211, 22801761377];
        for (var ctr=0;ctr<nonprimes.length;ctr++) {
            expect(isFermatPrime(nonprimes[ctr])).toBe(false);
        }
    });



});