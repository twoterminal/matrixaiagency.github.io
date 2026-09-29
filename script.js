document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOBILE NAVIGATION
       ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            mainNav.classList.toggle("active");

            const isOpen = mainNav.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.innerHTML = isOpen ? "✕" : "☰";
        });

        const navLinks = mainNav.querySelectorAll("a");

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


    /* =========================================
       CURRENT YEAR
       ========================================= */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =========================================
       SMOOTH ANCHOR SCROLLING
       ========================================= */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header =
                document.querySelector(".site-header");

            const headerHeight =
                header ? header.offsetHeight : 0;

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


    /* =========================================
       FAQ ACCORDION
       ========================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        item.addEventListener("toggle", function () {

            if (!item.open) {
                return;
            }

            faqItems.forEach(function (otherItem) {

                if (
                    otherItem !== item &&
                    otherItem.open
                ) {
                    otherItem.open = false;
                }

            });

        });

    });


    /* =========================================
       HEADER SCROLL EFFECT
       ========================================= */

    const header =
        document.querySelector(".site-header");

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


    /* =========================================
       CALLSATHI AI DEMO CALL MODAL
       ========================================= */

    const callModal =
        document.getElementById("callModal");

    const callModalClose =
        document.getElementById("callModalClose");

    const demoCallForm =
        document.getElementById("demoCallForm");

    const demoPhone =
        document.getElementById("demoPhone");

    const callNowButton =
        document.getElementById("callNowButton");

    const callButtonText =
        document.getElementById("callButtonText");

    const demoCallStatus =
        document.getElementById("demoCallStatus");


    /*
     * IMPORTANT:
     *
     * Replace this URL with your Hostinger
     * PHP endpoint in Step 3.
     *
     * Example:
     *
     * https://yourdomain.com/api/call-demo.php
     */

    const CALL_API_URL =
        "https://YOUR-HOSTINGER-DOMAIN.com/api/call-demo.php";


    /* =========================================
       OPEN MODAL
       ========================================= */

    function openCallModal(event) {

        if (event) {
            event.preventDefault();
        }

        if (!callModal) {
            return;
        }

        callModal.classList.add("active");

        callModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

        setTimeout(function () {

            if (demoPhone) {
                demoPhone.focus();
            }

        }, 150);

    }


    /* =========================================
       CLOSE MODAL
       ========================================= */

    function closeCallModal() {

        if (!callModal) {
            return;
        }

        callModal.classList.remove("active");

        callModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    /* =========================================
       DEMO PHONE TRIGGERS
       ========================================= */

    const demoTriggers =
        document.querySelectorAll(".demo-trigger");

    demoTriggers.forEach(function (trigger) {

        trigger.addEventListener(
            "click",
            openCallModal
        );

    });


    /* =========================================
       CLOSE BUTTON
       ========================================= */

    if (callModalClose) {

        callModalClose.addEventListener(
            "click",
            closeCallModal
        );

    }


    /* =========================================
       CLOSE WHEN CLICKING OUTSIDE MODAL
       ========================================= */

    if (callModal) {

        callModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === callModal
                ) {
                    closeCallModal();
                }

            }
        );

    }


    /* =========================================
       CLOSE WITH ESCAPE KEY
       ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                callModal &&
                callModal.classList.contains("active")
            ) {
                closeCallModal();
            }

        }
    );


    /* =========================================
       PHONE NUMBER NORMALIZATION
       ========================================= */

function normalizePhone(value) {

    if (!value) {
        return null;
    }

    /*
     * Keep digits only.
     */
    let phone = value.replace(/\D/g, "");

    /*
     * Indian mobile number must contain
     * exactly 10 digits.
     */
    if (!/^[6-9]\d{9}$/.test(phone)) {
        return null;
    }

    /*
     * Convert to E.164 format.
     */
    return "+91" + phone;
}


    /* =========================================
       STATUS MESSAGE
       ========================================= */

    function showCallStatus(
        message,
        type
    ) {

        if (!demoCallStatus) {
            return;
        }

        demoCallStatus.textContent =
            message;

        demoCallStatus.className =
            "demo-call-status";

        if (type) {
            demoCallStatus.classList.add(
                type
            );
        }

    }


    /* =========================================
       SUBMIT DEMO CALL REQUEST
       ========================================= */

    if (demoCallForm) {

        demoCallForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /*
                 * Get visitor phone number
                 */

                const rawPhone =
                    demoPhone
                        ? demoPhone.value
                        : "";


                /*
                 * Normalize number
                 */

                const phone =
                    normalizePhone(
                        rawPhone
                    );


                /*
                 * Validate number
                 */

                if (!phone) {

                    showCallStatus(
                       "Please enter a valid 10-digit Indian mobile number.",
                       "error"
                    );

                    if (demoPhone) {
                        demoPhone.focus();
                    }

                    return;
                }


                /*
                 * Prevent multiple submissions
                 */

                if (callNowButton) {

                    callNowButton.disabled =
                        true;

                }

                if (callButtonText) {

                    callButtonText.textContent =
                        "Calling you...";

                }


                showCallStatus(
                    "Connecting your call. Please wait...",
                    "loading"
                );


                try {

                    /*
                     * Send phone number
                     * to Hostinger backend.
                     */

                    const response =
                        await fetch(
                            CALL_API_URL,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({
                                    phone: phone
                                })
                            }
                        );


                    /*
                     * Read server response
                     */

                    let result;

                    try {

                        result =
                            await response.json();

                    } catch (jsonError) {

                        throw new Error(
                            "Invalid response from server."
                        );

                    }


                    /*
                     * Handle backend error
                     */

                    if (
                        !response.ok ||
                        !result.success
                    ) {

                        throw new Error(
                            result.message ||
                            "Unable to start the call."
                        );

                    }


                    /*
                     * SUCCESS
                     */

                    showCallStatus(
                        "Your call has been initiated. Please answer the call from +91 8065354620.",
                        "success"
                    );


                    if (callButtonText) {

                        callButtonText.textContent =
                            "Call Requested";

                    }


                    /*
                     * Clear phone input
                     */

                    if (demoPhone) {
                        demoPhone.value = "";
                    }


                    console.log(
                        "CallSathi AI call initiated.",
                        result
                    );


                } catch (error) {

                    console.error(
                        "CallSathi AI call error:",
                        error
                    );


                    showCallStatus(
                        error.message ||
                        "Something went wrong. Please try again.",
                        "error"
                    );


                    /*
                     * Re-enable button
                     */

                    if (callNowButton) {

                        callNowButton.disabled =
                            false;

                    }

                    if (callButtonText) {

                        callButtonText.textContent =
                            "Call Me Now";

                    }

                }

            }
        );

    }


    /* =========================================
       SCROLL REVEAL ANIMATIONS
       ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".problem-card, " +
            ".step-card, " +
            ".feature-card, " +
            ".industry-card, " +
            ".pricing-card"
        );


    if (
        "IntersectionObserver" in window
    ) {

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

                observer.observe(
                    element
                );

            }
        );


    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =========================================
       GENERAL PHONE LINK LOG
       ========================================= */

    const phoneLinks =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );

    phoneLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    console.log(
                        "CallSathi AI demo call initiated."
                    );

                }
            );

        }
    );


    /* =========================================
       INITIALIZATION MESSAGE
       ========================================= */

    console.log(
        "CallSathi AI website loaded successfully."
    );

});
