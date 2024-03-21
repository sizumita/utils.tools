!(function () {
    const css = document.createElement("style");
    css.type = "text/css";
    css.appendChild(
        document.createTextNode(
            `* {
               -webkit-transition: none !important;
               -moz-transition: none !important;
               -o-transition: none !important;
               -ms-transition: none !important;
               transition: none !important;
            }`,
        ),
    );
    document.head.appendChild(css);

    const e = localStorage.getItem("theme");
    if (e) {
        document.documentElement.classList.add("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
    }

    const _ = window.getComputedStyle(css).opacity;
    document.head.removeChild(css);
})();
