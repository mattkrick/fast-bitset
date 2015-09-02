describe("BitSet", function () {
  var BitSet = require('../app/BitSet.js');

  it('should set an individual bit', function () {
    var bs = new BitSet(100);
    bs.set(31);
    expect(bs.get(31)).toBe(1);
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

  it('should AND two bitsets', function () {
    var bs1 = new BitSet(100);
    var bs2 = new BitSet(100);
    bs1.setRange(1,10);
    bs2.setRange(10,33);
    var bs3 = bs1.and(bs2);
    expect(bs3.get(10)).toBe(1);
    expect(bs3.getCardinality()).toBe(1);
  });

  it('should OR two bitsets', function () {
    var bs1 = new BitSet(100);
    var bs2 = new BitSet(100);
    bs1.setRange(1,10);
    bs2.setRange(10,33);
    debugger;
    var bs3 = bs1.or(bs2);
    expect(bs3.getCardinality()).toBe(33);
  });

  it('should XOR two bitsets', function () {
    var bs1 = new BitSet(100);
    var bs2 = new BitSet(100);
    bs1.setRange(1,10);
    bs2.setRange(10,33);
    debugger;
    var bs3 = bs1.xor(bs2);
    expect(bs3.getCardinality()).toBe(32);
  });

  it('should declare empty arrays', function () {
    var bs = new BitSet(100);
    expect(bs.isEmpty()).toBe(true);
    bs.set(31);
    expect(bs.isEmpty()).toBe(false);
  });

  it('should unset a bit', function () {
    var bs = new BitSet(100);
    bs.set(31);
    bs.unset(31);
    expect(bs.get(31)).toBe(0);
  });

  it('should toggle a bit', function () {
    var bs = new BitSet(100);
    bs.toggle(31);
    expect(bs.get(31)).toBe(1);
    bs.toggle(31);
    expect(bs.get(31)).toBe(0);
  });

  it('should set a range', function () {
    var bs = new BitSet(100);
    bs.setRange(29,59);
    expect(bs.getCardinality()).toBe(31);
  });

  it('should unset a range', function () {
    var bs = new BitSet(100);
    bs.setRange(29,59);
    bs.unsetRange(30,58);
    expect(bs.getCardinality()).toBe(2);
  });

  it('should clear a bitset', function () {
    var bs = new BitSet(100);
    bs.setRange(29,59);
    bs.clear();
    expect(bs.isEmpty()).toBe(true);
  });
});
