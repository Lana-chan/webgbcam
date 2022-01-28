# webgbcam

A simple Game Boy Camera-style filter made in HTML5 and JavaScript

[Play with it here!](https://maple.pet/webgbcam/)

## Disclaimer

As of this commit, this is simply a direct copy of the files currently in my webserver.
Eventually, I will clean things up and make improvements to the code, but since there
has been interest in looking at the code, I'm mirroring the files here.

## A quick explanation of how it all works

The concept of [Bayer dithering](https://en.wikipedia.org/wiki/Ordered_dithering) was
hard for me to grasp at first, but after a [few different projects](https://github.com/Lana-chan/maples-retro-extravaganza)
getting acquainted with it, I've found an easy way to apply it, which can be used in
a procedural setting like JS Canvas filters, or shaders.

Basically, you start with an array of pixels, then grayscale them and optionally apply
simple arithmetics to apply gamma and contrast adjustments. Then, you offset those by
the value in the Bayer matrix corresponding to that pixel, giving it a patterned look.
Finally, you divide and quantize the values until all pixels each have only one of four
possible values. This will give you a dithered pixel art look. After this, my code applies
a palette swap for those 4 values back to RGB space.

## Acknowledgements

Thanks to [Christine Love](https://twitter.com/christinelove) for making the Interstellar
Selfie Station back in 2014. It helped me a lot with my dysphoria and was the inspiration
to learning how Bayer dithering works in order to remake her camera app once it was no
longer available in app stores.

Thanks to [Joel Yliluoma's arbitrary-palette positional dithering algorithm](https://bisqwit.iki.fi/story/howto/dither/jy/)
page, which was the first analysis of ordered dithering that I found comprehensible and
used to implement the filter in different applications.

Thanks to [lospec.com](https://lospec.com/palette-list) for making a list of palettes available,
many of which were used in this project.

## License

```
/*
 * ------------------------------------------------------------
 * "THE BEERWARE LICENSE" (Revision 42):
 * maple "mavica" syrup <maple@maple.pet> wrote this code.
 * As long as you retain this notice, you can do whatever you
 * want with this stuff. If we meet someday, and you think this
 * stuff is worth it, you can buy me a beer in return.
 * ------------------------------------------------------------
 */
```

The license does not obligate you do so, but if you build something upon the code in this repository, I'd love to hear about it and I ask that you credit me in it.

[gif.js](https://github.com/jnordberg/gif.js) by Johan Nordberg:

```
The MIT License (MIT)

Copyright (c) 2013-2018 Johan Nordberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
