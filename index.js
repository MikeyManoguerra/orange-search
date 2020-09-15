"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
(function () {
    // // const re = /(?<=12445)\s/
    function matchZipCodes(textToSearch) {
        // find sequence of 5 digits
        // empty slice makes a shallow copy
        var regResults = textToSearch.match(/\d{5,5}/g);
        console.log(regResults);
        return regResults ? regResults.slice() : [];
    }
    function filterForUserZip(zipCodeArray, zipCode) {
        return zipCodeArray.filter(function (zip) { return zip === zipCode; });
    }
    function handleSingleZipSearch(textToSearch, zipCode) {
        var zipcodeArray = matchZipCodes(textToSearch);
        return filterForUserZip(zipcodeArray, zipCode);
    }
    function compileFilteredZips(textToSearch, zipCodeArray) {
        // create new array of zips within range
        return zipCodeArray.reduce(function (filteredZips, zipCode) {
            var foundZip = handleSingleZipSearch(textToSearch, zipCode);
            // TODO assign to a set
            return foundZip ? __spreadArrays(filteredZips, foundZip) : null;
        }, []);
    }
    function getFullAddresses(textToSearch, filteredZipCodes) {
        // take zips within range and get full address from original string
        return filteredZipCodes.map(function (zipCode) {
            var fullAddress;
            var addressRegex = new RegExp("(?<=\\n).*?" + zipCode, 'g');
            var addressArray = textToSearch.match(addressRegex);
            console.log(addressArray);
            // Todo, handle doubles:
            addressArray ? fullAddress = addressArray[0] : fullAddress = '';
            return fullAddress;
        });
    }
    function handleSearch(locationsString, zipArray) {
        // top level search function
        var testingFilters = compileFilteredZips(locationsString, zipArray);
        return getFullAddresses(locationsString, testingFilters);
    }
    // DOM manipulation below
    function handleAssembly(locationDiv, searchResults) {
        // build results html
        searchResults.forEach(function (loc) {
            var locationElement = document.createElement('p');
            locationElement.textContent = loc;
            locationDiv.appendChild(locationElement);
        });
        return locationDiv;
    }
    function handleNoResults(locationDiv) {
        // provide message on no results
        var locationElement = document.createElement('p');
        locationElement.textContent = 'No results found';
        locationDiv.appendChild(locationElement);
        return locationDiv;
    }
    function assembleLocations(searchResults) {
        var locationResults = document.getElementById('locations');
        var locations = document.createElement('div');
        locations.id = 'locations';
        searchResults.length ? locations = handleAssembly(locations, searchResults) : locations = handleNoResults(locations);
        //insert into DOM
        locationResults.parentElement.replaceChild(locations, locationResults);
    }
    function getInputText() {
        // cast new type to access .value
        var addressesText = document.getElementById('textbox').value;
        return handleSearch(addressesText, zipCodesWithin30Miles);
    }
    function clickTheButton() {
        var button = document.querySelector('button');
        button.addEventListener('click', function () {
            var addressesArray = getInputText();
            assembleLocations(addressesArray);
        });
    }
    clickTheButton();
}());
