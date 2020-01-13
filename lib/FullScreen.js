"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("./util");

var _matrix = require("./matrix");

var _ImageViewer2 = _interopRequireDefault(require("./ImageViewer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fullScreenHtml = "\n  <div class=\"iv-fullscreen-container\"></div>\n  <div class=\"iv-fullscreen-close\"></div>\n  <div class=\"iv-fullscreen-toolbar\">\n    <div class=\"iv-fullscreen-toolbar-element iv-fullscreen-toolbar-rotate-anticlockwise\">\n    &#x27F2\n    </div>\n    <div class=\"iv-fullscreen-toolbar-element iv-fullscreen-toolbar-rotate-clockwise\">\n    &#x27F3\n    </div>\n    <div class=\"iv-fullscreen-toolbar-element iv-fullscreen-toolbar-flip-horizontal\">\n    &#x2385\n    </div>\n    <div class=\"iv-fullscreen-toolbar-element iv-fullscreen-toolbar-flip-vertical\">\n    &#x2385\n    </div>\n    <div class=\"iv-fullscreen-toolbar-element iv-fullscreen-home\">&#8962</div>\n  </div>\n";

var FullScreenViewer =
/*#__PURE__*/
function (_ImageViewer) {
  _inherits(FullScreenViewer, _ImageViewer);

  function FullScreenViewer() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, FullScreenViewer);

    var fullScreenElem = (0, _util.createElement)({
      tagName: 'div',
      className: 'iv-fullscreen',
      html: fullScreenHtml,
      parent: document.body
    });
    console.log("ELEMENTS CREATED");
    var container = fullScreenElem.querySelector('.iv-fullscreen-container'); // call the ImageViewer constructor

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FullScreenViewer).call(this, container, _objectSpread({}, options, {
      refreshOnResize: false
    }))); // add fullScreenElem on element list

    _defineProperty(_assertThisInitialized(_this), "hide", function () {
      // hide the fullscreen
      (0, _util.css)(_this._elements.fullScreen, {
        display: 'none'
      }); // enable scroll

      (0, _util.removeCss)(document.querySelector('html'), 'overflow'); // remove window event

      _this._events.onWindowResize(); // Remove toolbar events


      _this._events.onRotateAcwBtnClick();

      _this._events.onRotateCwBtnClick();

      _this._events.onReflectHorizontalBtnClick();

      _this._events.onReflectVerticalBtnClick(); // Remove home button event


      _this._events.onHomeBtnClick();
    });

    _this._elements.fullScreen = fullScreenElem;

    _this._initFullScreenEvents();

    return _this;
  }

  _createClass(FullScreenViewer, [{
    key: "_initFullScreenEvents",
    value: function _initFullScreenEvents() {
      var fullScreen = this._elements.fullScreen;
      var closeBtn = fullScreen.querySelector('.iv-fullscreen-close'); // add close button event

      this._events.onCloseBtnClick = (0, _util.assignEvent)(closeBtn, 'click', this.hide);
    }
  }, {
    key: "show",
    value: function show(imageSrc, hiResImageSrc, viewBox, paths) {
      var _this2 = this;

      // show the element
      (0, _util.css)(this._elements.fullScreen, {
        display: 'block'
      }); // if image source is provide load image source

      if (imageSrc) {
        if (viewBox == null) viewBox = '0 0 5000 5000';
        if (paths == null) paths = [{
          href: hiResImageSrc,
          viewBox: '0 0 5000 5000',
          children: []
        }]; // add home button event

        var _fullScreen = this._elements.fullScreen;

        var homeBtn = _fullScreen.querySelector('.iv-fullscreen-home');

        this._events.onHomeBtnClick = (0, _util.assignEvent)(homeBtn, 'click', function () {
          _this2.load(imageSrc, hiResImageSrc, viewBox, paths);
        });
        this.load(imageSrc, hiResImageSrc, viewBox, paths);
      } // Initialize transformations to two Identity Matrices


      (0, _util.css)(this._elements.image, {
        transform: (0, _matrix.m2dToTransformString)((0, _matrix.m3dIdentity)()) + (0, _matrix.m2dToTransformString)((0, _matrix.m3dIdentity)())
      }); // Add toolbar events

      console.log("EVENTHANDLERS CREATED");
      var fullScreen = this._elements.fullScreen;
      var rotateAcwBtn = fullScreen.querySelector('.iv-fullscreen-toolbar-rotate-anticlockwise');
      console.log(rotateAcwBtn);
      this._events.onRotateAcwBtnClick = (0, _util.assignEvent)(rotateAcwBtn, 'click', function () {
        console.log("Clicked Rotate");

        _this2.rotate(-90);
      });
      console.log(this._events.onRotateAcwBtnClick);
      var rotateCwBtn = fullScreen.querySelector('.iv-fullscreen-toolbar-rotate-clockwise');
      this._events.onRotateCwBtnClick = (0, _util.assignEvent)(rotateCwBtn, 'click', function () {
        _this2.rotate(90);
      });
      var reflectHorizontalBtn = fullScreen.querySelector('.iv-fullscreen-toolbar-flip-horizontal');
      this._events.onReflectHorizontalBtnClick = (0, _util.assignEvent)(reflectHorizontalBtn, 'click', function () {
        _this2.reflect(90);
      });
      var reflectVerticalBtn = fullScreen.querySelector('.iv-fullscreen-toolbar-flip-vertical');
      this._events.onReflectVerticalBtnClick = (0, _util.assignEvent)(reflectVerticalBtn, 'click', function () {
        _this2.reflect(0);
      });
      console.log(this._events); // handle window resize

      this._events.onWindowResize = (0, _util.assignEvent)(window, 'resize', this.refresh); // disable scroll on html

      (0, _util.css)(document.querySelector('html'), {
        overflow: 'hidden'
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var fullScreen = this._elements.fullScreen; // destroy image viewer

      _get(_getPrototypeOf(FullScreenViewer.prototype), "destroy", this).call(this); // remove the element


      (0, _util.remove)(fullScreen);
    }
  }]);

  return FullScreenViewer;
}(_ImageViewer2["default"]);

var _default = FullScreenViewer;
exports["default"] = _default;