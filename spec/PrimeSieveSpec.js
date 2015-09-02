describe("A small Prime Sieve", function() {

    var smallSieve = createPrimeSieve(11);

    it("should know its contents", function () {
        var iterator = smallSieve.iterator();
        expect(iterator.next()).toEqual(2);
        expect(iterator.next()).toEqual(3);
        expect(iterator.next()).toEqual(5);
        expect(iterator.next()).toEqual(7);
        expect(iterator.next()).toEqual(11);
        expect(iterator.next()).toBe(null);
    });

    it("should know how many primes it has", function() {
        expect(smallSieve.count()).toEqual(5);
    });

    it("should know if a number is an element", function() {
        expect(smallSieve.contains(4)).toBe(false);
        expect(smallSieve.contains(5)).toBe(true);
    });

});

describe("A big Prime Sieve", function() {

    var bigSieve = createPrimeSieve(1000000);

    it("should know how many primes it has", function() {
        expect(bigSieve.count()).toEqual(78498);
    });

});