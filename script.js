/* =========================================================
   HANZ MC / MR. MIC
   MAIN WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PRELOADER
    ===================================================== */

    document.body.classList.add("loading");

    window.addEventListener("load", () => {

        setTimeout(() => {

            const loader = document.querySelector(".loader");

            if (loader) {
                loader.classList.add("hide");
            }

            document.body.classList.remove("loading");

        }, 2200);

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const active =
                mobileMenu.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                active
            );

            menuToggle.setAttribute(
                "aria-expanded",
                active ? "true" : "false"
            );

        });


        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor =
        document.querySelector(".cursor");

    const cursorFollower =
        document.querySelector(".cursor-follower");


    let mouseX = 0;
    let mouseY = 0;

    let followerX = 0;
    let followerY = 0;


    if (cursor && cursorFollower) {

        window.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        });


        function animateCursor() {

            cursor.style.left =
                `${mouseX}px`;

            cursor.style.top =
                `${mouseY}px`;


            followerX +=
                (mouseX - followerX) * 0.12;

            followerY +=
                (mouseY - followerY) * 0.12;


            cursorFollower.style.left =
                `${followerX}px`;

            cursorFollower.style.top =
                `${followerY}px`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .gallery-item, .event-row, .hero-image"
            );


        interactiveElements.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorFollower.classList.add(
                        "active"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursorFollower.classList.remove(
                        "active"
                    );

                }
            );

        });

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroBack =
        document.querySelector(".hero-image-back");

    const heroMain =
        document.querySelector(".hero-image-main");

    const heroSmall =
        document.querySelector(".hero-image-small");


    if (
        hero &&
        heroBack &&
        heroMain &&
        heroSmall
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900) {
                    return;
                }


                const x =
                    event.clientX /
                    window.innerWidth -
                    0.5;


                const y =
                    event.clientY /
                    window.innerHeight -
                    0.5;


                heroBack.style.transform =
                    `translate(${x * 30}px, ${y * 25}px) rotate(6deg)`;


                heroMain.style.transform =
                    `translate(${x * -20}px, ${y * -20}px) rotate(-4deg)`;


                heroSmall.style.transform =
                    `translate(${x * 45}px, ${y * 35}px) rotate(8deg)`;

            }
        );

    }


    /* =====================================================
       GALLERY
    ===================================================== */

    const galleryImages = [

        "pics/hanzmc1.jpg",
        "pics/hanzsit2.jpeg",
        "pics/hanzsit1.png",
        "pics/long2.png",
        "pics/hanzstand.png",
        "pics/hanzsit3.jpeg",
        "pics/hanzsit4.jpg",
        "pics/long1.png",
        "pics/about.jpeg",
        "pics/hanzmc1.jpg",
        "pics/hanzsit2.jpeg",
        "pics/hanzstand.png",
        "pics/hanzsit1.png",
        "pics/hanzsit3.jpeg",
        "pics/hanzsit4.jpg",
        "pics/long2.png",
        "pics/long1.png",
        "pics/about.jpeg"

    ];


    const galleryGrid =
        document.getElementById(
            "galleryGrid"
        );


    const loadMore =
        document.getElementById(
            "loadMore"
        );


    let imagesPerLoad = 8;

    let currentLoaded = 0;


    function createGalleryItem(
        src,
        index
    ) {

        if (!galleryGrid) {
            return;
        }


        const item =
            document.createElement("div");


        item.classList.add(
            "gallery-item"
        );


        item.dataset.index =
            index;


        const image =
            document.createElement("img");


        image.src = src;

        image.alt =
            `Hanz MC moment ${index + 1}`;

        image.loading = "lazy";


        const number =
            document.createElement("span");


        number.classList.add(
            "gallery-number"
        );


        number.textContent =
            String(index + 1)
                .padStart(2, "0");


        item.appendChild(image);

        item.appendChild(number);

        galleryGrid.appendChild(item);


        item.addEventListener(
            "click",
            () => {

                openLightbox(index);

            }
        );


        requestAnimationFrame(() => {

            observeGalleryItem(item);

        });

    }


    function loadGalleryImages() {

        if (!galleryGrid) {
            return;
        }


        const nextImages =
            galleryImages.slice(
                currentLoaded,
                currentLoaded +
                    imagesPerLoad
            );


        nextImages.forEach(
            (image, index) => {

                createGalleryItem(
                    image,
                    currentLoaded + index
                );

            }
        );


        currentLoaded +=
            nextImages.length;


        if (
            loadMore &&
            currentLoaded >=
                galleryImages.length
        ) {

            loadMore.style.display =
                "none";

        }

    }


    if (loadMore) {

        loadMore.addEventListener(
            "click",
            loadGalleryImages
        );

    }


    loadGalleryImages();


    /* =====================================================
       GALLERY REVEAL
    ===================================================== */

    let galleryObserver;


    if ("IntersectionObserver" in window) {

        galleryObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                galleryObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );

    }


    function observeGalleryItem(item) {

        if (galleryObserver) {

            galleryObserver.observe(item);

        } else {

            item.classList.add(
                "visible"
            );

        }

    }


    /* =====================================================
       GENERAL SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".intro-image, .media-card, .event-row, .booking-image"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "reveal-active"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal-active"
                );

            }
        );

    }


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    const lightbox =
        document.getElementById(
            "lightbox"
        );


    const lightboxImage =
        document.querySelector(
            ".lightbox-image img"
        );


    const closeLightbox =
        document.querySelector(
            ".lightbox-close"
        );


    const prevButton =
        document.querySelector(
            ".lightbox-prev"
        );


    const nextButton =
        document.querySelector(
            ".lightbox-next"
        );


    const currentImage =
        document.getElementById(
            "currentImage"
        );


    const totalImages =
        document.getElementById(
            "totalImages"
        );


    let currentIndex = 0;


    if (totalImages) {

        totalImages.textContent =
            String(
                galleryImages.length
            ).padStart(2, "0");

    }


    function openLightbox(index) {

        if (!lightbox || !lightboxImage) {
            return;
        }


        currentIndex = index;


        lightbox.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";


        updateLightbox();

    }


    function closeLightboxFunction() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";

    }


    function updateLightbox() {

        if (
            !lightboxImage ||
            galleryImages.length === 0
        ) {

            return;

        }


        lightboxImage.src =
            galleryImages[
                currentIndex
            ];


        lightboxImage.alt =
            `Hanz MC moment ${currentIndex + 1}`;


        if (currentImage) {

            currentImage.textContent =
                String(
                    currentIndex + 1
                ).padStart(2, "0");

        }

    }


    function nextImage() {

        if (
            galleryImages.length === 0
        ) {

            return;

        }


        currentIndex++;


        if (
            currentIndex >=
            galleryImages.length
        ) {

            currentIndex = 0;

        }


        updateLightbox();

    }


    function previousImage() {

        if (
            galleryImages.length === 0
        ) {

            return;

        }


        currentIndex--;


        if (currentIndex < 0) {

            currentIndex =
                galleryImages.length - 1;

        }


        updateLightbox();

    }


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            closeLightboxFunction
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextImage
        );

    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            previousImage
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightboxFunction();

                }

            }
        );


        lightbox.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            event => {

                const touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const distance =
                    touchEndX -
                    touchStartX;


                if (
                    Math.abs(distance) <
                    50
                ) {

                    return;

                }


                if (distance < 0) {

                    nextImage();

                } else {

                    previousImage();

                }

            },
            {
                passive: true
            }
        );

    }


    let touchStartX = 0;


    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (
                event.key ===
                "Escape"
            ) {

                closeLightboxFunction();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                nextImage();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousImage();

            }

        }
    );


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    const parallaxImages =
        document.querySelectorAll(
            ".intro-image img, .media-image img, .booking-image img"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.innerWidth <
                900
            ) {

                return;

            }


            parallaxImages.forEach(
                image => {

                    const parent =
                        image.parentElement;


                    if (!parent) {
                        return;
                    }


                    const rect =
                        parent.getBoundingClientRect();


                    const viewportCenter =
                        window.innerHeight /
                        2;


                    const distance =
                        rect.top +
                        rect.height / 2 -
                        viewportCenter;


                    const movement =
                        distance * -0.035;


                    image.style.transform =
                        `translateY(${movement}px) scale(1.04)`;

                }
            );

        }
    );


    /* =====================================================
       EVENT ROW MOVEMENT
    ===================================================== */

    const eventRows =
        document.querySelectorAll(
            ".event-row"
        );


    eventRows.forEach(row => {

        row.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth <
                    900
                ) {

                    return;

                }


                const rect =
                    row.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const moveX =
                    (
                        x / rect.width -
                        0.5
                    ) * 8;


                const moveY =
                    (
                        y / rect.height -
                        0.5
                    ) * 4;


                row.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;

            }
        );


        row.addEventListener(
            "mouseleave",
            () => {

                row.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       MAGNETIC BOOKING BUTTON
    ===================================================== */

    const bookingButton =
        document.querySelector(
            ".booking-button"
        );


    if (bookingButton) {

        bookingButton.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth <
                    900
                ) {

                    return;

                }


                const rect =
                    bookingButton.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                bookingButton.style.transform =
                    `translate(${x * 0.18}px, ${y * 0.18}px)`;

            }
        );


        bookingButton.addEventListener(
            "mouseleave",
            () => {

                bookingButton.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       HERO IMAGE HOVER
    ===================================================== */

    document
        .querySelectorAll(".hero-image")
        .forEach(image => {

            const img =
                image.querySelector("img");


            if (!img) {
                return;
            }


            image.addEventListener(
                "mouseenter",
                () => {

                    img.style.transform =
                        "scale(1.08)";

                }
            );


            image.addEventListener(
                "mouseleave",
                () => {

                    img.style.transform =
                        "scale(1)";

                }
            );

        });


    /* =====================================================
       SECTION NUMBER PARALLAX
    ===================================================== */

    const sectionNumbers =
        document.querySelectorAll(
            ".section-number"
        );


    window.addEventListener(
        "scroll",
        () => {

            sectionNumbers.forEach(
                number => {

                    const parent =
                        number.parentElement;


                    if (!parent) {
                        return;
                    }


                    const rect =
                        parent.getBoundingClientRect();


                    const movement =
                        (
                            window.innerHeight / 2 -
                            (
                                rect.top +
                                rect.height / 2
                            )
                        ) * 0.05;


                    number.style.transform =
                        `translateY(${movement}px)`;

                }
            );

        }
    );


    /* =====================================================
       SIMPLE HERO TEXT ENTRANCE
       Adapted from the original Hanz MC script
    ===================================================== */

    const heroTitle =
        document.querySelector(
            ".hero-title"
        );


    const heroDescription =
        document.querySelector(
            ".hero-description"
        );


    const heroImages =
        document.querySelectorAll(
            ".hero-image"
        );


    if (heroTitle) {

        heroTitle.style.opacity = "0";

        heroTitle.style.transform =
            "translateY(30px)";


        setTimeout(() => {

            heroTitle.style.transition =
                "opacity 1s ease, transform 1s ease";

            heroTitle.style.opacity = "1";

            heroTitle.style.transform =
                "translateY(0)";

        }, 900);

    }


    if (heroDescription) {

        heroDescription.style.opacity =
            "0";


        heroDescription.style.transform =
            "translateY(20px)";


        setTimeout(() => {

            heroDescription.style.transition =
                "opacity 1s ease, transform 1s ease";

            heroDescription.style.opacity =
                "1";

            heroDescription.style.transform =
                "translateY(0)";

        }, 1100);

    }


    heroImages.forEach(
        (image, index) => {

            image.style.opacity = "0";

            image.style.transform =
                `${index === 0
                    ? "rotate(6deg)"
                    : index === 1
                        ? "rotate(-4deg)"
                        : "rotate(8deg)"
                } scale(.94)`;


            setTimeout(() => {

                image.style.transition =
                    "opacity 1s ease, transform 1.2s cubic-bezier(.16,1,.3,1)";


                image.style.opacity =
                    index === 0
                        ? ".72"
                        : index === 1
                            ? "1"
                            : ".85";


                image.style.transform =
                    `${index === 0
                        ? "rotate(6deg)"
                        : index === 1
                            ? "rotate(-4deg)"
                            : "rotate(8deg)"
                    } scale(1)`;

            }, 500 + (index * 180));

        }
    );

});