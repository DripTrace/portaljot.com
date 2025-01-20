window.addEventListener('load', function () {
    // var filename = '../css/cda_sponsor.css?' + new Date().getTime();
    var filename = 'css/cda_sponsor.css';
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
    document.getElementsByTagName("head")[0].appendChild(fileref);

    let cdaSpots = ['ad2'];
    let cdaSpot = cdaSpots[Math.floor(Math.random() * cdaSpots.length)];

    let cdaLink, cdaSponsorName;

    switch (cdaSpot) {
        case "ad1":
            cdaLink = "https://bit.ly/dora-driptrace";
            cdaSponsorName = "Dora AI - Generate website ideas to Figma designs in seconds, Near-Perfect on first try.";
            break;
        case "ad2":
            cdaLink = "https://bit.ly/chromatic-driptrace";
            cdaSponsorName = "Chromatic - Visual testing for Storybook, Playwright & Cypress. Catch UI bugs before your users do.";
            break;
        case "ad3":
            cdaLink = "https://bit.ly/driptrace-dora-3d";
            cdaSponsorName = "Dora â€” Build sites with professional-grade animations and 3D interactions, zero code.";
            break;
        case "ad4":
            cdaLink = "https://bit.ly/driptrace-diviai";
            cdaSponsorName = "Divi AI: On demand content creation, code writing & image generation.";
            break;
        default:
            cdaLink = "https://bit.ly/driptrace-diviai";
            cdaSponsorName = "Divi AI: On demand content creation, code writing & image generation.";
    }

    var cda = document.createElement('div');
    cda.id = 'cdawrap';
    cda.className = 'cdawrap';
    cda.innerHTML = '<a href="' + cdaLink + '" class="cda-sponsor-link" target="_blank" rel="nofollow noopener">' + cdaSponsorName + '</a>';

    function insertCda() {
        const frameElement = document.getElementsByClassName('frame')[0];
        if (frameElement) {
            console.log("Frame element found");
            frameElement.appendChild(cda);
        } else {
            console.log("Frame element not found, retrying...");
            setTimeout(insertCda, 100);
        }
    }

    insertCda();
});