    (function () {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let codePosition = 0;

        document.addEventListener('keydown', function (e) {
            if (e.key === konamiCode[codePosition]) {
                codePosition++;
                if (codePosition === konamiCode.length) {
                    window.location.href = 'https://github.com/SAPH1TE/Bo-Wiltse-Site/blob/main/vexation.png?raw=true';
                    codePosition = 0;
                }
            } else {
                codePosition = 0;
            }
        });
    })();

    (() => {
        let d = document,
            b = d.createElement("div");
        b.textContent = "Please note this website is in development";
        Object.assign(b.style, {
            position: "fixed",
            bottom: "25px",
            right: "25px",
            background: "black",
            color: "white",
            padding: "8px",
            borderRadius: "15px",
            fontSize: "25px",
            zIndex: 9999
        });
        d.body.appendChild(b);
        setTimeout(() => b.remove(), 2500);
    })();

    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
        setTimeout(function () {
            document.getElementById('loading-section').remove();
        }, 500);
    });
