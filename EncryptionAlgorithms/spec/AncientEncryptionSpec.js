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

describe("Column Transposition Cipher with CARTS key", function() {

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

describe("Column Transposition Cipher with different keys", function() {

    it("should do nothing when the key is alphabetical and there is a full matrix", function () {
        var tc = createColumnTranspositionCipher('ABCDE', 'R');
        expect(tc.encrypt('THISISASECRETMESSAGE')).toEqual('THISISASECRETMESSAGE');
    });

    it("should reverse when the key is reverse alphabetical and there is a full matrix", function () {
        var tc = createColumnTranspositionCipher('EDCBA', 'R');
        expect(tc.encrypt('THISISASECRETMESSAGE')).toEqual('ISIHTCESASEMTEREGASS');
    });
});

describe("Column Transposition Cipher with HOPIS key", function() {

    var key = 'HOPIS';

    it("should produce the correct ciphertext when full matrix", function () {
        var tc = createColumnTranspositionCipher(key, 'R');
        expect(tc.encrypt('THISISASECRETMESSAGE')).toEqual('TSHIISEASCRMETESGSAE');
    });

    it("should produce the correct plaintext when full matrix", function () {
        var tc = createColumnTranspositionCipher(key, 'R');
        expect(tc.decrypt('TSHIISEASCRMETESGSAE')).toEqual('THISISASECRETMESSAGE');
    });
});

describe("Column Transposition Cipher with BEACD key - all columns move", function() {

    var key = 'BEACD';

    it("should produce the correct ciphertext when full matrix", function () {
        var tc = createColumnTranspositionCipher(key, 'R');
        expect(tc.encrypt('THISISASECRETMESSAGE')).toEqual('ITSIHSSECATRMEEASGES');
    });

    it("should produce the correct plaintext when full matrix", function () {
        var tc = createColumnTranspositionCipher(key, 'R');
        expect(tc.decrypt('ITSIHSSECATRMEEASGES')).toEqual('THISISASECRETMESSAGE');
    });
});




