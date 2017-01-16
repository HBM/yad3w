'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// https://www.html5rocks.com/en/tutorials/canvas/hidpi/
var retinafy = function retinafy(canvas) {
  var context = canvas.getContext('2d');

  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;

  var ratio = devicePixelRatio / backingStoreRatio;

  if (devicePixelRatio !== backingStoreRatio) {
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';

    canvas.width *= ratio;
    canvas.height *= ratio;

    context.scale(ratio, ratio);
  }

  return canvas;
};

exports.default = retinafy;