describe("Greatest Common Denominator", function() {

    it("should be able to find a gcd", function () {
        expect(gcd(12, 8)).toEqual(4);
    });

    it("should be able to find a gcd if it is one of the numbers", function () {
        expect(gcd(12, 4)).toEqual(4);
    });

    it("should return 1 if there is no usefull gcd", function () {
        expect(gcd(7, 3)).toEqual(1);
    });

    it("should return the number if a == b", function () {
        expect(gcd(7, 7)).toEqual(7);
    });

});

describe("Greatest Common Denominator with higher number last", function() {

    it("should be able to find a gcd", function () {
        expect(gcd(8, 12)).toEqual(4);
    });

    it("should be able to find a gcd if it is one of the numbers", function () {
        expect(gcd(4, 12)).toEqual(4);
    });

    it("should return 1 if there is no usefull gcd", function () {
        expect(gcd(3, 7)).toEqual(1);
    });

});