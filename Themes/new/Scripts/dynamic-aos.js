document.addEventListener(
  "DOMContentLoaded",
  function () {
    let content = document.querySelector("#content");

    if (content === null) {
      content = document.querySelector("body");
    }

    // Get elements to animate
    let elementsToAnimate = content.querySelectorAll(
      "h1:not([data-aos], [data-aos] *), h2:not([data-aos], [data-aos] *), h3:not([data-aos], [data-aos] *), h4:not([data-aos], [data-aos] *), h5:not([data-aos], [data-aos] *), h6:not([data-aos], [data-aos] *), p:not([data-aos], [data-aos] *), i:not([data-aos], [data-aos] *), .dropdown-toggle"
    );

    // Loop through and add data attributes
    elementsToAnimate.forEach(function (element, index) {
      element.dataset.aos = "fade-up";
    });

    // Initiate AOS
    AOS.init({
      // Global settings:
      disable: "phone", // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
      initClassName: "aos-init", // class applied after initialization
      animatedClassName: "aos-animate", // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 100, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 500, // values from 0 to 3000, with step 50ms
      easing: "ease-in-out", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    });
  },
  false
);
