    document.addEventListener('DOMContentLoaded', function () {
        const loadingSection = document.getElementById('loading-section');
        const backToTopBtn = document.getElementById('back-to-top');
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.getElementById('main-nav'); // Use ID for nav
        const contactForm = document.getElementById('contact-form');
        const currentYearSpan = document.getElementById('current-year');

        if (currentYearSpan) {
            currentYearSpan.textContent = (new Date().getFullYear()).toString();
        }

        // iOS 100vh fix (run early)
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('load', function () {
            setTimeout(function () {
                if (loadingSection) {
                    loadingSection.style.opacity = '0';
                    setTimeout(function () {
                        loadingSection.style.display = 'none';
                    }, 500);
                }
            }, 300);
        });

        if (menuToggle && nav) {
            menuToggle.addEventListener('click', function () {
                this.classList.toggle('active');
                nav.classList.toggle('open');
                const isExpanded = this.classList.contains('active');
                this.setAttribute('aria-expanded', String(isExpanded));
                if (isExpanded) {
                    nav.querySelector('a').focus();
                }
            });
        }

        if (nav) {
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (nav.classList.contains('open')) {
                        nav.classList.remove('open');
                        if(menuToggle) {
                            menuToggle.classList.remove('active');
                            menuToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
            });
        }

        document.addEventListener('click', function (e) {
            if (nav && menuToggle && nav.classList.contains('open')) {
                if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                    nav.classList.remove('open');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    let headerOffset = 70; // Height of fixed header
                    if(document.querySelector('header')) {
                        headerOffset = document.querySelector('header').offsetHeight;
                    }
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    setTimeout(() => {
                        targetElement.setAttribute('tabindex', '-1');
                        targetElement.focus({ preventScroll: true });
                    }, 1000);
                }
            });
        });

        window.addEventListener('scroll', function () {
            if (backToTopBtn) {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }
        });

        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                const focusTarget = document.querySelector('.logo') || document.querySelector('#hero-title');
                if(focusTarget) {
                    focusTarget.focus({preventScroll: true});
                }
            });
        }

        if (contactForm) {
            contactForm.addEventListener('submit', function () {
                const submitBtn = this.querySelector('button[type="submit"]');
                if(submitBtn){
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                    setTimeout(function () {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 4000);
                }
            });
        }

        const devBanner = document.getElementById('dev-banner');
        if (devBanner) {
            setTimeout(function () {
                devBanner.style.animationPlayState = 'running';
                devBanner.addEventListener('animationend', function handler() {
                    this.remove();
                    devBanner.removeEventListener('animationend', handler);
                }, { once: true });
            }, 4500);
        }
        const serviceVideos = document.querySelectorAll('.service-video');
        serviceVideos.forEach(video => {
            video.preload = 'metadata';
            const parentCard = video.closest('.service-card');
            if(parentCard) {
                parentCard.addEventListener('mouseenter', () => {
                    if(video.paused) video.play().catch(e => console.warn("Video play interrupted:", e));
                });
                parentCard.addEventListener('focusin', () => {
                    if(video.paused) video.play().catch(e => console.warn("Video play interrupted:", e));
                });
                parentCard.addEventListener('mouseleave', () => {
                    if(!video.paused) video.pause();
                });
                parentCard.addEventListener('focusout', () => {
                    if(!video.paused) video.pause();
                });
            }
        });

        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"], img:not([loading])'); // Target explicit lazy or unspecified
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        if (image.dataset.src) {
                            image.src = image.dataset.src;
                            image.removeAttribute('data-src');
                        }
                        image.classList.add('loaded');
                        observer.unobserve(image);
                    }
                });
            }, { rootMargin: "0px 0px 100px 0px" });

            lazyImages.forEach(image => {
                if (image.getAttribute('loading') === 'lazy' && image.src && !image.src.startsWith('data:image')) {
                } else if (!image.getAttribute('loading') && image.src && !image.src.startsWith('data:image')) {
                }

                imageObserver.observe(image);
            });
        }
    });
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft',
        'ArrowRight', 'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
            konamiIndex++;
        } else {
            konamiIndex = 0;
            if (e.key.toLowerCase() === konamiCode[0].toLowerCase()) {
                konamiIndex = 1;
            }
        }

        if (konamiIndex === konamiCode.length) {
            konamiIndex = 0;
            window.location.href = 'https://raw.githubusercontent.com/SAPH1TE/Bo-Wiltse-Site/main/ect/2.webp';
        }
    });
