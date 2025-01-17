document.addEventListener("DOMContentLoaded", function () {
  const mainContent = document.getElementById("main_content");

  function setWidthVarsForMainContent() {
    if (mainContent) {
      const mainRect = mainContent.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(mainContent);
      const marginLeft = parseInt(computedStyle.marginLeft, 10);
      const marginRight = parseInt(computedStyle.marginRight, 10);
      document.documentElement.style.setProperty(
        "--main-width",
        mainRect.width + marginLeft + marginRight - 32 + "px"
      );
      for (let el of document.querySelectorAll(".wide")) {
        let left = 0;
        let elWidth = el.getBoundingClientRect().width;
        // Pixels of overflow...
        let overflow = elWidth - mainRect.width;
        let mainWidthWithMargins = mainRect.width + marginLeft + marginRight;
        if (overflow > 0) {
          if (mainWidthWithMargins > elWidth) {
            // in that case... we have room to "center" the wide element
            // within the margins...
            left = (elWidth - mainRect.width) / 2;
          } else {
            /* Otherwise, we don't fit, so let's just go as far left as possible *
            /* let widthToTheRight = mainRect.width + marginRight - 32; // 16px padding
            left = elWidth - widthToTheRight; */
            left = marginLeft - 16; // 16px padding
          }
        }
        el.style.setProperty("left", `-${left}px`);
      }
    }
  }

  setWidthVarsForMainContent();
  setTimeout(setWidthVarsForMainContent, 200);

  // ResizeObserver to watch for changes in the size of the main_content
  const resizeObserver = new ResizeObserver(() => setWidthVarsForMainContent());

  // Start observing the main_content
  resizeObserver.observe(mainContent);
  resizeObserver.observe(document.querySelector("#sidebar_wrap"));
});
