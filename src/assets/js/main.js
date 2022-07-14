"use strict";

// Mobile Menu
var mobileMenuButton = document.querySelectorAll(".mobile-menu-button");
var mobileMenu = document.querySelector(".mobile-menu");
Array.prototype.forEach.call(mobileMenuButton, function (el, i) {
  el.addEventListener("click", function (e) {
    mobileMenu.classList.toggle("hidden");
  });
}); // FAQ

var faq = document.querySelectorAll(".faq");
Array.prototype.forEach.call(faq, function (el, i) {
  el.addEventListener("click", function (e) {
    var elTargetAttr = el.getAttribute("data-target");
    var elTarget = document.getElementById(elTargetAttr);
    var elIcon = el.querySelector("i");
    elTarget.classList.toggle("hidden");
    elIcon.classList.toggle("-rotate-180");
  });
}); // Main Menu ScrollTo

var scrollto = document.querySelectorAll(".scrollto");
Array.prototype.forEach.call(scrollto, function (el, i) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    var elTargetAttr = el.getAttribute("data-target");
    var elTarget = document.getElementById(elTargetAttr);
    elTarget.scrollIntoView({
      behavior: "smooth"
    });
  });
});