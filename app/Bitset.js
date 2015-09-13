//Matt Krick, matt.krick@gmail.com, MIT

//each bin holds bits 0 - 30, totaling 31 (sign takes up last bit)
var BITS_PER_INT = 31;
//used for ffs of a word in O(1) time. LUTs get a bad wrap, they are fast.
var multiplyDeBruijnBitPosition = [0, 1, 28, 2, 29, 14, 24, 3, 30, 22, 20, 15, 25, 17, 4, 8,
  31, 27, 13, 23, 21, 19, 16, 7, 26, 12, 18, 6, 11, 5, 10, 9];

/**
 *
 * All bitsets used as arguments must have the same wordCount as the calling bitset. No error checking is provided
 * @param {number|string} nBitsOrKey: number of bits in the set. Cannot be increased (that would be slow)
 * or a dehydrated bitset in the from of a key
 * @constructor
 */
BitSet = function (nBitsOrKey) {
  if (typeof nBitsOrKey === 'number') {
    nBitsOrKey = nBitsOrKey || BITS_PER_INT; //default to 1 word
    var wordCount = Math.ceil(nBitsOrKey / BITS_PER_INT);
    this.arr = new Uint32Array(wordCount);
    this.MAX_BIT = nBitsOrKey - 1;
  } else {
    var arrVals = JSON.parse("[" + nBitsOrKey + "]");
    this.MAX_BIT = arrVals.pop();
    this.arr = new Uint32Array(arrVals);
  }
};

/**
 *
 * Returns the least signifcant bit, or 0 if none set, so a prior check to see if the word > 0 is required
 * @param {number} word: the current array
 * @returns {number} the index of the least significant bit in the current array
 * @private
 *
 */
function _lsb(word) {
  return multiplyDeBruijnBitPosition[(((word & -word) * 0x077CB531)) >>> 27];
}

/**
 * Returns the least signifcant bit, or 0 if none set, so a prior check to see if the word > 0 is required
 * @param word: the current array
 * @returns {number} the index of the most significant bit in the current array
 * @private
 */
function _msb(word) {
  word |= word >> 1;
  word |= word >> 2;
  word |= word >> 4;
  word |= word >> 8;
  word |= word >> 16;
  word = (word >> 1) + 1;
  return multiplyDeBruijnBitPosition[(word * 0x077CB531) >>> 27];
}

/**
 * Find first set
 * @param {number} _startWord: the word to start with (only used internally by nextSetBit)
 * @returns {number} the index of the first set bit in the bitset
 */
BitSet.prototype.ffs = function (_startWord) {
  var setVal, i, fs = -1;
  _startWord = _startWord || 0;
  for (i = _startWord; i < this.arr.length; i++) {
    setVal = this.arr[i];
    if (setVal === 0) continue;
    fs = _lsb(setVal) + i * BITS_PER_INT;
    break;
  }
  return fs;
};

/**
 * Find first zero
 * @param {number} _startWord: the word to start with (only used internally by nextUnsetBit)
 * @returns {number} the index of the first unset bit in the bitset, or -1 if not found
 */
BitSet.prototype.ffz = function (_startWord) {
  var i, setVal, fz = -1;
  _startWord = _startWord || 0;
  for (i = _startWord; i < this.arr.length; i++) {
    setVal = this.arr[i];
    if (setVal === 0x7fffffff) continue;
    setVal ^= 0x7fffffff;
    fz = _lsb(setVal) + i * BITS_PER_INT;
    break;
  }
  return fz;
};

/**
 *
 * Find last set bit
 * @param {number} _startWord: the word to start with (only used internally by previousSetBit)
 * @returns {number} the index of the last set bit in the bitset, or -1 if not found
 */
BitSet.prototype.fls = function (_startWord) {
  var i, setVal, ls = -1;
  if (_startWord === undefined) _startWord = this.arr.length - 1;
  for (i = _startWord; i >= 0; i--) {
    setVal = this.arr[i];
    if (setVal === 0) continue;
    ls = _msb(setVal) + i * BITS_PER_INT;
    break;
  }
  return ls;
};

/**
 *
 * Find last zero
 * @param {number} _startWord: the word to start with (only used internally by previousUnsetBit)
 * @returns {number} the index of the last unset bit in the bitset, or -1 if not found
 */
BitSet.prototype.flz = function (_startWord) {
  var i, setVal, ls = -1;
  if (_startWord === undefined) _startWord = this.arr.length - 1;
  for (i = _startWord; i >= 0; i--) {
    setVal = this.arr[i];
    if (i === this.arr.length - 1) {
      var wordIdx = this.MAX_BIT % BITS_PER_INT;
      var unusedBitCount = BITS_PER_INT - wordIdx - 1;
      setVal |= ((1 << unusedBitCount) - 1) << (wordIdx + 1);
    }
    if (setVal === 0x7fffffff) continue;
    setVal ^= 0x7fffffff;
    ls = _msb(setVal) + i * BITS_PER_INT;
    break;
  }
  return ls;
};
/**
 *
 * @param {BitSet} bs
 * @returns {BitSet} a new bitset that is the bitwise AND of the two
 * Both bitsets must have the same number of words, no length check is performed to prevent and overflow
 */
BitSet.prototype.and = function (bs) {
  var i, arr1, arr2, len, newBS;
  arr1 = this.arr;
  arr2 = bs.arr;
  len = arr1.length;
  newBS = new BitSet(this.MAX_BIT + 1);
  var newArr = newBS.arr;
  for (i = 0; i < len; i++) {
    newArr[i] = arr1[i] & arr2[i];
  }
  return newBS;
};

/**
 *
 * @param {BitSet} bs
 * @returns {BitSet} a new bitset that is the bitwise OR of the two
 * Both bitsets must have the same number of words, no length check is performed to prevent and overflow
 */
BitSet.prototype.or = function (bs) {
  var i, arr1, arr2, len, newBS;
  arr1 = this.arr;
  arr2 = bs.arr;
  len = arr1.length;
  newBS = new BitSet(this.MAX_BIT + 1);
  var newArr = newBS.arr;
  for (i = 0; i < len; i++) {
    newArr[i] = arr1[i] | arr2[i];
  }
  return newBS;
};

/**
 *
 * @param {BitSet} bs
 * @returns {BitSet} a new bitset that is the bitwise XOR of the two
 * Both bitsets must have the same number of words, no length check is performed to prevent and overflow
 */
BitSet.prototype.xor = function (bs) {
  var i, arr1, arr2, len, newBS;
  arr1 = this.arr;
  arr2 = bs.arr;
  len = arr1.length;
  newBS = new BitSet(this.MAX_BIT + 1);
  var newArr = newBS.arr;
  for (i = 0; i < len; i++) {
    newArr[i] = arr1[i] ^ arr2[i];
  }
  return newBS;
};

/**
 *
 * @returns {boolean} true if the entire bitset is empty, else false
 */
BitSet.prototype.isEmpty = function () {
  var i, arr;
  arr = this.arr;
  for (i = 0; i < arr.length; i++) {
    if (arr[i]) {
      return false;
    }
  }
  return true;
};

/**
 *
 * @param {BitSet} bs
 * @returns {boolean} true if the entire bitset is empty, else false
 * Both bitsets must have the same number of words, no length check is performed to prevent and overflow
 */
BitSet.prototype.isEqual = function (bs) {
  var i;
  for (i = 0; i < this.arr.length; i++) {
    if (this.arr[i] !== bs.arr[i]) {
      return false;
    }
  }
  return true;
};

/**
 *
 * @returns {string} a base 2 representation of the entire bitset (useful for debugging)
 */
BitSet.prototype.toString = function () {
  var i, str, fullString = '';
  for (i = this.arr.length - 1; i >= 0; i--) {
    str = this.arr[i].toString(2);
    fullString += ('0000000000000000000000000000000' + str).slice(-BITS_PER_INT);
  }
  return fullString;
};

/**
 *
 * Turn the word array into a comma separated string that skips trailing 0 words and that ends with the MAX_BIT
 * @returns {string} representation of the bitset that can be used as a key in an object
 */
BitSet.prototype.dehydrate = function () {
  var i, lastUsedWord, s = '';
  for (i = this.arr.length -1; i >= 0; i--) {
    if (i !== 0) {
      lastUsedWord = i;
      break;
    }
  }
  for (i = 0; i <= lastUsedWord; i++) {
    var curVal = this.arr[i];
    s += (curVal + ',');
  }
  s += this.MAX_BIT;
  return s;
};

/**
 *
 * @param {number} idx: position of bit in bitset
 * @returns {number} the word where the index is located
 * @private
 */
BitSet.prototype._getWord = function (idx) {
  if (idx < 0 || idx > this.MAX_BIT) {
    throw ('Index outside of range');
  }
  return ~~(idx / BITS_PER_INT);
};

/**
 *
 * @param {number} idx: the position of a single bit to set
 * @returns {boolean} true
 */
BitSet.prototype.set = function (idx) {
  var word = this._getWord(idx);
  this.arr[word] |= 1 << (idx % BITS_PER_INT);
  return true;
};

/**
 *
 * @param {number} idx: the position of a single bit to unset
 * @returns {boolean} true
 */
BitSet.prototype.unset = function (idx) {
  var word = this._getWord(idx);
  this.arr[word] &= ~(1 << (idx % BITS_PER_INT));
  return true;
};

/**
 *
 * @param {number} idx: the position of a single bit to toggle
 * @returns {boolean} true
 */
BitSet.prototype.toggle = function (idx) {
  var word = this._getWord(idx);
  this.arr[word] ^= (1 << (idx % BITS_PER_INT));
  return true;
};

/**
 *
 * @param {number} idx: the position of a single bit to check
 * @returns {boolean} true if bit is set, else false
 */
BitSet.prototype.get = function (idx) {
  var word = this._getWord(idx);
  return ((this.arr[word] >> (idx % BITS_PER_INT)) & 1) === 1;
};

/**
 *
 * @param {number} from: the starting index of the range to set
 * @param {number} to: the ending index of the range to set
 * @returns {boolean} true
 */
BitSet.prototype.setRange = function (from, to) {
  var i, curStart, curEnd, len, mask;
  if (to < from) {
    to ^= from;
    from ^= to;
    to ^= from;
  }
  var startWord = this._getWord(from);
  var endWord = this._getWord(to);
  for (i = startWord; i <= endWord; i++) {
    curStart = (i === startWord) ? from % BITS_PER_INT : 0;
    curEnd = (i === endWord) ? to % BITS_PER_INT : BITS_PER_INT - 1;
    len = curEnd - curStart + 1;
    mask = (((1 << len) - 1) << curStart);
    this.arr[i] |= mask;
  }
  return true;
};

/**
 *
 * @param {number} from: the starting index of the range to unset
 * @param {number} to: the ending index of the range to unset
 * @returns {boolean} true
 */
BitSet.prototype.unsetRange = function (from, to) {
  var i, curStart, curEnd, len, mask;
  if (to < from) {
    to ^= from;
    from ^= to;
    to ^= from;
  }
  var startWord = this._getWord(from);
  var endWord = this._getWord(to);
  for (i = startWord; i <= endWord; i++) {
    curStart = (i === startWord) ? from % BITS_PER_INT : 0;
    curEnd = (i === endWord) ? to % BITS_PER_INT : BITS_PER_INT - 1;
    len = curEnd - curStart + 1;
    mask = 0x7fffffff ^ (((1 << len) - 1) << curStart);
    this.arr[i] &= mask;
  }
  return true;
};

/**
 *
 * Clears an entire bitset
 * @returns {boolean} true
 */
BitSet.prototype.clear = function () {
  for (var i = 0; i < this.arr.length; i++) {
    this.arr[i] = 0;
  }
  return true;
};

/**
 *
 * @returns {number} count of bits set in the entire bitset
 */
BitSet.prototype.getCardinality = function () {
  var setCount = 0;
  for (var i = this.arr.length - 1; i >= 0; i--) {
    var j = this.arr[i];
    j = j - ((j >> 1) & 0x55555555);
    j = (j & 0x33333333) + ((j >> 2) & 0x33333333);
    setCount += ((((j + (j >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24);
  }
  return setCount;
};

/**
 *
 * @returns {BitSet} an copy (by value) of the calling bitset
 * Could be faster by calling a constructor that took in a bitset array
 */
BitSet.prototype.clone = function () {
  return new BitSet(this.dehydrate());
};

/**
 * unsets all the bits below idx so the result only returns those >= idx
 * @param {number} idx: the starting index for the next set bit
 * @returns {number}: the index of the next set bit >= idx
 */
BitSet.prototype.nextSetBit = function (idx) {
  var startWord = this._getWord(idx);
  var wordIdx = idx % BITS_PER_INT;
  var len = BITS_PER_INT - wordIdx;
  var mask = ((1 << (len)) - 1) << wordIdx;
  var reducedWord = this.arr[startWord] & mask;
  if (reducedWord > 0) {
    return _lsb(reducedWord) + startWord * BITS_PER_INT;
  }
  return this.ffs(startWord + 1);
};

/**
 * sets all the bits below idx so the result only returns those >= idx
 * @param {number} idx: the starting index for the next unset bit
 * @returns {number}: the index of the next unset bit >= idx
 */
BitSet.prototype.nextUnsetBit = function (idx) {
  var startWord = this._getWord(idx);
  var mask = ((1 << (idx % BITS_PER_INT)) - 1);
  var reducedWord = this.arr[startWord] | mask;
  if (reducedWord === 0x7fffffff) {
    return this.ffz(startWord + 1);
  } else {
    return _lsb(0x7fffffff ^ reducedWord) + startWord * BITS_PER_INT;
  }
};

/**
 * Unsets all the bits above idx so the result only returns those <= idx
 * @param {number} idx: the starting index for the next unset bit (going in reverse)
 * @returns {number}: the index of the next unset bit <= idx
 */
BitSet.prototype.previousSetBit = function (idx) {
  var startWord = this._getWord(idx);
  var mask = 0x7fffffff >>> (BITS_PER_INT - (idx % BITS_PER_INT) - 1);
  var reducedWord = this.arr[startWord] & mask;
  if (reducedWord > 0) {
    return _msb(reducedWord) + startWord * BITS_PER_INT;
  }
  return this.fls(startWord - 1);
};

/**
 * sets all the bits above idx so the result only returns those <= idx
 * @param {number} idx: the starting index for the next unset bit (going in reverse)
 * @returns {number}: the index of the next unset bit <= idx
 */
BitSet.prototype.previousUnsetBit = function (idx) {
  var startWord = this._getWord(idx);
  var wordIdx = idx % BITS_PER_INT;
  var mask = ((1 << (BITS_PER_INT - wordIdx - 1)) - 1) << wordIdx + 1;
  var reducedWord = this.arr[startWord] | mask;
  if (reducedWord === 0x7fffffff) {
    return this.flz(startWord - 1);
  } else {
    return _msb(0x7fffffff ^ reducedWord) + startWord * BITS_PER_INT;
  }
};

if (typeof define === 'function' && define['amd']) {
  define([], function () {
    return BitSet;
  });
} else if (typeof exports === 'object') {
  module['exports'] = BitSet;
} else {
  root['BitSet'] = BitSet;
}
