"use strict";
//  input of things to return
// given a string of text, will search through to find match to input
// if found return the surrounding 10 words
// import { testString, mondayString, fullEmailTest } from './strings';
(function (document) {
    var $ = document.getElementById.bind(document);
    var emailTest = "\nAL - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, ALICEVILLE, , AL 35442\nDE - 8/3/2019 - 8:00 AM-2:00 PM - Family Dollar, SEAFORD, , DE 19973\nDE - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, SEAFORD, , DE 19973\nIL - 8/3/2019 - 8:00 AM-2:00 PM - Family Dollar, WAUKEGAN, , IL 60085\nIL - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, CHICAGO, , IL 60629\nIL - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, CHICAGO, , IL 60647\nIL - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, LYONS, , IL 60534\nKY - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, STURGIS, , KY 42459\nMD - 8/3/2019 - 8:00 AM-2:00 PM - Family Dollar, HAGERSTOWN, , MD 21742\nMD - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, BALTIMORE, , MD 21239\nMD - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, HAGERSTOWN, , MD 21742\nMI - 8/3/2019 - 8:00 AM-2:00 PM - Family Dollar, MIO, , MI 48647\nMI - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, GRAND RAPIDS, , MI 49503\nMI - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, MIO, , MI 48647\nPA - 8/3/2019 - 8:00 AM-2:00 PM - Family Dollar, SHARON HILL, , PA 19079\nPA - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, SHARON HILL, , PA 19079\nSC - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, ANDERSON, , SC 29624\nSC - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, ELGIN, , SC 29045\nSC - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, HARDEEVILLE, , SC 29927\nSC - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, LONGS, , SC 29568\nSC - 8/3/2019 - 9:00 AM-1:00 PM - Family Dollar, UNION, , SC 29379";
    var zipCodesWithin20Miles = [
        '19125', '19122', '19123', '19134',
        '19133', '08102', '19106', '19108',
        '08105', '19109', '19107', '19190',
        '19195', '19092', '19093', '19099',
        '19101', '19105', '19019', '19140',
        '19155', '19160', '19161', '19162',
        '19170', '19171', '19172', '19173',
        '19175', '19177', '19178', '19179',
        '19181', '19182', '19183', '19184',
        '19185', '19187', '19188', '19191',
        '19192', '19193', '19194', '19196',
        '19197', '19244', '19255', '19110',
        '19102', '19137', '19130', '19132',
        '08103', '08110', '19121', '19124',
        '19147', '19103', '08101', '08109', '19120', '19104',
        '19146', '08104', '19129', '19141', '19148', '19144',
        '19135', '08065', '19149', '08107', '19131', '08108',
        '19126', '19145', '19012', '19138', '08030', '19139',
        '19143', '19004', '08002', '08076', '19119', '08059',
        '19111', '08106', '19112', '19027', '19127', '19142',
        '19066', '08077', '08033', '08052', '19136', '19150',
        '19152', '19151', '08035', '19128', '08099', '19095',
        '08031', '19176', '19072', '19050', '08093', '19082',
        '19096', '19118', '08063', '08034', '19046', '08007',
        '19023', '19115', '19114', '08045', '08078', '19038',
        '19079', '19153', '08057', '19003', '08049', '19035',
        '08029', '19018', '08003', '19026', '08075', '19075',
        '19032', '19444', '19083', '08086', '19001', '19036',
        '08083', '19031', '19041', '08096', '19154', '08054',
        '19113', '19006', '08066', '19098', '19074', '19043',
        '19116', '08097', '19029', '19009', '08084', '19025', '19076', '19010', '19070',
        '19429', '19034', '19090', '08010', '19064', '19428', '19033', '08090', '08043',
        '19462', '08061', '19085', '19008', '19020', '19078', '08026', '08046', '19081',
        '08020', '08021', '08051', '08012', '19094', '19022', '08027', '08073', '08032',
        '08053', '19040', '19424', '19021', '19086', '19405', '19065', '19091', '19037',
        '19044', '08056', '08080', '19080', '19088', '19089', '19053', '19422', '19002',
        '19016', '08036', '19404', '19407', '19408', '19409', '19415', '19401', '08091',
        '19477', '18966', '19087', '18991', '19437', '19015', '19063', '19406', '19058',
        '19013', '19333', '19073', '08016', '08048', '18974', '08071', '19436', '08014',
        '19048', '19049', '19056', '19028', '19484', '19007', '08060', '18936', '19454',
        '19312', '08074', '19014', '19455', '08055', '19052', '19403', '18954', '08009',
        '19486', '19047', '19039', '08081', '19057', '08062', '18976', '19055', '08028',
        '08518', '08085', '08025', '19446',
        '19017', '18929', '19490', '19301'
    ];
    // // const re = /(?<=12445)\s/
    function matchZipCodes(textToSearch) {
        // find sequence of 5 digits
        var match;
        var regResults = textToSearch.match(/\d{5,5}/g);
        regResults ? match = regResults.slice() : match = [];
        return match;
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
        var filteredZips = [];
        zipCodeArray.forEach(function (zipCode) {
            var foundZip = handleSingleZipSearch(textToSearch, zipCode);
            // TODO assign to a set 
            foundZip ? filteredZips = filteredZips.concat(foundZip) : null;
        });
        return filteredZips;
    }
    function getFullAddresses(textToSearch, filteredZipCodes) {
        // take zips within range and get full address from original string
        return filteredZipCodes.map(function (zipCode) {
            var fullAddress;
            var addressRegex = new RegExp("(?<=\\n).*?" + zipCode, 'g');
            var addressArray = textToSearch.match(addressRegex);
            // Todo, handle doubles:
            addressArray ? fullAddress = addressArray[0] : fullAddress = '';
            return fullAddress;
        });
    }
    function handleSearch(locationsString, zipArray) {
        // top level function
        var testingFilters = compileFilteredZips(locationsString, zipArray);
        return getFullAddresses(locationsString, testingFilters);
    }
    function assembleLocations(searchResults) {
        var locations = document.createElement('div');
        locations.id = 'locations';
        searchResults.forEach(function (loc) {
            var locationElement = document.createElement('p');
            locationElement.textContent = loc;
            locations.appendChild(locationElement);
        });
        document.body.replaceChild(locations, $('locations'));
    }
    function getInputText() {
        var addressesText = document.getElementById('textbox').value;
        console.log(addressesText);
        if (addressesText) {
            return handleSearch(addressesText, zipCodesWithin20Miles);
        }
        else {
            return;
        }
    }
    function clickTheButton() {
        var button = document.querySelector('button');
        button.addEventListener('click', function (event) {
            var addressesArray = getInputText();
            console.log('hey, was clikced', addressesArray);
            addressesArray ? assembleLocations(addressesArray) : assembleLocations([]);
        });
    }
    clickTheButton();
    // console.log(handleSearch(emailTest, zipCodesWithin20Miles));
}(document));
