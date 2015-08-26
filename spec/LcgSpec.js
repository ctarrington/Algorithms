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

});