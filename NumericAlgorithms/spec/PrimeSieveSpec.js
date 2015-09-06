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

    it("should provide independent iterators", function () {
        var it1 = smallSieve.iterator();
        expect(it1.next()).toEqual(2);
        expect(it1.next()).toEqual(3);
        var it2 = smallSieve.iterator();
        expect(it1.next()).toEqual(5);
        expect(it2.next()).toEqual(2);
        expect(it2.next()).toEqual(3);
        expect(it1.next()).toEqual(7);
        expect(it2.next()).toEqual(5);
        expect(it1.next()).toEqual(11);
        expect(it2.next()).toEqual(7);
        expect(it1.next()).toBe(null);
        expect(it2.next()).toEqual(11);
        expect(it2.next()).toEqual(null);
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

    it("should know if a number is an element", function() {
        expect(bigSieve.contains(4)).toBe(false);
        expect(bigSieve.contains(5)).toBe(true);
    });

});