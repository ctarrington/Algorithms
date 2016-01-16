function pad(text, blockLength, padCharacter)
{
    var paddedText = text;

    var hanging = text.length%blockLength;
    if (hanging > 0) {
        var padLength = blockLength-hanging;
        for (var pad_ctr=0; pad_ctr<padLength;pad_ctr++)
        {
            paddedText = paddedText+padCharacter;
        }
    }

    return paddedText;
}

/*
 * Row / Column Transposition Cipher from:
 * https://www.safaribooksonline.com/library/view/essential-algorithms-a/9781118612101/24_chapter16.html
 */
function createRowColumnTranspositionCipher(cipherColumns, padCharacter)
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

    function encrypt(plaintext)
    {
        plaintext = pad(plaintext, cipherColumns, padCharacter);
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

function convertStringKeyToNumbers(keyString)
{
    var columns = [];
    for (var col_ctr=0; col_ctr<keyString.length;col_ctr++)
    {
        columns.push({originalIndex: col_ctr, keyLetter: keyString.substring(col_ctr,col_ctr+1)});
    }

    columns.sort(function compare(a,b) {
        if (a.keyLetter > b.keyLetter) {
            return 1;
        }
        if (a.keyLetter < b.keyLetter) {
            return -1;
        }
        return 0;
    });

    var ordering = [];
    var unique_values = {};
    for (var col_ctr=0; col_ctr<keyString.length;col_ctr++)
    {
        var originalIndex = columns[col_ctr].originalIndex;
        ordering.push(originalIndex);

        var originalValue = columns[col_ctr].keyLetter;
        unique_values[originalValue] = 1;
    }

    if (Object.keys(unique_values).length === keyString.length) { return ordering; }

    return null;
}

function createColumnTranspositionCipher(key, padCharacter)
{
    function encrypt(plaintext)
    {
        plaintext = pad(plaintext, key.length, padCharacter);
        var columnIndexes = convertStringKeyToNumbers(key);

        var columns = key.length;
        var rows = plaintext.length / columns;

        var encrypted = '';
        for (var row_ctr=0; row_ctr<rows;row_ctr++)
        {
            for (var col_ctr=0; col_ctr<columns; col_ctr++)
            {
                var index = row_ctr*columns+columnIndexes[col_ctr];
                encrypted = encrypted + plaintext.substring(index, index+1);
            }
        }

        return encrypted;
    }

    function decrypt(plaintext)
    {
        plaintext = pad(plaintext, key.length, padCharacter);
        var columnIndexes = convertStringKeyToNumbers(key);

        var columns = key.length;
        var rows = plaintext.length / columns;

        var encrypted = '';
        for (var row_ctr=0; row_ctr<rows;row_ctr++)
        {
            for (var col_ctr=0; col_ctr<columns; col_ctr++)
            {
                var index = row_ctr*columns+columnIndexes[col_ctr];
                encrypted = encrypted + plaintext.substring(index, index+1);
            }
        }

        return encrypted;
    }

    return {
        encrypt: encrypt,
        decrypt: decrypt
    }
}