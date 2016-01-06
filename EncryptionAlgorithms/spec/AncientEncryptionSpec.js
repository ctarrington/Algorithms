describe("TranspositionCipher", function() {

    it("should produce the correct ciphertext when full matrix", function () {
        var tc = createTranspositionCipher(5, 'R');
        expect(tc.encrypt('THISISASECRETMESSAGE')).toEqual('TSRSHAESISTASEMGICEE');
    });

    it("should produce the correct plaintext when full matrix", function () {
        var tc = createTranspositionCipher(5, 'R');
        expect(tc.decrypt('TSRSHAESISTASEMGICEE')).toEqual('THISISASECRETMESSAGE');
    });

    it("should produce the correct ciphertext when not full matrix", function () {
        var tc = createTranspositionCipher(5, 'R');
        expect(tc.encrypt('THISISASECRETMESSA')).toEqual('TSRSHAESISTASEMRICER');
    });

    it("should produce the correct plaintext when not full matrix", function () {
        var tc = createTranspositionCipher(5, 'R');
        expect(tc.decrypt('TSRSHAESISTASEMRICER')).toEqual('THISISASECRETMESSARR');
    });

});