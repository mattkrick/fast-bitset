# fast-bitset

[![Build Status](https://travis-ci.org/mattkrick/fast-bitset.svg?branch=master)](https://travis-ci.org/mattkrick/fast-bitset)

[![Join the chat at https://gitter.im/mattkrick/fast-bitset](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mattkrick/fast-bitset?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A fast bitset with some nice methods.

##Features
- Outperforms all other bitset packages in terms of speed and space
- All bit operations execute in O(1) time (does not iterate through bits)
- Useful methods for graph algorithms
- Any array that stores booleans can safely be replaced by a bitset for improved speed
- Uses 64x less space than a nontyped array

##Installation
 `npm install fast-bitset --save`

##License
MIT

##API

* [BitSet](#BitSet)
  * [new BitSet(nBitsOrKey)](#new_BitSet_new)
  * [.get(idx)](#BitSet+get) ⇒ <code>boolean</code>
  * [.set(idx)](#BitSet+set) ⇒ <code>boolean</code>
  * [.setRange(from, to)](#BitSet+setRange) ⇒ <code>boolean</code>
  * [.unset(idx)](#BitSet+unset) ⇒ <code>boolean</code>
  * [.unsetRange(from, to)](#BitSet+unsetRange) ⇒ <code>boolean</code>
  * [.toggle(idx)](#BitSet+toggle) ⇒ <code>boolean</code>
  * [.toggleRange(from, to)](#BitSet+toggleRange) ⇒ <code>boolean</code>
  * [.clear()](#BitSet+clear) ⇒ <code>boolean</code>
  * [.clone()](#BitSet+clone) ⇒ <code>[BitSet](#BitSet)</code>
  * [.dehydrate()](#BitSet+dehydrate) ⇒ <code>string</code>
  * [.and(bsOrIdx)](#BitSet+and) ⇒ <code>[BitSet](#BitSet)</code>
  * [.or(bsOrIdx)](#BitSet+or) ⇒ <code>[BitSet](#BitSet)</code>
  * [.xor(bsOrIdx)](#BitSet+xor) ⇒ <code>[BitSet](#BitSet)</code>
  * [.forEach(func)](#BitSet+forEach)
  * [.getCardinality()](#BitSet+getCardinality) ⇒ <code>number</code>
  * [.getIndices()](#BitSet+getIndices) ⇒ <code>Array</code>
  * [.isSubsetOf(bitset)](#BitSet+isSubsetOf) ⇒ <code>Boolean</code>
  * [.isEmpty()](#BitSet+isEmpty) ⇒ <code>boolean</code>
  * [.isEqual(bs)](#BitSet+isEqual) ⇒ <code>boolean</code>
  * [.toString()](#BitSet+toString) ⇒ <code>string</code>
  * [.ffs(_startWord)](#BitSet+ffs) ⇒ <code>number</code>
  * [.ffz(_startWord)](#BitSet+ffz) ⇒ <code>number</code>
  * [.fls(_startWord)](#BitSet+fls) ⇒ <code>number</code>
  * [.flz(_startWord)](#BitSet+flz) ⇒ <code>number</code>
  * [.nextSetBit(idx)](#BitSet+nextSetBit) ⇒ <code>number</code>
  * [.nextUnsetBit(idx)](#BitSet+nextUnsetBit) ⇒ <code>number</code>
  * [.previousSetBit(idx)](#BitSet+previousSetBit) ⇒ <code>number</code>
  * [.previousUnsetBit(idx)](#BitSet+previousUnsetBit) ⇒ <code>number</code>

<a name="new_BitSet_new"></a>
### new BitSet(nBitsOrKey)
Create a new bitset. Accepts either the maximum number of bits, or a dehydrated bitset


| Param | Type | Description |
| --- | --- | --- |
| nBitsOrKey | <code>number</code> &#124; <code>string</code> | Number of bits in the set or dehydrated bitset. For speed and space concerns, the initial number of bits cannot be increased. |

<a name="BitSet+get"></a>
### bitSet.get(idx) ⇒ <code>boolean</code>
Check whether a bit at a specific index is set

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>boolean</code> - true if bit is set, else false  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>number</code> | the position of a single bit to check |

<a name="BitSet+set"></a>
### bitSet.set(idx) ⇒ <code>boolean</code>
Set a single bit

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>boolean</code> - true if set was successful, else false  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>number</code> | the position of a single bit to set |

<a name="BitSet+setRange"></a>
### bitSet.setRange(from, to) ⇒ <code>boolean</code>
Set a range of bits

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>boolean</code> - true if set was successful, else false  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>number</code> | the starting index of the range to set |
| to | <code>number</code> | the ending index of the range to set |

<a name="BitSet+unset"></a>
### bitSet.unset(idx) ⇒ <code>boolean</code>
Unset a single bit

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>boolean</code> - true if set was successful, else false  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>number</code> | the position of a single bit to unset |

<a name="BitSet+unsetRange"></a>
### bitSet.unsetRange(from, to) ⇒ <code>boolean</code>
Unset a range of bits

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>boolean</code> - true if set was successful, else false  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>number</code> | the starting index of the range to unset |
| to | <code>number</code> | the ending index of the range to unset |

<a name="BitSet+toggle"></a>
### bitSet.toggle(idx) ⇒ <code>boolean</code>
Toggle a single bit

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>boolean</code> - true if set was successful, else false  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>number</code> | the position of a single bit to toggle |

<a name="BitSet+toggleRange"></a>
### bitSet.toggleRange(from, to) ⇒ <code>boolean</code>
Toggle a range of bits

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>boolean</code> - true if set was successful, else false  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>number</code> | the starting index of the range to toggle |
| to | <code>number</code> | the ending index of the range to toggle |

<a name="BitSet+clear"></a>
### bitSet.clear() ⇒ <code>boolean</code>
Clear an entire bitset

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>boolean</code> - true  
<a name="BitSet+clone"></a>
### bitSet.clone() ⇒ <code>[BitSet](#BitSet)</code>
Clone a bitset

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>[BitSet](#BitSet)</code> - an copy (by value) of the calling bitset  
<a name="BitSet+dehydrate"></a>
### bitSet.dehydrate() ⇒ <code>string</code>
Turn the bitset into a comma separated string that skips leading & trailing 0 words.
Ends with the number of leading 0s and MAX_BIT.
Useful if you need the bitset to be an object key (eg dynamic programming).
Can rehydrate by passing the result into the constructor

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>string</code> - representation of the bitset  
<a name="BitSet+and"></a>
### bitSet.and(bsOrIdx) ⇒ <code>[BitSet](#BitSet)</code>
Perform a bitwise AND on 2 bitsets or 1 bitset and 1 index.
Both bitsets must have the same number of words, no length check is performed to prevent and overflow.

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>[BitSet](#BitSet)</code> - a new bitset that is the bitwise AND of the two  

| Param | Type | Description |
| --- | --- | --- |
| bsOrIdx | <code>[BitSet](#BitSet)</code> &#124; <code>Number</code> | a bitset or single index to check (useful for LP, DP problems) |

<a name="BitSet+or"></a>
### bitSet.or(bsOrIdx) ⇒ <code>[BitSet](#BitSet)</code>
Perform a bitwise OR on 2 bitsets or 1 bitset and 1 index.
Both bitsets must have the same number of words, no length check is performed to prevent and overflow.

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>[BitSet](#BitSet)</code> - a new bitset that is the bitwise OR of the two  

| Param | Type | Description |
| --- | --- | --- |
| bsOrIdx | <code>[BitSet](#BitSet)</code> &#124; <code>Number</code> | a bitset or single index to check (useful for LP, DP problems) |

<a name="BitSet+xor"></a>
### bitSet.xor(bsOrIdx) ⇒ <code>[BitSet](#BitSet)</code>
Perform a bitwise XOR on 2 bitsets or 1 bitset and 1 index.
Both bitsets must have the same number of words, no length check is performed to prevent and overflow.

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>[BitSet](#BitSet)</code> - a new bitset that is the bitwise XOR of the two  

| Param | Type | Description |
| --- | --- | --- |
| bsOrIdx | <code>[BitSet](#BitSet)</code> &#124; <code>Number</code> | a bitset or single index to check (useful for LP, DP problems) |

<a name="BitSet+forEach"></a>
### bitSet.forEach(func)
Run a custom function on every set bit. Faster than iterating over the entire bitset with a `get()`
Source code includes a nice pattern to follow if you need to break the for-loop early

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | the function to pass the next set bit to |

<a name="BitSet+getCardinality"></a>
### bitSet.getCardinality() ⇒ <code>number</code>
Get the cardinality (count of set bits) for the entire bitset

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>number</code> - cardinality  
<a name="BitSet+getIndices"></a>
### bitSet.getIndices() ⇒ <code>Array</code>
Get the indices of all set bits. Useful for debugging, uses `forEach` internally

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>Array</code> - Indices of all set bits  
<a name="BitSet+isSubsetOf"></a>
### bitSet.isSubsetOf(bs) ⇒ <code>Boolean</code>
Checks if one bitset is subset of another. Same thing can be done using _and_ operation and equality check,
but then new BitSet would be created, and if one is only interested in yes/no information it would be a waste of memory
and additional GC strain.

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>Boolean</code> - `true` if provided bitset is a subset of this bitset, `false` otherwise  

| Param | Type | Description |
| --- | --- | --- |
| bs | <code>[BitSet](#BitSet)</code> | a bitset to check |

<a name="BitSet+isEmpty"></a>
### bitSet.isEmpty() ⇒ <code>boolean</code>
Quickly determine if a bitset is empty

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>boolean</code> - true if the entire bitset is empty, else false  
<a name="BitSet+isEqual"></a>
### bitSet.isEqual(bs) ⇒ <code>boolean</code>
Quickly determine if both bitsets are equal (faster than checking if the XOR of the two is === 0).
Both bitsets must have the same number of words, no length check is performed to prevent and overflow.

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>boolean</code> - true if the entire bitset is empty, else false  

| Param | Type |
| --- | --- |
| bs | <code>[BitSet](#BitSet)</code> |

<a name="BitSet+toString"></a>
### bitSet.toString() ⇒ <code>string</code>
Get a string representation of the entire bitset, including leading 0s (useful for debugging)

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>string</code> - a base 2 representation of the entire bitset  
<a name="BitSet+ffs"></a>
### bitSet.ffs(_startWord) ⇒ <code>number</code>
Find first set bit (useful for processing queues, breadth-first tree searches, etc.)

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>number</code> - the index of the first set bit in the bitset, or -1 if not found  

| Param | Type | Description |
| --- | --- | --- |
| _startWord | <code>number</code> | the word to start with (only used internally by nextSetBit) |

<a name="BitSet+ffz"></a>
### bitSet.ffz(_startWord) ⇒ <code>number</code>
Find first zero (unset bit)

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>number</code> - the index of the first unset bit in the bitset, or -1 if not found  

| Param | Type | Description |
| --- | --- | --- |
| _startWord | <code>number</code> | the word to start with (only used internally by nextUnsetBit) |

<a name="BitSet+fls"></a>
### bitSet.fls(_startWord) ⇒ <code>number</code>
Find last set bit

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>number</code> - the index of the last set bit in the bitset, or -1 if not found  

| Param | Type | Description |
| --- | --- | --- |
| _startWord | <code>number</code> | the word to start with (only used internally by previousSetBit) |

<a name="BitSet+flz"></a>
### bitSet.flz(_startWord) ⇒ <code>number</code>
Find last zero (unset bit)

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>number</code> - the index of the last unset bit in the bitset, or -1 if not found  

| Param | Type | Description |
| --- | --- | --- |
| _startWord | <code>number</code> | the word to start with (only used internally by previousUnsetBit) |

<a name="BitSet+nextSetBit"></a>
### bitSet.nextSetBit(idx) ⇒ <code>number</code>
Find first set bit, starting at a given index

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>number</code> - the index of the next set bit >= idx, or -1 if not found  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>number</code> | the starting index for the next set bit |

<a name="BitSet+nextUnsetBit"></a>
### bitSet.nextUnsetBit(idx) ⇒ <code>number</code>
Find first unset bit, starting at a given index

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>number</code> - the index of the next unset bit >= idx, or -1 if not found  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>number</code> | the starting index for the next unset bit |

<a name="BitSet+previousSetBit"></a>
### bitSet.previousSetBit(idx) ⇒ <code>number</code>
Find last set bit, up to a given index

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>number</code> - the index of the next unset bit <= idx, or -1 if not found  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>number</code> | the starting index for the next unset bit (going in reverse) |

<a name="BitSet+previousUnsetBit"></a>
### bitSet.previousUnsetBit(idx) ⇒ <code>number</code>
Find last unset bit, up to a given index

**Kind**: instance method of <code>[BitSet](#BitSet)</code>  
**Returns**: <code>number</code> - the index of the next unset bit <= idx, or -1 if not found  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>number</code> | the starting index for the next unset bit (going in reverse) |
