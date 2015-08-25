describe("Power", function() {

    it("should be accurate for 7^1", function () {
        expect(power(7, 1)).toEqual(7);
    });

    it("should be accurate for 7^2", function () {
        expect(power(7, 2)).toEqual(49);
    });

    it("should be accurate for 7^5", function () {
        expect(power(7, 5)).toEqual(16807);
    });

    it("should be accurate for 7^8", function () {
        expect(power(7, 8)).toEqual(5764801);
    });

    it("should be accurate for 7^17", function () {
        expect(power(7, 17)).toEqual(232630513987207);
    });

});