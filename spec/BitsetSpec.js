describe("BitSet", function () {
  var BitSet = require('../app/BitSet.js');

  it('should set an individual bit', function () {
    var bs = new BitSet(100);
    bs.set(31);
    expect(bs.get(31)).toBe(true);
  });

  it('should find first set', function () {
    var bs = new BitSet(100);
    bs.set(31);
    expect(bs.ffs()).toBe(31);
  });

  it('should find first zero', function () {
    var bs = new BitSet(100);
    bs.setRange(0,31);
    expect(bs.ffz()).toBe(32);
  });

  it('should set a range of len 1', function () {
    var bs = new BitSet(100);
    bs.setRange(31,31);
    expect(bs.dehydrate()).toBe('0,1,0,0,99');
  });

  it('should set a range of len 31', function () {
    var bs = new BitSet(100);
    bs.setRange(0,30);
    expect(bs.dehydrate()).toBe('2147483647,0,0,0,99');
  });

  it('should set a range that spans 3 words', function () {
    var bs = new BitSet(100);
    bs.setRange(30,65);
    expect(bs.dehydrate()).toBe('1073741824,2147483647,15,0,99');
  });

  it('should AND two bitsets', function () {
    var bs1 = new BitSet(100);
    var bs2 = new BitSet(100);
    bs1.setRange(1,10);
    bs2.setRange(10,33);
    var bs3 = bs1.and(bs2);
    expect(bs3.dehydrate()).toBe('1024,0,0,0,99');
  });

  it('should OR two bitsets', function () {
    var bs1 = new BitSet(100);
    var bs2 = new BitSet(100);
    bs1.setRange(1,10);
    bs2.setRange(10,33);
    var bs3 = bs1.or(bs2);
    expect(bs3.dehydrate()).toBe('2147483646,7,0,0,99');
  });

  it('should XOR two bitsets', function () {
    var bs1 = new BitSet(100);
    var bs2 = new BitSet(100);
    bs1.setRange(1,10);
    bs2.setRange(10,33);
    var bs3 = bs1.xor(bs2);
    expect(bs3.dehydrate()).toBe('2147482622,7,0,0,99');
  });

  it('should detect empty arrays', function () {
    var bs = new BitSet(100);
    expect(bs.isEmpty()).toBe(true);
    bs.set(31);
    expect(bs.isEmpty()).toBe(false);
  });

  it('should unset a bit', function () {
    var bs = new BitSet(100);
    bs.set(31);
    bs.unset(31);
    expect(bs.get(31)).toBe(false);
  });

  it('should toggle a bit', function () {
    var bs = new BitSet(100);
    bs.toggle(31);
    expect(bs.get(31)).toBe(true);
    bs.toggle(31);
    expect(bs.get(31)).toBe(false);
  });

  it('should unset a range', function () {
    var bs = new BitSet(100);
    bs.setRange(29,59);
    bs.unsetRange(30,58);
    expect(bs.dehydrate()).toBe('536870912,268435456,0,0,99');
  });

  it('should clear a bitset', function () {
    var bs = new BitSet(100);
    bs.setRange(29,59);
    bs.clear();
    expect(bs.isEmpty()).toBe(true);
  });

  it('should check for equality', function () {
    var bs = new BitSet(100);
    bs.setRange(29,59);
    var bs2 = new BitSet(100);
    bs2.setRange(29,59);
    expect(bs.isEqual(bs2)).toBe(true);
  });

  it('should find next set bit in the same word', function () {
    var bs = new BitSet(100);
    bs.setRange(10,30);
    expect(bs.nextSetBit(1)).toBe(10);
  });

  it('should find next set bit the next word', function () {
    var bs = new BitSet(100);
    bs.setRange(66,99);
    expect(bs.nextSetBit(31)).toBe(66);
  });

  it('should find next unset bit in the same word', function () {
    var bs = new BitSet(100);
    bs.setRange(10,30);
    expect(bs.nextUnsetBit(1)).toBe(1);
  });

  it('should find next set bit the next word', function () {
    var bs = new BitSet(100);
    bs.setRange(10,30);
    expect(bs.nextUnsetBit(11)).toBe(31);
  });

  it('should find the last set bit', function () {
    var bs = new BitSet(100);
    bs.setRange(10,30);
    expect(bs.fls()).toBe(30);
  });

  it('should find the previous set bit', function () {
    var bs = new BitSet(100);
    bs.setRange(10,30);
    expect(bs.previousSetBit(90)).toBe(30);
  });

  it('should find the last unset bit', function () {
    var bs = new BitSet(100);
    bs.setRange(60,99);
    expect(bs.flz()).toBe(59);
  });

  it('should find the previous unset bit', function () {
    var bs = new BitSet(100);
    bs.setRange(60,99);
    expect(bs.previousUnsetBit(80)).toBe(59);
  });

  it('should clone a bitset', function () {
    var bs = new BitSet(100);
    bs.setRange(60,99);
    bs2 = bs.clone();
    expect(bs.dehydrate()).toBe(bs2.dehydrate());
  });

  it('should count number of bits set', function () {
    var bs = new BitSet(100);
    bs.setRange(60,99);
    expect(bs.getCardinality()).toBe(40);
  });
});
