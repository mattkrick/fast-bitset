var BITS_PER_INT = 31; //each bin holds bits 0 - 30, totaling 31 (sign takes up last bit)
var multiplyDeBruijnBitPosition = [0, 1, 28, 2, 29, 14, 24, 3, 30, 22, 20, 15, 25, 17, 4, 8,
  31, 27, 13, 23, 21, 19, 16, 7, 26, 12, 18, 6, 11, 5, 10, 9];

BitSet = function (numFlags) {
  numFlags = numFlags || BITS_PER_INT;
  var slotCount = Math.ceil(numFlags / BITS_PER_INT);
  this.arr = new Uint32Array(slotCount);
  this.MAX_BIT = numFlags - 1;
};

function ffs(i) {
  return multiplyDeBruijnBitPosition[(((i & -i) * 0x077CB531)) >>> 27];
}

BitSet.prototype.ffs = function () {
  var setVal, fs, i;
  for (i = 0; i < this.arr.length; i++) {
    setVal = this.arr[i];
    if (setVal === 0) continue;
    if ((setVal & 1) === 1) { //if it's odd, we know the first bit is set
      fs = 0;
      break;
    }
    fs = ffs(setVal);
    if (fs) break;
  }
  return i * BITS_PER_INT + fs;
};

BitSet.prototype.ffz = function () {
  var setVal, fz = Infinity, i;
  for (i = 0; i < this.arr.length; i++) {
    setVal = (0x7fffffff ^ this.arr[i]); //invert array, JS typing is weird
    if (setVal === 0) continue;
    if ((setVal & 1) === 1) {
      fz = 0;
      break;
    }
    fz = ffs(setVal);
    if (fz) break;
  }
  return i * BITS_PER_INT + fz;
};

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

BitSet.prototype.toString = function () {
  var fullString = '';
  for (var i = this.arr.length - 1; i >= 0; i--) {
    var str = this.arr[i].toString(2);
    fullString += ('0000000000000000000000000000000' + str).slice(-BITS_PER_INT);
  }
  return fullString;
};
function checkIdx(idx) {
  if (idx < 0 || idx > this.MAX_BIT) {
    throw ('Index outside of range');
  }
}

BitSet.prototype.getSlot = function (idx) {
  checkIdx.call(idx);
  return ~~(idx / BITS_PER_INT);
};

BitSet.prototype.set = function (idx) {
  var slot = this.getSlot(idx);
  this.arr[slot] |= 1 << (idx % BITS_PER_INT);
  return true;
};

BitSet.prototype.unset = function (idx) {
  var slot = this.getSlot(idx);
  this.arr[slot] &= ~(1 << (idx % BITS_PER_INT));
  return true;
};

BitSet.prototype.toggle = function (idx) {
  var slot = this.getSlot(idx);
  this.arr[slot] ^= (1 << (idx % BITS_PER_INT));
  return true;
};

BitSet.prototype.get = function (idx) {
  var slot = this.getSlot(idx);
  return (this.arr[slot] >> (idx % BITS_PER_INT)) & 1;
};

//return  (num | (((1 << endLocation) - 1) ^ ((1 << startLocation-1)-1)));

BitSet.prototype.setRange = function (from, to) {
  var i, curStart, curEnd, len, mask;
  if (to < from) {
    to ^= from;
    from ^= to;
    to ^= from;
  }
  var startSlot = this.getSlot(from);
  var endSlot = this.getSlot(to);
  for (i = startSlot; i <= endSlot; i++) {
    curStart = (i === startSlot) ? from % (BITS_PER_INT) : 0;
    curEnd = (i === endSlot) ? to % (BITS_PER_INT) : (BITS_PER_INT -1);
    len = Math.min(31, curEnd - curStart + 1);
    mask = (((1 << len) - 1) << curStart);
    this.arr[i] |= mask;
  }
  return true;
};

BitSet.prototype.unsetRange = function (from, to) {
  var i, curStart, curEnd, len, mask;
  if (to < from) {
    to ^= from;
    from ^= to;
    to ^= from;
  }
  var startSlot = this.getSlot(from);
  var endSlot = this.getSlot(to);
  for (i = startSlot; i <= endSlot; i++) {
    curStart = (i === startSlot) ? from % BITS_PER_INT : 0;
    curEnd = (i === endSlot) ? to % BITS_PER_INT : (BITS_PER_INT -1);
    len = Math.min(31, curEnd - curStart + 1);
    mask = 0x7fffffff ^ (((1 << len) - 1) << curStart);
    this.arr[i] &= mask;
  }
  return true;
};

BitSet.prototype.clear = function () {
  for (var i = 0; i < this.arr.length; i++) {
    this.arr[i] = 0;
  }
  return true;
};

BitSet.prototype.getCardinality = function() {
  var setCount = 0;
  for (var i = this.arr.length - 1; i >= 0; i--) {
   var j = this.arr[i];
    j = j - ((j >> 1) & 0x55555555);
    j = (j & 0x33333333) + ((j >> 2) & 0x33333333);
    setCount += ((((j + (j >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24);
  }
  return setCount;
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
