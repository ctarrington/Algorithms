describe("Row/Column Transposition Cipher", function() {

    it("should produce the correct ciphertext when full matrix", function () {
        var tc = createRowColumnTranspositionCipher(5, 'R');
        expect(tc.encrypt('THISISASECRETMESSAGE')).toEqual('TSRSHAESISTASEMGICEE');
    });

    it("should produce the correct plaintext when full matrix", function () {
        var tc = createRowColumnTranspositionCipher(5, 'R');
        expect(tc.decrypt('TSRSHAESISTASEMGICEE')).toEqual('THISISASECRETMESSAGE');
    });

    it("should produce the correct ciphertext when not full matrix", function () {
        var tc = createRowColumnTranspositionCipher(5, 'R');
        expect(tc.encrypt('THISISASECRETMESSA')).toEqual('TSRSHAESISTASEMRICER');
    });

    it("should produce the correct plaintext when not full matrix", function () {
        var tc = createRowColumnTranspositionCipher(5, 'R');
        expect(tc.decrypt('TSRSHAESISTASEMRICER')).toEqual('THISISASECRETMESSARR');
    });
});

describe("String key to numbers", function() {

    it("should produce the correct numbers when there are no repeats", function () {
        var numbers = convertStringKeyToNumbers('CARTS');
        expect(numbers.join(',')).toEqual('1,0,2,4,3');
    });

    it("should produce the correct numbers when perfectly ordered", function () {
        var numbers = convertStringKeyToNumbers('ABCDE');
        expect(numbers.join(',')).toEqual('0,1,2,3,4');
    });

    it("should produce the correct numbers when perfectly reverse ordered", function () {
        var numbers = convertStringKeyToNumbers('EDCBA');
        expect(numbers.join(',')).toEqual('4,3,2,1,0');
    });

    it("should produce null when there are repeats", function () {
        var numbers = convertStringKeyToNumbers('CARAS');
        expect(numbers).toBeNull();
    });

});

describe("Column Transposition Cipher", function() {

    var key = 'CARTS';

    it("should produce the correct ciphertext when full matrix", function () {
        var tc = createColumnTranspositionCipher(key, 'R');
        expect(tc.encrypt('THISISASECRETMESSAGE')).toEqual('HTIISASSCEERTEMSSAEG');
    });

    it("should produce the correct plaintext when full matrix", function () {
        var tc = createColumnTranspositionCipher(key, 'R');
        expect(tc.decrypt('HTIISASSCEERTEMSSAEG')).toEqual('THISISASECRETMESSAGE');
    });

    it("should produce the correct ciphertext when not full matrix", function () {
        var tc = createColumnTranspositionCipher(key, 'R');
        expect(tc.encrypt('THISISASECRETMESSA')).toEqual('HTIISASSCEERTEMSSARR');
    });

    it("should produce the correct plaintext when not full matrix", function () {
        var tc = createColumnTranspositionCipher(key, 'R');
        expect(tc.decrypt('HTIISASSCEERTEMSSARR')).toEqual('THISISASECRETMESSARR');
    });
});


