function reverse(word)
{
	var reversed = '';

	var last = word.length-1;
	for (var ctr = last; ctr >= 0; ctr--)
	{
		reversed += word.substring(ctr, ctr+1);
	}

	return reversed;
}

function reverseWords(sentence)
{
	var WHITESPACE = /\s+/;
	var reversed = '';

	var tokens = sentence.split(WHITESPACE);
	var last = tokens.length-1;
	for (var ctr = last; ctr >= 0; ctr--)
	{
		reversed += tokens[ctr]+' ';
	}

	return reversed.trim();
}

function stringToSet(raw)
{
	var cleansed = '';
	var found = {};

	for (var ctr=0; ctr<raw.length;ctr++)
	{
		var letter = raw.substring(ctr, ctr+1);
		if (!found[letter] || letter == ' ')
		{
			found[letter] = true;
			cleansed += letter;
		}
	}

	return cleansed;

}

function permutations(letters)
{
	var accumulator = {};

	if (letters.length == 1)
	{
		var a = [];
		a.push(letters);
		return a;
	}

	for (var ctr = 0; ctr < letters.length; ctr++)
	{
		var current = letters.substring(ctr, ctr+1);
		var others = letters.substring(0, ctr)+letters.substring(ctr+1, letters.length);	

		var otherPermutations = permutations(others);
		for (var octr = 0; octr<otherPermutations.length; octr++)
		{
			accumulator[current+otherPermutations[octr]] = true;
		}

	}

	return Object.keys(accumulator);
}

function duplicate(text, times)
{
	var result = '';
	for (var ctr=0;ctr<times;ctr++)
	{
		result += text;
	}

	return result;
}

function isExactCycle(letters)
{
	var maxCycleLength = Math.floor(letters.length /2);
	for (var propsedCycleLength = 1; propsedCycleLength <= maxCycleLength; propsedCycleLength++)
	{
		var propsedCycle = letters.substring(0, propsedCycleLength);
		var repeatCount = letters.length / propsedCycleLength;
		if (repeatCount != Math.floor(repeatCount)) { continue; }

		if (letters == duplicate(propsedCycle, repeatCount))
		{
			return true;
		}
	}
	return false;
}