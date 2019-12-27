"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.m3dIdentity = m3dIdentity;
exports.m2dTranslate = m2dTranslate;
exports.m2dRotate = m2dRotate;
exports.m2dReflect = m2dReflect;
exports.m2dMultiply = m2dMultiply;
exports.m2dToTransformString = m2dToTransformString;
exports.m2dParseTransformString = m2dParseTransformString;

// Create 3D Identity matrix
function m3dIdentity() {
  return [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]];
} // Create 2D translation matrix


function m2dTranslate(dx, dy) {
  return [[1.0, 0.0, dx], [0.0, 1.0, dy], [0.0, 0.0, 1.0]];
} // Create 2D rotation matrix


function m2dRotate() {
  var thetaDeg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var TAU = 2 * Math.PI;
  var thetaRad = TAU * thetaDeg / 360;
  return [[Math.cos(thetaRad), -Math.sin(thetaRad), 0.0], [Math.sin(thetaRad), Math.cos(thetaRad), 0.0], [0.0, 0.0, 1.0]];
} // Create 2D reflection matrix


function m2dReflect() {
  var thetaDeg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var TAU = 2 * Math.PI;
  var thetaRad = TAU * thetaDeg / 360;
  return [[Math.cos(2 * thetaRad), Math.sin(2 * thetaRad), 0.0], [Math.sin(2 * thetaRad), -Math.cos(2 * thetaRad), 0.0], [0.0, 0.0, 1.0]];
} // Return product of two 2D matrices


function m2dMultiply(a, b) {
  return [[a[0][0] * b[0][0] + a[0][1] * b[1][0] + a[0][2] * b[2][0], a[0][0] * b[0][1] + a[0][1] * b[1][1] + a[0][2] * b[2][1], a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2] * b[2][2]], [a[1][0] * b[0][0] + a[1][1] * b[1][0] + a[1][2] * b[2][0], a[1][0] * b[0][1] + a[1][1] * b[1][1] + a[1][2] * b[2][1], a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2] * b[2][2]], [a[2][0] * b[0][0] + a[2][1] * b[1][0] + a[2][2] * b[2][0], a[2][0] * b[0][1] + a[2][1] * b[1][1] + a[2][2] * b[2][1], a[2][0] * b[0][2] + a[2][1] * b[1][2] + a[2][2] * b[2][2]]];
} // Return a transformation matrix as a string


function m2dToTransformString(m) {
  return "matrix(" + m.slice(0, 2).flat().map(function (e) {
    return function (num, precision) {
      return Math.round(num * precision) / precision;
    }(e, 1000);
  }).map(function (e, i, arr) {
    return function (w) {
      return arr[Math.floor(i / w + i % w * arr.length / w)];
    }(2);
  }) + ")";
} // Parse a transformation matrix


function m2dParseTransformString(m) {
  var arr = JSON.parse(m.replace('matrix(', '[').replace(')', ']'));
  return [[arr[0], arr[2], arr[4]], [arr[1], arr[3], arr[5]], [0.0, 0.0, 1.0]];
}