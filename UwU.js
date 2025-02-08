    /* silly easter egg :P */
    (function () {
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let codePosition = 0;

        document.addEventListener('keydown', function (e) {
            if (e.keyCode === konamiCode[codePosition]) {
                codePosition++;
                if (codePosition === konamiCode.length) {
                    window.location.href = 'https://i.etsystatic.com/33077571/r/il/1349f0/3829755353/il_fullxfull.3829755353_b8d0.jpg';
                }
            } else {
                codePosition = 0;
            }
        });
    })();

    document.getElementById('show-more-gallery').addEventListener('click', function () {
        const fullGallery = document.querySelector('.gallery-full');
        if (fullGallery.style.display === 'none') {
            fullGallery.style.display = 'block';
            this.textContent = 'Show Less';
            (function () {
                let button = document.evaluate(
                    "/html/body/section[2]/section[1]/button",
                    document,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                ).singleNodeValue;

                if (button) {
                    button.remove();
                } else {
                    console.warn("Button not found!");
                }
            })();
            (function () {
                let button = document.evaluate(
                    "/html/body/section[2]/section[1]/div[1]",
                    document,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                ).singleNodeValue;

                if (button) {
                    button.remove();
                } else {
                    console.warn("Button not found!");
                }
            })();
        } else {
            fullGallery.style.display = 'none';
            this.textContent = 'Show More';
        }
    });
