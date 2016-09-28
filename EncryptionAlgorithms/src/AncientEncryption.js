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

function compareByKeyLetter(a,b) {
    if (a.keyLetter > b.keyLetter) {
        return 1;
    }
    if (a.keyLetter < b.keyLetter) {
        return -1;
    }
    return 0;
}



function createColumnTranspositionCipher(key, padCharacter)
{
    var columnIndexes = [];
    var reverseColumnIndexes = [];

    function convertStringKeyToNumbers()
    {
        var columns = [];
        for (var col_ctr=0; col_ctr<key.length;col_ctr++)
        {
            columns.push({originalIndex: col_ctr, keyLetter: key.substring(col_ctr,col_ctr+1)});
        }

        columns.sort(compareByKeyLetter);

        var unique_values = {};
        for (var col_ctr=0; col_ctr<key.length;col_ctr++)
        {
            var originalIndex = columns[col_ctr].originalIndex;
            columnIndexes[col_ctr] = originalIndex;
            reverseColumnIndexes[originalIndex] = col_ctr;
        }
    }

    function transpose(original, indexes)
    {
        var columns = indexes.length;
        var rows = original.length / columns;

        var transposed = '';
        for (var row_ctr=0; row_ctr<rows;row_ctr++)
        {
            for (var col_ctr=0; col_ctr<columns; col_ctr++)
            {
                var index = row_ctr*columns+indexes[col_ctr];
                transposed = transposed + original.substring(index, index+1);
            }
        }

        return transposed;
    }

    function encrypt(plaintext)
    {
        plaintext = pad(plaintext, key.length, padCharacter);
        return transpose(plaintext, columnIndexes);
    }

    function decrypt(ciphertext)
    {
        return transpose(ciphertext, reverseColumnIndexes);
    }

    convertStringKeyToNumbers();
    console.log('key = '+key+', columnIndexes = '+columnIndexes.join(','));
    console.log('key = '+key+', reverseColumnIndexes = '+reverseColumnIndexes.join(','));

    return {
        encrypt: encrypt,
        decrypt: decrypt
    }
}