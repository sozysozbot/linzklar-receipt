function toDigitsLinzklar(num) {

  function toDigits(num) {
    if (num % 1 !== 0) {
      throw new Error("non-integer");
    } else if (num >= 2 * 100 * 100) {
      const lastMyriadArr =
        num % 10000 === 0 ? [] : toDigits(num % 10000);
      return [...toDigits(Math.floor(num / 100)), "万", ...lastMyriadArr];
    } else if (num >= 100 * 100) {
      const lastMyriadArr = num % 10000 === 0 ? [] : toDigits(num % 10000);
      return ["万", ...lastMyriadArr];
    } else if (num >= 200) {
      const lastHundredArr =
        num % 100 === 0 ? [] : toDigitsSub(num % 100);
      return [...toDigitsSub(Math.floor(num / 100)), "百", ...lastHundredArr];
    } else if (num >= 100) {
      const lastHundredArr = num % 100 === 0 ? [] : toDigits(num % 100);
      return ["百", ...lastHundredArr];
    } else if (num < 0) {
      return ["下", ...toDigits(-num)];
    } else if (num == 0) {
      return ["無"];
    }

    const lastDigitArr =
      num % 10 === 0 ? [] : ["無一二三四五六七八九"[num % 10]];
    if (num >= 20) {
      return ["無一二三四五六七八九"[Math.floor(num / 10)], "十", ...lastDigitArr];
    } else if (num >= 10) {
      return ["十", ...lastDigitArr];
    } else {
      return lastDigitArr;
    }
  }

  // -6848 should be 下六八百四八, not 下六十八百四十八. This function thus converts 68 to 六八, not 六十八.
  function toDigitsSub(num) {
    if (num % 1 !== 0) {
      throw new Error("non-integer");
    } else if (num >= 100) {
      throw new Error("100 or more detected in toDigitsSub");
    } else if (num <= 0) {
      throw new Error("0 or less detected in toDigitsSub");
    }

    if (num % 10 === 0) {
      if (num >= 20) {
        return ["無一二三四五六七八九"[Math.floor(num / 10)], "十"];
      } else if (num == 10) {
        return ["十"];
      } else {
        throw new Error("cannot happen");
      }
    } else {
      const lastDigit = "無一二三四五六七八九"[num % 10];
      if (num >= 20) {
        return ["無一二三四五六七八九"[Math.floor(num / 10)], lastDigit];
      } else if (num >= 10) {
        return ["十", lastDigit];
      } else {
        return [lastDigit];
      }
    }
  }


  return toDigits(num).join("");
}

