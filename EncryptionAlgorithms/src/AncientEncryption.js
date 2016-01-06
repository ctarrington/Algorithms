function createTranspositionCipher(cipherColumns, padCharacter)
{

    function transpose(text, rows, columns)
    {
        var transposed = '';
        for (var col_ctr=0; col_ctr<columns; col_ctr++)
        {
            for (var row_ctr=0; row_ctr<rows; row_ctr++)
            {
                var index = row_ctr*columns + col_ctr;
                transposed = transposed + text.substring(index, index+1);
            }
        }

        return transposed;
    }

    function encrypt(plaintext, pad)
    {
        var hanging = plaintext.length%cipherColumns;
        if (hanging > 0) {
            var pad = cipherColumns-hanging;
            for (var pad_ctr=0; pad_ctr<pad;pad_ctr++)
            {
                plaintext = plaintext+padCharacter;
            }
        }
        var columns = cipherColumns;
        var rows = plaintext.length / cipherColumns;
        return transpose(plaintext, rows, columns);
    }

    function decrypt(ciphertext)
    {
        var rows = cipherColumns;
        var columns =  ciphertext.length / rows;
        return transpose(ciphertext, rows, columns);
    }

    return {
        encrypt: encrypt,
        decrypt: decrypt
    }

}