/* =====================================================
   SUMIT PORTFOLIO JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       CUSTOM CURSOR
    ================================================= */

    const cursor = document.querySelector(".cursor");
    const cursorRing = document.querySelector(".cursor-ring");

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    function animateCursor() {

        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    /* =================================================
       CURSOR HOVER EFFECT
    ================================================= */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .project, .tech-card, .about-card"
        );

    interactiveElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            cursorRing.style.width = "60px";
            cursorRing.style.height = "60px";

            cursorRing.style.borderColor =
                "rgba(0,245,255,.8)";
        });

        element.addEventListener("mouseleave", () => {

            cursorRing.style.width = "38px";
            cursorRing.style.height = "38px";

            cursorRing.style.borderColor =
                "rgba(0,245,255,.6)";
        });

    });


    /* =================================================
       MOBILE MENU
    ================================================= */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");

    mobileMenu.addEventListener("click", () => {

        sidebar.classList.toggle("open");

        const spans =
            mobileMenu.querySelectorAll("span");

        if (sidebar.classList.contains("open")) {

            spans[0].style.transform =
                "rotate(45deg) translate(5px,5px)";

            spans[1].style.opacity = "0";

            spans[2].style.transform =
                "rotate(-45deg) translate(5px,-5px)";

        } else {

            spans[0].style.transform = "";
            spans[1].style.opacity = "";
            spans[2].style.transform = "";
        }

    });


    /* =================================================
       CLOSE MOBILE MENU
    ================================================= */

    document.querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                sidebar.classList.remove("open");

            });

        });


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 300;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.classList.add("active");
            }

        });

    });


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =================================================
       TYPING EFFECT
    ================================================= */

    const typingText =
        document.getElementById("typingText");

    const words = [

        "Frontend Developer",
        "Creative Coder",
        "UI Enthusiast",
        "Web Designer"

    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord =
            words[wordIndex];

        if (!deleting) {

            typingText.textContent =
                currentWord.substring(
                    0,
                    charIndex + 1
                );

            charIndex++;

            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(
                    typeEffect,
                    1500
                );

                return;
            }

        } else {

            typingText.textContent =
                currentWord.substring(
                    0,
                    charIndex - 1
                );

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    words.length;

            }

        }

        setTimeout(
            typeEffect,
            deleting ? 50 : 100
        );
    }

    typeEffect();


    /* =================================================
       MAGNETIC BUTTONS
    ================================================= */

    const magneticButtons =
        document.querySelectorAll(".magnetic");

    magneticButtons.forEach(button => {

        button.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    e.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * .15}px,
                    ${y * .15}px)`;
            }
        );

        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    });


    /* =================================================
       3D TILT
    ================================================= */

    const tiltCards =
        document.querySelectorAll(".tilt");

    tiltCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) / 20;

                const rotateY =
                    (centerX - x) / 20;

                card.style.transform =
                    `perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)`;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =================================================
       COPY EMAIL
    ================================================= */

    const copyEmail =
        document.querySelector(".copy-email");

    if (copyEmail) {

        copyEmail.addEventListener(
            "click",
            async () => {

                const email =
                    copyEmail.dataset.email;

                try {

                    await navigator.clipboard.writeText(
                        email
                    );

                    const original =
                        copyEmail.innerHTML;

                    copyEmail.innerHTML =
                        "<span>EMAIL COPIED ✓</span>";

                    setTimeout(() => {

                        copyEmail.innerHTML =
                            original;

                    }, 1500);

                } catch (error) {

                    window.location.href =
                        `mailto:${email}`;

                }

            }
        );

    }


    /* =================================================
       PARTICLES
    ================================================= */

    const canvas =
        document.getElementById("particles");

    const ctx =
        canvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    class Particle {

        constructor() {

            this.x =
                Math.random() *
                canvas.width;

            this.y =
                Math.random() *
                canvas.height;

            this.size =
                Math.random() * 1.5;

            this.speedX =
                (Math.random() - .5) * .3;

            this.speedY =
                (Math.random() - .5) * .3;

            this.opacity =
                Math.random() * .5;
        }

        update() {

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0)
                this.x = canvas.width;

            if (this.x > canvas.width)
                this.x = 0;

            if (this.y < 0)
                this.y = canvas.height;

            if (this.y > canvas.height)
                this.y = 0;
        }

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(0,245,255,
                ${this.opacity})`;

            ctx.fill();
        }
    }


    function createParticles() {

        particles = [];

        const amount =
            Math.min(
                100,
                Math.floor(
                    window.innerWidth / 12
                )
            );

        for (
            let i = 0;
            i < amount;
            i++
        ) {

            particles.push(
                new Particle()
            );
        }
    }

    createParticles();


    function particleAnimation() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach(particle => {

            particle.update();
            particle.draw();

        });

        requestAnimationFrame(
            particleAnimation
        );
    }

    particleAnimation();


    /* =================================================
       MOUSE GLOW
    ================================================= */

    document.addEventListener(
        "mousemove",
        (e) => {

            const x =
                (e.clientX /
                    window.innerWidth) *
                100;

            const y =
                (e.clientY /
                    window.innerHeight) *
                100;

            document.body.style.setProperty(
                "--mouse-x",
                `${x}%`
            );

            document.body.style.setProperty(
                "--mouse-y",
                `${y}%`
            );

        }
    );


    /* =================================================
       BACK TO TOP
    ================================================= */

    const backTop =
        document.getElementById("backTop");

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                backTop.classList.add("show");

            } else {

                backTop.classList.remove("show");

            }

        }
    );

    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =================================================
       FOOTER YEAR
    ================================================= */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =================================================
       PROJECT HOVER SOUND-LIKE VISUAL EFFECT
    ================================================= */

    document.querySelectorAll(".project")
        .forEach(project => {

            project.addEventListener(
                "mouseenter",
                () => {

                    project.style.setProperty(
                        "--glow-opacity",
                        "1"
                    );

                }
            );

            project.addEventListener(
                "mouseleave",
                () => {

                    project.style.setProperty(
                        "--glow-opacity",
                        "0"
                    );

                }
            );

        });


    /* =================================================
       PAGE LOAD ANIMATION
    ================================================= */

    setTimeout(() => {

        document.body.classList.add(
            "loaded"
        );

    }, 100);

});