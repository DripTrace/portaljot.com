(function () {
    // Create the Plausible script element
    var plausibleScript = document.createElement('script');
    plausibleScript.defer = true;
    plausibleScript.setAttribute('data-domain', 'palmaview.llc'); // Replace with your domain if needed
    plausibleScript.src = "https://plausible.io/js/script.outbound-links.js";
    document.head.appendChild(plausibleScript);

    // Initialize Plausible tracking
    window.plausible = window.plausible || function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
    };
})();