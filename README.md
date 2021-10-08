# Bitmap ⇔ Code Generator

[![github pages](https://github.com/cowboy/bitmap-code-generator/actions/workflows/main.yml/badge.svg)](https://github.com/cowboy/bitmap-code-generator/actions/workflows/main.yml)

Convert between bitmaps and code, with a GUI bitmap editor

Suitable for use with [GyverMAX7219](https://github.com/GyverLibs/GyverMAX7219) and possibly other code or hardware that uses 8x8 bitmaps or LED matrixes

## Online Editor

https://bitmap-code-generator.benalman.com/

## Example

A bitmap like this:

![](https://github.com/cowboy/bitmap-code-generator/blob/main/public/robot.png?raw=true)

Becomes this C++ code:

```cpp
const uint8_t robot[] PROGMEM = {0x42, 0x7e, 0x81, 0xa5, 0x81, 0x7e, 0x3c, 0xff};
```

Or this JavaScript code:

```js
const robot = [0x42, 0x7e, 0x81, 0xa5, 0x81, 0x7e, 0x3c, 0xff]
```

And vice-versa!
