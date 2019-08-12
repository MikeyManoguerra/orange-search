//  input of things to return

// given a string of text, will search through to find match to input
// if found return the surrounding 10 words

const zipCodesWithin20Miles = [
  19125, 19122, 19123, 19134,
  19133, 08102, 19106, 19108,
  08105, 19109, 19107, 19190,
  19195, 19092, 19093, 19099,
  19101, 19105, 19019, 19140,
  19155, 19160, 19161, 19162,
  19170, 19171, 19172, 19173,
  19175, 19177, 19178, 19179,
  19181, 19182, 19183, 19184,
  19185, 19187, 19188, 19191,
  19192, 19193, 19194, 19196,
  19197, 19244, 19255, 19110, 19102, 19137, 19130, 19132, 08103, 08110, 19121, 19124, 19147, 19103, 08101, 08109, 19120, 19104, 19146, 08104, 19129, 19141, 19148, 19144, 19135, 08065, 19149, 08107, 19131, 08108, 19126, 19145, 19012, 19138, 08030, 19139, 19143, 19004, 08002, 08076, 19119, 08059, 19111, 08106, 19112, 19027, 19127, 19142, 19066, 08077, 08033, 08052, 19136, 19150, 19152, 19151, 08035, 19128, 08099, 19095, 08031, 19176, 19072, 19050, 08093, 19082, 19096, 19118, 08063, 08034, 19046, 08007, 19023, 19115, 19114, 08045, 08078, 19038, 19079, 19153, 08057, 19003, 08049, 19035, 08029, 19018, 08003, 19026, 08075, 19075, 19032, 19444, 19083, 08086, 19001, 19036, 08083, 19031, 19041, 08096, 19154, 08054, 19113, 19006, 08066, 19098, 19074, 19043, 19116, 08097, 19029, 19009, 08084, 19025, 19076, 19010, 19070, 19429, 19034, 19090, 08010, 19064, 19428, 19033, 08090, 08043, 19462, 08061, 19085, 19008, 19020, 19078, 08026, 08046, 19081, 08020, 08021, 08051, 08012, 19094, 19022, 08027, 08073, 08032, 08053, 19040, 19424, 19021, 19086, 19405, 19065, 19091, 19037, 19044, 08056, 08080, 19080, 19088, 19089, 19053, 19422, 19002, 19016, 08036, 19404, 19407, 19408, 19409, 19415, 19401, 08091, 19477, 18966, 19087, 18991, 19437, 19015, 19063, 19406, 19013, 19333, 19073, 08016, 08048, 18974, 08071, 19436, 08014, 19048, 19049, 19056, 19028, 19484, 19007, 08060, 18936, 19454, 19312, 08074, 19014, 19455, 08055, 19052, 19403, 18954, 08009, 19486, 19047, 19039, 08081, 19057, 08062, 18976, 19055, 08028, 08518, 08085, 08025, 19446, 19017, 18929, 19490, 19301, 19058];

const testString = `AK - 8/31/2019 - 2:00 PM-6:00 PM - Walmart, 10096 KENAI SPUR HWY, KENAI, AK 99611
AK - 8/31/2019 - 2:00 PM-6:00 PM - Walmart, 537 JOHANSEN EXPY, FAIRBANKS, AK 99701
AZ - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 2750 S WOODLANDS VILLAGE BLVD, FLAGSTAFF, AZ 86001
AZ - 8/31/2019 - 2:00 PM-6:00 PM - Walmart, 2601 E HUNTINGTON DR, FLAGSTAFF, AZ 86004
AZ - 8/31/2019 - 2:00 PM-6:00 PM - Walmart, 6145 N 35TH AVE, PHOENIX, AZ 85017
MT - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 1500 N 7TH AVE, BOZEMAN, MT 59715
NC - 8/17/2019 - 2:00 PM-6:00 PM - Walmart, 200 WATAUGA VILLAGE DR, BOONE, NC 28607
NC - 8/17/2019 - 2:00 PM-6:00 PM - Walmart, 210 WALMART PLZ, SYLVA, NC 28779
ND - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 2551 32ND AVE S, GRAND FORKS, ND 58201
ND - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 5755 GATEWAY DRIVE, GRAND FORKS, ND 58203
ND - 8/31/2019 - 2:00 PM-6:00 PM - Walmart, 1625 COMMERCE DR, WAHPETON, ND 58075
ND - 8/31/2019 - 2:00 PM-6:00 PM - Walmart, 4731 13TH AVE S, FARGO, ND 58103
NE - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 5411 2ND AVE, KEARNEY, NE 68847
NH - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 285 PLAINFIELD RD, WEST LEBANON, NH 03784
NH - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 350 WINCHESTER ST, KEENE, NH 03431
NH - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 683 TENNEY MOUNTAIN HWY, PLYMOUTH, NH 03264
NH - 8/31/2019 - 2:00 PM-6:00 PM - Walmart, 2200 WOODBURY AVE, NEWINGTON, NH 03801
NY - 8/17/2019 - 2:00 PM-6:00 PM - Walmart, 2 GANNETT DR, JOHNSON CITY, NY 13790
NY - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 1000 STATE ROUTE 36, HORNELL, NY 14843
NY - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 135 FAIRGROUNDS MEMORIAL PKWY, ITHACA, NY 14850
NY - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 141 Washington Ave Extension , ALBANY, NY 12205
NY - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 1869 PLAZA DR, OLEAN, NY 14760
NY - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 25 CONSUMER SQ, PLATTSBURGH, NY 12901
NY - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 341 STATE ROUTE 104, OSWEGO, NY 13126
NY - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 4235 VETERAN DR, GENESEO, NY 14454
NY - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 5054 STATE HIGHWAY 23, ONEONTA, NY 13820
NY - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 6438 BASILE ROWE, EAST SYRACUSE, NY 13057
NY - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 990 STATE ROUTE 5 AND 20, GENEVA, NY 14456
NY - 8/31/2019 - 2:00 PM-6:00 PM - Walmart, 139 MERCHANT PL, COBLESKILL, NY 12043
NY - 8/31/2019 - 2:00 PM-6:00 PM - Walmart, 7494 US HIGHWAY 11, POTSDAM, NY 13676
PA - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 108 WASHINGTON TOWNE BLVD N, EDINBORO, PA 16412
PA - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 1169 S MAIN ST, MANSFIELD, PA 16933
PA - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 1270 YORK RD, GETTYSBURG, PA 17325
PA - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 1566 W MAIN STREET EXT, GROVE CITY, PA 16127
PA - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 167 HOGAN BLVD, MILL HALL, PA 17751
PA - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 1825 DOWNS DR, ERIE, PA 16509
PA - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 63 PERKINS RD, CLARION, PA 16214
VA - 8/17/2019 - 2:00 PM-6:00 PM - Walmart, 1233 N LEE HWY, LEXINGTON, VA 24450
VA - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 171 BURGESS ROAD, HARRISONBURG, VA 22801
VA - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 1800 PERRY DR, FARMVILLE, VA 23901
VA - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 6920 FOREST AVENUE, RICHMOND, VA 23230
VA - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 7373 PEPPERS FERRY BLVD, FAIRLAWN, VA 24141
VA - 8/24/2019 - 2:00 PM-6:00 PM - Walmart, 975 HILTON HEIGHTS RD, CHARLOTTESVILLE, VA 22901`

const testZip = 17325;
const ResultsArray = [];
// // const re = /(?<=12445)\s/
function matchZipCodes(textToSearch: string) {
  return textToSearch.match(/\d{5,5}/g)
}

function filterForUserZip(zipCodeArray, zipCode: string) {
  return zipCodeArray.filter(zip => zip === zipCode);
}

function handleSearch(textToSearch, zipCode: string) {
  const zipcodeArray = matchZipCodes(textToSearch);
  return filterForUserZip(zipcodeArray, zipCode);

}

//  here down needs help, i think its convoluted

function useRadiusZipsToMatchToJobs(textToSearch, zipCodeArray) {
  zipCodeArray.forEach(zip => {
    let fullAddress;
    const filteredZipCodes: Array<string> = handleSearch(testString, zip.toString());
    filteredZipCodes.length ? fullAddress = getFullAddresses(filteredZipCodes) : null
    return fullAddress;
  })
}


function getFullAddresses(filteredZipCodes) {
  return filteredZipCodes.map((zipCode) => {
    const addressRegex = new RegExp(`(?<=\\n).*?${zipCode}`, 'g');
    const [fullAddress] = testString.match(addressRegex);
    // Todo, handle doubles:
    fullAddress.length > 1 ? console.log('double!', zipCode) : console.log('no doubles');
    return fullAddress;
  })
}
