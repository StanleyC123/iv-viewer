import FullScreenViewer from '../../src/FullScreen';

const viewer = new FullScreenViewer();

Array.from(document.querySelectorAll('.gallery-items')).forEach((elem) => {
    elem.addEventListener('click', function (ev) {
        const imgSrc = elem.src;
        const highResolutionImage = elem.getAttribute('data-high-res-src');
        //var paths = [
        //    { href: "../images/1.jpg", children: [{ href: "../images/2.jpg", d: "M 0 0 h 2000 v 100 h -2000 Z" }, { href: "../images/3.jpg", d: "M 0 300 h 2000 v 100 h -2000 Z" }, { href: "../images/4.jpg", d: "M 0 600 h 2000 v 100 h -2000 Z" }] },
        //    { href: "../images/2.jpg", children: [{ href: "../images/1.jpg", d: "M 0 0 h 2000 v 100 h -2000 Z" }, { href: "../images/3.jpg", d: "M 0 300 h 2000 v 100 h -2000 Z" }] },
        //    { href: "../images/3.jpg", children: [{ href: "../images/4.jpg", d: "M 0 0 h 2000 v 100 h -2000 Z" }] }
        //];
        var paths = [
            { href: "http://localhost:5000/api/RegulatorDrawingsApi/files/lfkwmdnas01/DataBackup/theox/Projects/tiberius-images/regulator-drawings/26Ward/26W-TABLE02/26W-TABLE-02.png", viewBox: "0 0 3928 3315", children: [{ href: "../images/iihp-1.jpg", d: "M 1465 397 h 217 v 144 h -217 Z" }] },
            { href: "../images/iihp-1.jpg", viewBox: "0 0 4014 3325", children: [{ href: "../images/iihp-k.jpg", d: "M 1465 397 h 217 v 144 h -217 Z" }] }
        ];
        viewer.show(imgSrc, highResolutionImage, '0 0 3928 3315', paths);
    });
});