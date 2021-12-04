
(function () {
  // // const re = /(?<=12445)\s/

  function matchZipCodes(textToSearch: string) {
    // find sequence of 5 digits
    // empty slice makes a shallow copy
    const regResults = textToSearch.match(/\d{5,5}/g);

    return regResults ? regResults.slice() : [];
  }

  function filterForUserZip(zipCodeArray: Array<string>, zipCode: string) {
    return zipCodeArray.filter(zip => zip === zipCode);
  }

  function handleSingleZipSearch(textToSearch: string, zipCode: string) {
    const zipcodeArray = matchZipCodes(textToSearch);
    return filterForUserZip(zipcodeArray, zipCode);
  }

  function compileFilteredZips(textToSearch: string, zipCodeArray: Array<string>) {
    // create new array of zips within range
    return zipCodeArray.reduce((filteredZips, zipCode) => {
      const foundZip = handleSingleZipSearch(textToSearch, zipCode);
      // TODO assign to a set
      return foundZip ? [...filteredZips, ...foundZip] : null;
    }, [])
  }

  function getFullAddresses(textToSearch: string, filteredZipCodes: Array<string>) {
    // take zips within range and get full address from original string
    return filteredZipCodes.map((zipCode) => {
      let fullAddress: string;
      const addressRegex = new RegExp(`(?<=\\n).*?${zipCode}`, 'g');
      const addressArray = textToSearch.match(addressRegex);

      // Todo, handle doubles:
      addressArray ? fullAddress = addressArray[0] : fullAddress = '';
      return fullAddress;
    })
  }

  function handleSearch(locationsString: string, zipArray: Array<string>) {
    // top level search function
    const testingFilters = compileFilteredZips(locationsString, zipArray);
    return getFullAddresses(locationsString, testingFilters);
  }
  // DOM manipulation below

  function handleAssembly(locationDiv: HTMLDivElement, searchResults: Array<string>) {
    // build results html
    searchResults.forEach(loc => {
      const locationElement = document.createElement('p');
      locationElement.textContent = loc;
      locationDiv.appendChild(locationElement);
    })
    return locationDiv
  }

  function handleNoResults(locationDiv: HTMLDivElement) {
    // provide message on no results
    const locationElement = document.createElement('p');
    locationElement.textContent = 'No results found';
    locationDiv.appendChild(locationElement);
    return locationDiv;
  }

  function assembleLocations(searchResults: Array<string>) {
    const locationResults = document.getElementById('locations')

    let locations = document.createElement('div');
    locations.id = 'locations';
    searchResults.length ? locations = handleAssembly(locations, searchResults) : locations = handleNoResults(locations);
    //insert into DOM
    locationResults.parentElement.replaceChild(locations, locationResults);
  }

  function getInputText() {
    // cast new type to access .value
    const addressesText = (<HTMLInputElement>document.getElementById('textbox')).value;
    return handleSearch(addressesText, zipCodesWithin30Miles);
  }

  function clickTheButton() {
    const button: HTMLButtonElement | null = document.querySelector('button');
    button.addEventListener('click', () => {
      const addressesArray = getInputText();
      assembleLocations(addressesArray);
    });
  }

  clickTheButton();

}());
