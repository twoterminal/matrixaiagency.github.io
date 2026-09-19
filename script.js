document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            mainNav.classList.toggle("active");

            const isOpen =
                mainNav.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.innerHTML =
                isOpen ? "✕" : "☰";

        });


        /* Close mobile menu when a link is clicked */

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML = "☰";

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", function (event) {

            const clickedInsideNav =
                mainNav.contains(event.target);

            const clickedMenu =
                menuToggle.contains(event.target);

            if (
                !clickedInsideNav &&
                !clickedMenu &&
                mainNav.classList.contains("active")
            ) {

                mainNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML = "☰";

            }

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header =
                document.querySelector(
                    ".site-header"
                );

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );

    faqItems.forEach(function (item) {

        item.addEventListener(
            "toggle",
            function () {

                if (!item.open) {
                    return;
                }

                faqItems.forEach(
                    function (otherItem) {

                        if (
                            otherItem !== item &&
                            otherItem.open
                        ) {

                            otherItem.open = false;

                        }

                    }
                );

            }
        );

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(
            ".site-header"
        );

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {

            header.style.background =
                "rgba(5, 14, 25, 0.94)";

            header.style.boxShadow =
                "0 10px 40px rgba(0,0,0,0.18)";

        } else {

            header.style.background =
                "rgba(7, 17, 31, 0.78)";

            header.style.boxShadow =
                "none";

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();


    /* =====================================================
       PHONE DEMO CLICK
    ===================================================== */

    const phoneLinks =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );

    phoneLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                console.log(
                    "CallSathi AI demo call initiated."
                );

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".problem-card, " +
            ".step-card, " +
            ".feature-card, " +
            ".industry-card, " +
            ".pricing-card"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (
                    entries,
                    observerInstance
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observerInstance.unobserve(
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


        revealElements.forEach(
            function (element) {

                observer.observe(element);

            }
        );

    } else {

        /* Fallback for older browsers */

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       WEBSITE LOADED
    ===================================================== */

    console.log(
        "CallSathi AI website loaded successfully."
    );

});
