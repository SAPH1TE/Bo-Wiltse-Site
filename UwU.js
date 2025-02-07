    (function () {
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let codePosition = 0;

        document.addEventListener('keydown', function (e) {
            if (e.keyCode === konamiCode[codePosition]) {
                codePosition++;
                if (codePosition === konamiCode.length) {
                    window.location.href = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Transgender_Pride_flag.svg/640px-Transgender_Pride_flag.svg.png'; // Change this URL to the target website
                }
            } else {
                codePosition = 0;
            }
        });
    })();
