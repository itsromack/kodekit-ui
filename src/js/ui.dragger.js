/**
 * Sidebar off-canvas toggles
 */

(function($) {

    kodekitUI.dragger = function() {

        var middlepane = document.querySelector(".k-js-middlepane");
        if (middlepane !== null && document.querySelector('.k-pane-resizer') == undefined) {
            var middlepaneResizer = document.createElement("div");
            middlepaneResizer.className = "k-pane-resizer";
            middlepane.appendChild(middlepaneResizer);
            middlepaneResizer.addEventListener("mousedown", initDrag, false);
            var startW, startWidth, newWidth, direction;
        }

        function initDrag(e) {
            startW = e.clientX;
            startWidth = parseInt(document.defaultView.getComputedStyle(middlepane).width, 10);
            direction = document.documentElement.getAttribute('dir') || 'ltr';
            document.documentElement.addEventListener("mousemove", doDrag, false);
            document.documentElement.addEventListener("mouseup", stopDrag, false);
        }

        function doDrag(e) {
            document.getElementsByClassName('k-ui-container')[0].classList.add("k-is-unresponsive");
            if ( direction == 'ltr' ) {
                newWidth = (startWidth + e.clientX - startW);
            } else {
                newWidth = (startWidth - (e.clientX - startW));
            }
            if (newWidth <= 221) {
                newWidth = 221;
            }
            middlepane.style.width = newWidth + "px";
            middlepane.style.minWidth = newWidth + "px";
            middlepane.style.maxWidth = newWidth + "px";
        }

        function stopDrag(e) {
            document.documentElement.removeEventListener("mousemove", doDrag, false);
            document.documentElement.removeEventListener("mouseup", stopDrag, false);
            document.getElementsByClassName('k-ui-container')[0].classList.remove("k-is-unresponsive");
            middlepane.removeAttribute('style');

            var width;

            if ( direction == 'ltr' ) {
                width = startWidth + e.clientX - startW;
            } else {
                width = (startWidth - (e.clientX - startW));
            }
            if (width <= 221) {
                width = 221;
            }

            kodekitUI.createCookie("kodekitUI.middlepanewidth", width);
            kodekitUI.setCSS(
                '@media screen and (min-width: 1024px) {' +
                '.k-ui-container .k-content-area .k-content:not(:last-child) {' +
                'min-width:'+width+'px;' +
                'width:'+width+'px;' +
                'max-width:'+width+'px;' +
                '}' +
                '}'
            );
            window.dispatchEvent(new Event('resize'));
        }
    };

})(kQuery);
