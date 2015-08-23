describe("Reverse", function() {
  
  it("should be able to reverse a word", function() {    
    expect(reverse('cat')).toEqual('tac');
  });

  it("should be able to reverse a one character word", function() {    
    expect(reverse('c')).toEqual('c');
  });

  
});

describe("Reverse words", function() {
  
  it("should be able to reverse words in a sentence", function() {    
    expect(reverseWords('The cat ate the mouse')).toEqual('mouse the ate cat The');
  });

  it("should leave a one word sentence alone", function() {    
    expect(reverseWords('cat')).toEqual('cat');
  });

  it("should ignore extra spaces", function() {    
    expect(reverseWords('The   cat   ate  the mouse')).toEqual('mouse the ate cat The');
  });
  
});

describe("Remove duplicate letters from a string", function() {

  it("should remove all duplicates but whimsically preserve spaces", function() {
    expect(stringToSet('hello how are you')).toEqual('helo w ar yu');
  });

  it("should be fine with no duplicates", function() {
    expect(stringToSet('yo hi sup')).toEqual('yo hi sup');
  });

});

describe("String Permutations", function() {

  it("should be correct without repeat letters", function() {
    expect(permutations('ab').length).toEqual(2);
    expect(permutations('ab')).toContain('ab');
    expect(permutations('ab')).toContain('ba');

    expect(permutations('abc').length).toEqual(6);
    expect(permutations('abc')).toContain('abc');
    expect(permutations('abc')).toContain('acb');
    expect(permutations('abc')).toContain('cab');
    expect(permutations('abc')).toContain('bac');
    expect(permutations('abc')).toContain('acb');
    expect(permutations('abc')).toContain('cba');

    expect(permutations('abcde').length).toEqual(120);   // 5!
  });

  it("should be correct with repeat letters", function() {
    expect(permutations('aab').length).toEqual(3);
    expect(permutations('aab')).toContain('aab');
    expect(permutations('aab')).toContain('aba');
    expect(permutations('aab')).toContain('baa');

    expect(permutations('abbccc').length).toEqual(60); // 6! / ( 2!*3! )
  });

  it("should be fine with no Permutations", function() {
      expect(permutations('a').length).toEqual(1);
      expect(permutations('aa').length).toEqual(1);
  });

});

describe("duplicate", function() {
  it("should be duplicated", function() {
    expect(duplicate('a', 1)).toEqual('a');
    expect(duplicate('a', 2)).toEqual('aa');
    expect(duplicate('abc', 2)).toEqual('abcabc');
  });
});

describe("Exact cycles in a string", function() {
  it("match simple cycles", function() {
    expect(isExactCycle('aa')).toBe(true);
    expect(isExactCycle('abab')).toBe(true);
    expect(isExactCycle('aabbaabb')).toBe(true);
    expect(isExactCycle('aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzzaabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz')).toBe(true);
  });

  it("detect broken cycles", function() {
    expect(isExactCycle('a')).toBe(false);
    expect(isExactCycle('ab')).toBe(false);
    expect(isExactCycle('ababa')).toBe(false);
    expect(isExactCycle('aabbaabc')).toBe(false);
  });
});
