/* =========================================================
   SUCHI GOEL - PORTFOLIO SCRIPT
   Modern Animated Portfolio
   ========================================================= */


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-loaded");

    initializeTyping();
    initializeNavbar();
    initializeScrollReveal();
    initializeScrollProgress();
    initializeMobileMenu();
    initializeBackToTop();
    initializeCertificateModal();
    initializeProjectTilt();
    initializeCursorGlow();
    initializeAchievementSlider();
    initializeSmoothLinks();
});


/* =========================================================
   TYPING ANIMATION
   ========================================================= */

function initializeTyping() {

    const typingElement =
        document.querySelector(".typing-text");

    if (!typingElement) return;

    const words = [
        "AI & ML Enthusiast",
        "Data Analyst",
        "Full Stack Developer",
        "Problem Solver",
        "Software Developer"
    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function type() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            characterIndex++;

            typingElement.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );

            if (
                characterIndex ===
                currentWord.length
            ) {

                deleting = true;

                setTimeout(type, 1600);

                return;
            }

        } else {

            characterIndex--;

            typingElement.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );

            if (characterIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    words.length;
            }
        }

        const speed =
            deleting ? 55 : 100;

        setTimeout(type, speed);
    }

    type();
}


/* =========================================================
   NAVBAR
   ========================================================= */

function initializeNavbar() {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;

    function updateNavbar() {

        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        updateNavbar
    );

    updateNavbar();
}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");
        }
    });

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href ===
            `#${currentSection}`
        ) {

            link.classList.add("active");
        }
    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initializeScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elements.length) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

    elements.forEach(element => {

        observer.observe(element);
    });
}


/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

function initializeScrollProgress() {

    let progress =
        document.querySelector(
            ".scroll-progress"
        );

    if (!progress) {

        progress =
            document.createElement("div");

        progress.className =
            "scroll-progress";

        document.body.prepend(progress);
    }

    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) *
                  100
                : 0;

        progress.style.width =
            `${percentage}%`;
    }

    window.addEventListener(
        "scroll",
        updateProgress
    );

    updateProgress();
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );

    const navLinks =
        document.querySelector(
            ".nav-links"
        );

    if (!menuToggle || !navLinks)
        return;

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );

            const icon =
                menuToggle.querySelector("i");

            if (!icon) return;

            if (
                navLinks.classList.contains(
                    "active"
                )
            ) {

                icon.className =
                    "fas fa-times";

            } else {

                icon.className =
                    "fas fa-bars";
            }
        }
    );

    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );

                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );

                    if (icon) {
                        icon.className =
                            "fas fa-bars";
                    }
                }
            );
        });
}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function initializeSmoothLinks() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    )
                        return;

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    const navbarHeight =
                        document.querySelector(
                            ".navbar"
                        )?.offsetHeight || 0;

                    const targetPosition =
                        target.offsetTop -
                        navbarHeight;

                    window.scrollTo({
                        top:
                            targetPosition,
                        behavior:
                            "smooth"
                    });
                }
            );
        });
}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initializeBackToTop() {

    let button =
        document.querySelector(
            ".back-to-top"
        );

    if (!button) {

        button =
            document.createElement(
                "button"
            );

        button.className =
            "back-to-top";

        button.innerHTML =
            '<i class="fas fa-arrow-up"></i>';

        button.setAttribute(
            "aria-label",
            "Back to top"
        );

        document.body.appendChild(
            button
        );
    }

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add(
                    "visible"
                );

            } else {

                button.classList.remove(
                    "visible"
                );
            }
        }
    );

    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}


/* =========================================================
   CERTIFICATE IMAGE MODAL
   ========================================================= */

function initializeCertificateModal() {

    const certificateImages =
        document.querySelectorAll(
            ".cert-image, .certificate-image"
        );

    if (!certificateImages.length)
        return;

    let modal =
        document.querySelector(
            ".image-modal"
        );

    if (!modal) {

        modal =
            document.createElement(
                "div"
            );

        modal.className =
            "image-modal";

        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close"
                    aria-label="Close">
                    &times;
                </button>

                <img src="" alt="Certificate">
            </div>
        `;

        document.body.appendChild(
            modal
        );
    }

    const modalImage =
        modal.querySelector(
            ".modal-content img"
        );

    const closeButton =
        modal.querySelector(
            ".modal-close"
        );

    certificateImages.forEach(image => {

        image.addEventListener(
            "click",
            () => {

                modalImage.src =
                    image.src;

                modalImage.alt =
                    image.alt ||
                    "Certificate";

                modal.classList.add(
                    "active"
                );

                document.body.style
                    .overflow = "hidden";
            }
        );
    });

    function closeModal() {

        modal.classList.remove(
            "active"
        );

        document.body.style
            .overflow = "";
    }

    closeButton.addEventListener(
        "click",
        closeModal
    );

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {
                closeModal();
            }
        }
    );

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeModal();
            }
        }
    );
}


/* =========================================================
   PROJECT 3D TILT
   ========================================================= */

function initializeProjectTilt() {

    const cards =
        document.querySelectorAll(
            ".project-card"
        );

    if (!cards.length) return;

    // Disable tilt on touch/mobile devices
    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -4;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    5;

                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                    `;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );
    });
}


/* =========================================================
   CURSOR GLOW
   ========================================================= */

function initializeCursorGlow() {

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }

    let glow =
        document.querySelector(
            ".cursor-glow"
        );

    if (!glow) {

        glow =
            document.createElement(
                "div"
            );

        glow.className =
            "cursor-glow";

        document.body.appendChild(
            glow
        );
    }

    document.addEventListener(
        "mousemove",
        event => {

            glow.style.left =
                `${event.clientX}px`;

            glow.style.top =
                `${event.clientY}px`;
        }
    );
}


/* =========================================================
   ACHIEVEMENT SLIDER
   ========================================================= */

function initializeAchievementSlider() {

    const cards =
        document.querySelectorAll(
            ".achievement-card"
        );

    const dots =
        document.querySelectorAll(
            ".slider-dot"
        );

    if (!cards.length) return;

    let currentIndex = 0;

    function showSlide(index) {

        currentIndex =
            (index + cards.length) %
            cards.length;

        cards.forEach(
            (card, i) => {

                card.classList.toggle(
                    "active",
                    i === currentIndex
                );
            }
        );

        dots.forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === currentIndex
                );
            }
        );
    }

    dots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showSlide(index);
                }
            );
        }
    );

    showSlide(0);

    let autoSlide =
        setInterval(
            () => {

                showSlide(
                    currentIndex + 1
                );

            },
            4500
        );

    const slider =
        document.querySelector(
            ".achievement-slider"
        );

    if (slider) {

        slider.addEventListener(
            "mouseenter",
            () => {
                clearInterval(autoSlide);
            }
        );

        slider.addEventListener(
            "mouseleave",
            () => {

                autoSlide =
                    setInterval(
                        () => {

                            showSlide(
                                currentIndex + 1
                            );

                        },
                        4500
                    );
            }
        );
    }
}


/* =========================================================
   BUTTON RIPPLE EFFECT
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".btn"
            );

        if (!button) return;

        const ripple =
            document.createElement(
                "span"
            );

        ripple.style.position =
            "absolute";

        ripple.style.borderRadius =
            "50%";

        ripple.style.background =
            "rgba(255,255,255,0.35)";

        ripple.style.width = "10px";
        ripple.style.height = "10px";

        ripple.style.transform =
            "translate(-50%, -50%)";

        ripple.style.pointerEvents =
            "none";

        const rect =
            button.getBoundingClientRect();

        ripple.style.left =
            `${event.clientX - rect.left}px`;

        ripple.style.top =
            `${event.clientY - rect.top}px`;

        ripple.style.animation =
            "rippleEffect 0.6s ease-out";

        button.style.position =
            "relative";

        button.style.overflow =
            "hidden";

        button.appendChild(
            ripple
        );

        setTimeout(
            () => ripple.remove(),
            600
        );
    }
);


/* =========================================================
   RIPPLE ANIMATION
   ========================================================= */

const rippleStyle =
    document.createElement("style");

rippleStyle.textContent = `

@keyframes rippleEffect {

    from {
        width: 10px;
        height: 10px;
        opacity: 1;
    }

    to {
        width: 300px;
        height: 300px;
        opacity: 0;
    }

}
`;

document.head.appendChild(
    rippleStyle
);


/* =========================================================
   EXPERIENCE CARD STAGGER
   ========================================================= */

function addStaggerAnimation(
    selector
) {

    const elements =
        document.querySelectorAll(
            selector
        );

    elements.forEach(
        (element, index) => {

            element.style.transitionDelay =
                `${index * 0.12}s`;
        }
    );
}

addStaggerAnimation(
    ".experience-card"
);

addStaggerAnimation(
    ".skill-item"
);

addStaggerAnimation(
    ".tool-item"
);

addStaggerAnimation(
    ".cert-card"
);


/* =========================================================
   NUMBER COUNTER
   ========================================================= */

function animateCounter(
    element,
    target,
    duration = 1500
) {

    const startTime =
        performance.now();

    function update(currentTime) {

        const elapsed =
            currentTime -
            startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );

        const value =
            Math.floor(
                eased * target
            );

        element.textContent =
            value;

        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target;
        }
    }

    requestAnimationFrame(
        update
    );
}


/* =========================================================
   LAZY LOAD IMAGES
   ========================================================= */

const lazyImages =
    document.querySelectorAll(
        "img[data-src]"
    );

if (lazyImages.length) {

    const imageObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const image =
                                entry.target;

                            image.src =
                                image.dataset.src;

                            image.removeAttribute(
                                "data-src"
                            );

                            imageObserver.unobserve(
                                image
                            );
                        }
                    }
                );
            }
        );

    lazyImages.forEach(
        image =>
            imageObserver.observe(image)
    );
}


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.objectFit =
                    "contain";

                image.style.padding =
                    "20px";

                image.style.opacity =
                    "0.65";

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );
            }
        );
    });


/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        // Press Home to go to top
        if (
            event.key === "Home" &&
            !["INPUT", "TEXTAREA"].includes(
                document.activeElement.tagName
            )
        ) {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

        // Press End to go to bottom
        if (
            event.key === "End" &&
            !["INPUT", "TEXTAREA"].includes(
                document.activeElement.tagName
            )
        ) {

            window.scrollTo({
                top:
                    document.documentElement
                        .scrollHeight,

                behavior: "smooth"
            });
        }
    }
);


/* =========================================================
   PARALLAX EFFECT
   ========================================================= */

function initializeParallax() {

    const elements =
        document.querySelectorAll(
            ".hero-orb"
        );

    if (!elements.length) return;

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }

    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;

            elements.forEach(
                (element, index) => {

                    const speed =
                        (index + 1) *
                        0.08;

                    element.style.transform =
                        `translateY(${scroll * speed}px)`;
                }
            );
        }
    );
}

initializeParallax();


/* =========================================================
   CONTACT LINK HOVER EFFECT
   ========================================================= */

document
    .querySelectorAll(
        ".contact-link"
    )
    .forEach(link => {

        link.addEventListener(
            "mouseenter",
            () => {

                link.style.transition =
                    "0.3s ease";
            }
        );
    });


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(`
╔══════════════════════════════════════╗
║        SUCHI GOEL PORTFOLIO          ║
║                                      ║
║  AI/ML • Data Analytics • Web Dev   ║
║  GitHub: github.com/suchig9434       ║
║                                      ║
║  Thanks for visiting! 🚀             ║
╚══════════════════════════════════════╝
`);