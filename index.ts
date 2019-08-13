
(function (document) {
  const $ = document.getElementById.bind(document);

  const zipCodesWithin20Miles = [
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
    '19017', '18929', '19490', '19301'];

  // // const re = /(?<=12445)\s/

  function matchZipCodes(textToSearch: string) {
    // find sequence of 5 digits
    let match: Array<string>;
    const regResults = textToSearch.match(/\d{5,5}/g);
    regResults ? match = [...regResults] : match = [];
    return match;
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
    let filteredZips: Array<string> = [];
    zipCodeArray.forEach(zipCode => {
      const foundZip = handleSingleZipSearch(textToSearch, zipCode);
      // TODO assign to a set 
      foundZip ? filteredZips = [...filteredZips, ...foundZip] : null;
    })
    return filteredZips;
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
    let locations = document.createElement('div');
    locations.id = 'locations';
    searchResults.length ? locations = handleAssembly(locations, searchResults) : locations = handleNoResults(locations);
    //insert into DOM
    document.body.replaceChild(locations, $('locations'));
  }

  function getInputText() {
    // cast new type to access .value
    const addressesText = (<HTMLInputElement>document.getElementById('textbox')).value;
    return handleSearch(addressesText, zipCodesWithin20Miles);
  }

  function clickTheButton() {
    const button: HTMLButtonElement | null = document.querySelector('button');
    button.addEventListener('click', () => {
      const addressesArray = getInputText();
      assembleLocations(addressesArray);
    });
  }

  clickTheButton();

}(document));
