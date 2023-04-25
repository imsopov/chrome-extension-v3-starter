window.onload = function () {

    const callback = function (mutationList, observer) {

        const newRaces = [];
        var races = document.querySelector("ul[data-cy='races-sub-races-open-for-entry-container']");

        mutationList.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (item) {
                var derbyvalues = item.querySelectorAll(".space-x-1");
                convertToUSD(derbyvalues);

            });
            observer.disconnect();
            var config = { childList: true };
            observer.observe(races, config);
        });

    };


    function convertToUSD(listOfRaces) {

        listOfRaces.forEach(function (race) {

            const text = race.textContent;
            const match = text.match(/\d+\.\d/);
            if (match) {
                let usd = 0;
                if (match.input.includes('K')) {
                    usd = ((match.toString() * 1000) / 80).toFixed(2)
                }
                else {
                    usd = (match.toString() / 80).toFixed(2);
                }
                race.insertAdjacentHTML('afterend', '<p class="font-inter text-base text-white"> $' + usd + '</p>');
            }
        });
    }

    function addObserverIfDesiredNodeAvailable() {

        var races = document.querySelector("ul[data-cy='races-sub-races-open-for-entry-container']")
        if (!races) {
            //The node we need does not exist yet.
            //Wait 500ms and try again
            window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
            return;
        }

        convertToUSD(document.querySelectorAll(".space-x-1"));
        var config = { childList: true };
        const observer = new MutationObserver(callback);
        observer.observe(races, config);

    }

    addObserverIfDesiredNodeAvailable();



}






