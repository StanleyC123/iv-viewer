import { createElement, assignEvent, css, remove, removeCss } from './util';
import { m3dIdentity, m2dTranslate, m2dRotate, m2dReflect, m2dMultiply, m2dToTransformString, m2dParseTransformString } from './matrix';
import ImageViewer from './ImageViewer';

const fullScreenHtml = `
  <div class="iv-fullscreen-container"></div>
  <div class="iv-fullscreen-close"></div>
  <div class="iv-fullscreen-toolbar">
    <div class="iv-fullscreen-toolbar-element iv-fullscreen-toolbar-rotate-anticlockwise">
    &#x27F2
    </div>
    <div class="iv-fullscreen-toolbar-element iv-fullscreen-toolbar-rotate-clockwise">
    &#x27F3
    </div>
    <div class="iv-fullscreen-toolbar-element iv-fullscreen-toolbar-flip-horizontal">
    &#x2385
    </div>
    <div class="iv-fullscreen-toolbar-element iv-fullscreen-toolbar-flip-vertical">
    &#x2385
    </div>
    <div class="iv-fullscreen-home">&#8962</div>
  </div>
`;

class FullScreenViewer extends ImageViewer {
    constructor(options = {}) {
        const fullScreenElem = createElement({
            tagName: 'div',
            className: 'iv-fullscreen',
            html: fullScreenHtml,
            parent: document.body,
        });

        const container = fullScreenElem.querySelector('.iv-fullscreen-container');

        // call the ImageViewer constructor
        super(container, { ...options, refreshOnResize: false });

        // add fullScreenElem on element list
        this._elements.fullScreen = fullScreenElem;

        this._initFullScreenEvents();
    }
    _initFullScreenEvents() {
        const { fullScreen } = this._elements;
        const closeBtn = fullScreen.querySelector('.iv-fullscreen-close');

        // add close button event
        this._events.onCloseBtnClick = assignEvent(closeBtn, 'click', this.hide);
  }
    show(imageSrc, hiResImageSrc, viewBox, paths) {
        // show the element
        css(this._elements.fullScreen, { display: 'block' });

        // if image source is provide load image source
        if (imageSrc) {
            if (viewBox == null)
                viewBox = '0 0 5000 5000';
            // add home button event
            const { fullScreen } = this._elements;
            const homeBtn = fullScreen.querySelector('.iv-fullscreen-home');
            this._events.onHomeBtnClick = assignEvent(homeBtn, 'click', () => { this.load(imageSrc, hiResImageSrc, viewBox, paths) });

            this.load(imageSrc, hiResImageSrc, viewBox, paths);
        }

        // Initialize transformations to two Identity Matrices
        css(this._elements.image, { transform: m2dToTransformString(m3dIdentity()) + m2dToTransformString(m3dIdentity()) });

        // Add toolbar events
        const rotateAcwBtn = document.querySelector('.iv-fullscreen-toolbar-rotate-anticlockwise');
        this._events.onRotateAcwBtnClick = assignEvent(rotateAcwBtn, 'click', (() => { this.rotate(-90); }));
        const rotateCwBtn = document.querySelector('.iv-fullscreen-toolbar-rotate-clockwise');
        this._events.onRotateCwBtnClick = assignEvent(rotateCwBtn, 'click', (() => { this.rotate(90); }));
        const reflectHorizontalBtn = document.querySelector('.iv-fullscreen-toolbar-flip-horizontal');
        this._events.onReflectHorizontalBtnClick = assignEvent(reflectHorizontalBtn, 'click', (() => { this.reflect(90); }));
        const reflectVerticalBtn = document.querySelector('.iv-fullscreen-toolbar-flip-vertical');
        this._events.onReflectVerticalBtnClick = assignEvent(reflectVerticalBtn, 'click', (() => { this.reflect(0); }));

        // handle window resize
        this._events.onWindowResize = assignEvent(window, 'resize', this.refresh);

        // disable scroll on html
        css(document.querySelector('html'), { overflow: 'hidden' });
    }
    hide = () => {
        // hide the fullscreen
        css(this._elements.fullScreen, { display: 'none' });

        // enable scroll
        removeCss(document.querySelector('html'), 'overflow');

        // remove window event
        this._events.onWindowResize();

        // Remove toolbar events
        this._events.onRotateAcwBtnClick();
        this._events.onRotateCwBtnClick();
        this._events.onReflectHorizontalBtnClick();
        this._events.onReflectVerticalBtnClick();
    }
    destroy() {
        const { fullScreen } = this._elements;

        // destroy image viewer
        super.destroy();

        // remove the element
        remove(fullScreen);
    }
}

export default FullScreenViewer;
