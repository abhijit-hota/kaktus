const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const hide = (queryString) => ($(queryString).style.display = "none");
const show = (queryString) => ($(queryString).style.display = "");

const toggle = (queryString) => {
  const elem = $(queryString);
  if (elem.style.display === "none") {
    elem.style.display = "";
  } else {
    elem.style.display = "none";
  }
};

const scrollUp = (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return false;
};

function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(function () {
  /**
   * Shows the responsive navigation menu on mobile.
   */
  $$("#header > #nav > ul > .icon").forEach((node) => {
    node.addEventListener("click", function () {
      node.parentElement.classList.toggle("responsive");
    });
  });

  /**
   * Controls the different versions of  the menu in blog post articles
   * for Desktop, tablet and mobile.
   */
  if ($(".post")) {
    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($("#footer-post")) {
      var lastScrollTop = 0;
      window.addEventListener("scroll", function () {
        var topDistance = window.scrollY;
        if (topDistance > lastScrollTop) {
          // downscroll -> show menu
          hide("#footer-post");
        } else {
          // upscroll -> hide menu
          show("#footer-post");
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        hide("#nav-footer");
        hide("#toc-footer");
        hide("#share-footer");

        // show a "navigation" icon when close to the top of the page,
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          hide("#actions-footer > #top");
        } else if (topDistance > 100) {
          show("#actions-footer > #top");
        }
      });

      $("#actions-footer > #menu-toggle").addEventListener("click", (e) => {
        e.preventDefault();
        hide("#toc-footer");
        hide("#share-footer");
        toggle("#nav-footer");
        return false;
      });
      $("#actions-footer > #toc-toggle").addEventListener("click", (e) => {
        e.preventDefault();
        hide("#nav-footer");
        hide("#share-footer");
        toggle("#toc-footer");
        return false;
      });
      $("#actions-footer > #share-toggle").addEventListener("click", (e) => {
        e.preventDefault();
        hide("#nav-footer");
        hide("#toc-footer");
        toggle("#share-footer");
        return false;
      });

      $("#actions-footer > #top").addEventListener("click", scrollUp);
      $("#right-aside #top").addEventListener("click", scrollUp);
      $("#left-aside #share-btn").addEventListener("click", (e) => {
        e.preventDefault();
        toggle("#share");
        return false;
      });
    }
  }
});
