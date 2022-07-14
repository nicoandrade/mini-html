// Mobile Menu
let mobileMenuButton = document.querySelectorAll(".mobile-menu-button");
let mobileMenu = document.querySelector(".mobile-menu");
Array.prototype.forEach.call(mobileMenuButton, function (el, i) {
    el.addEventListener("click", (e) => {
        mobileMenu.classList.toggle("hidden");
    });
});

// FAQ
let faq = document.querySelectorAll(".faq");
Array.prototype.forEach.call(faq, function (el, i) {
    el.addEventListener("click", (e) => {
        let elTargetAttr = el.getAttribute("data-target");
        let elTarget = document.getElementById(elTargetAttr);
        var elIcon = el.querySelector("i");
        elTarget.classList.toggle("hidden");
        elIcon.classList.toggle("-rotate-180");
    });
});

// Main Menu ScrollTo
let scrollto = document.querySelectorAll(".scrollto");
Array.prototype.forEach.call(scrollto, function (el, i) {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        let elTargetAttr = el.getAttribute("data-target");
        let elTarget = document.getElementById(elTargetAttr);
        elTarget.scrollIntoView({
            behavior: "smooth",
        });
    });
});
