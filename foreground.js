window.onload = function () {
    const callback = function (mutationList, observer) {
        mutationList.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (item) {
                if (item.nodeType === Node.ELEMENT_NODE) {
                    const buttons = item.querySelectorAll("button[data-cy='horse-card-price-button']");
                    if (buttons.length > 0) {
                        convertPriceToUSD(buttons);
                    }
                }
            });
        });
    };

function convertPriceToUSD(buttons) {
    buttons.forEach((button) => {
        const spanElement = button.querySelector("span");
        const svgElement = spanElement.querySelector("svg");

        const text = spanElement.textContent;
        const match = text.match(/\d+[\d,]*\.?\d*/);

        if (match) {
            const number = parseFloat(match[0].replace(/,/g, ''));
            const usd = (number / 80).toFixed(2);
            
            button.addEventListener('mouseenter', () => {
                spanElement.textContent = `$${usd}`;
                spanElement.insertBefore(svgElement, spanElement.firstChild);
            });

            button.addEventListener('mouseleave', () => {
                spanElement.textContent = text;
                spanElement.insertBefore(svgElement, spanElement.firstChild);
            });
        }
    });
}



    function addObserverIfDesiredNodeAvailable() {
        const urlPathname = window.location.pathname;

        if (urlPathname.includes('/races')) {
            handleRacesPage();
        } else if (urlPathname.includes('/breeding')) {
            handleBreedingPage();
        } else if (urlPathname.includes('/marketplace')) {
            handleMarketplacePage();
        } else {
            console.log('Not a supported page');
            return;
        }

        const initialButtons = document.querySelectorAll("button[data-cy='horse-card-price-button']");
        if (initialButtons.length === 0) {
            window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
            return;
        }

        // Perform the conversion for the initial set of buttons
        convertPriceToUSD(initialButtons);

        // Observe the entire document for added nodes
        var config = { childList: true, subtree: true };
        const observer = new MutationObserver(callback);
        observer.observe(document, config);
    }

    function handleRacesPage() {
        console.log('Handling races page');
        // Add your races page-specific code here
    }

    function handleBreedingPage() {
        console.log('Handling breeding page');
        // Add your breeding page-specific code here
    }

    function handleMarketplacePage() {
        console.log('Handling marketplace page');
        // Add your marketplace page-specific code here
    }
    let lastURL = window.location.href;

    function checkURLChange() {
        const currentURL = window.location.href;

        if (lastURL !== currentURL) {
            lastURL = currentURL;
            addObserverIfDesiredNodeAvailable();
        }

        setTimeout(checkURLChange, 500);
    }

    checkURLChange();
    addObserverIfDesiredNodeAvailable();
};
