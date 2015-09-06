describe("Linear congruential generator", function() {


    it("should be able to produce a 100 numbers in [0,1) ", function () {
        var randomSequence = lcg(1234567);

        for (var ctr=0;ctr<100;ctr++) {
            var value = randomSequence.next();
            console.log(value);
            expect(value >= 0).toBe(true);
            expect(value < 1).toBe(true);
        }
    });

    it("should be able to produce a 100 numbers in [10,20) ", function () {
        var randomSequence = lcg(1234567);

        for (var ctr=0;ctr<100;ctr++) {
            var value = randomSequence.nextInInterval(10, 20);
            console.log(value);
            expect(value >= 10).toBe(true);
            expect(value < 20).toBe(true);
        }
    });

    it("should be able to produce a 100 numbers in [1.1,1.5) ", function () {
        var randomSequence = lcg(1234567);

        for (var ctr=0;ctr<100;ctr++) {
            var value = randomSequence.nextInInterval(1.1, 1.5);
            console.log(value);
            expect(value >= 1.1).toBe(true);
            expect(value < 1.5).toBe(true);
        }
    });

    it("should be able to produce a 100 numbers in [-2, -1) ", function () {
        var randomSequence = lcg(1234567);

        for (var ctr=0;ctr<100;ctr++) {
            var value = randomSequence.nextInInterval(-2, -1);
            console.log(value);
            expect(value >= -2).toBe(true);
            expect(value < -1).toBe(true);
        }
    });

});