var map;
var locations = [];
var gmarkers1 = [];
var markers1 = [];
var fname;
var dateg = "";
var textg = "";

// NEW CODE
var stDateG = "1000/02/13";
var endDateG = getCurrentDate();
var fnameG = "";
var locG = "";

function initialiseMap() {
    // Load data from an example Google spreadsheet that contains latitude and longitude columns using Google Sheets API v4 that returns JSON.
    // Replace the ID of your Google spreadsheet and you API key in the URL:
    // https://sheets.googleapis.com/v4/spreadsheets/ID_OF_YOUR_GOOGLE_SPREADSHEET/values/Sheet1!A2:Q?key=YOUR_API_KEY
    // Also make sure your API key is authorised to access Google Sheets API - you can enable that through your Google Developer console.
    // Finally, in the URL, fix the sheet name and the range that you are accessing from your spreadsheet. 'Sheet1' is the default name for the first sheet.
    jQuery(document).ready(function () {
        $.getJSON(
            "https://sheets.googleapis.com/v4/spreadsheets/YourSheetIDHere/values/Sheet1!A2:Q?key=YourApiKey",
            function (data) {
                // data.values contains the array of rows from the spreadsheet. Each row is also an array of cell values.
                // Modify the code below to suit the structure of your spreadsheet.
                console.log(data.values);
                markers1 = data.values;
                $(data.values).each(function () {
                    var location = {};
                    location.title = this[4];
                    location.latitude = parseFloat(this[0]);
                    location.longitude = parseFloat(this[1]);
                    location.date = this[2];
                    location.time = this[3];
                    locations.push(location);
                });

                // Center on (0, 0). Map center and zoom will reconfigure later (fitbounds method)
                var mapOptions = {
                    zoom: 10,
                    center: new google.maps.LatLng(0, 0),
                };
                var map = new google.maps.Map(
                    document.getElementById("map"),
                    mapOptions
                );
                setLocations(map, locations);
            }
        );
    });
}

function setLocations(map, locations) {
    var bounds = new google.maps.LatLngBounds();
    // Create nice, customised pop-up boxes, to appear when the marker is clicked on
    var infowindow = new google.maps.InfoWindow({
        content: "Content String",
    });
    for (var i = 0; i < locations.length; i++) {
        var new_marker = createMarker(map, locations[i], infowindow);
        bounds.extend(new_marker.position);
    }
    map.fitBounds(bounds);
}

function createMarker(map, location, infowindow) {
    // Modify the code below to suit the structure of your spreadsheet (stored in variable 'location')
    var position = {
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude),
    };
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: location.title,
    });

    gmarkers1.push(marker);
    google.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
            "<div>" +
            "<p><strong>" +
            location.title +
            "</strong></p>" +
            ("<p><strong>File Sync Date: </strong>" + location.date + "</p>") +
            ("<p><strong>File Sync Time: </strong>" + location.time + "</p>") +
            "</div>"
        );
        infowindow.open(map, marker);
    });
    return marker;
}

function formatDate(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1],
        day = datePart[2];

    return day + "/" + month + "/" + year;
}

function getCurrentDate() {
    const dateObj = new Date();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    const output = year + "/" + month + "/" + day;
    return output;
}

filterStDt = function (category, flag) {
    console.log(category, typeof category);
    if (category == "") {
        category = "1000/02/13";
        console.log("Using default cause Clear");
        // resetDate();
        // return
    } else if (flag == 1) {
        var datePart = category.match(/\d+/g),
            year = datePart[0], // get only two digits
            month = datePart[1],
            day = datePart[2];
        console.log("year", year);
        category = year + "/" + month + "/" + day;
    }

    dateg = category;

    console.log(category);

    // NEW CODE

    stDateG = category.toString();
    applyFilter(stDateG, endDateG, fnameG, locG);

    // for (i = 0; i < markers1.length; i++) {
    //     marker = gmarkers1[i];
    //     // If is same category or category not picked
    //     if ( (markers1[i][2].toLowerCase().indexOf(category.toLowerCase()) > -1) && (markers1[i][4].toLowerCase().indexOf(textg.toLowerCase()) > -1 || markers1[i][5].toLowerCase().indexOf(textg.toLowerCase()) > -1) || dateg.length === 0) {
    //         marker.setVisible(true);
    //     }
    //     // Categories don't match
    //     else {
    //         marker.setVisible(false);
    //     }
    // }
};

filterEnDt = function (category, flag) {
    console.log(category, typeof category);
    if (category == "") {
        category = getCurrentDate();
        console.log("Using current Date cause Clear");
        // resetDate();
        // return
    } else if (flag == 1) {
        var datePart = category.match(/\d+/g),
            year = datePart[0], // get only two digits
            month = datePart[1],
            day = datePart[2];
        console.log("year", year);
        category = year + "/" + month + "/" + day;
    }

    dateg = category;

    console.log(category);

    // NEW CODE

    endDateG = category.toString();
    applyFilter(stDateG, endDateG, fnameG, locG);
};

filterLoc = function (category1) {
    textg = category1;

    // NEW CODE
    locG = category1.toString();
    applyFilter(stDateG, endDateG, fnameG, locG);

    // for (i = 0; i < markers1.length; i++) {
    //     marker = gmarkers1[i];
    //     // If is same category or category not picked
    // if ( (markers1[i][4].toLowerCase().indexOf(category1.toLowerCase()) > -1 || markers1[i][5].toLowerCase().indexOf(category1.toLowerCase()) > -1) && (markers1[i][2].toLowerCase().indexOf(dateg.toLowerCase()) > -1) || category1.length === 0) {
    //         marker.setVisible(true);
    //     }
    //     // Categories don't match
    //     else {
    //         marker.setVisible(false);
    //     }
    // }
};

filterName = function (category1) {
    textg = category1;

    // NEW CODE
    fnameG = category1.toString();
    applyFilter(stDateG, endDateG, fnameG, locG);
};

function formatDateYYYYMMDD(date) {
    var datePart = date.match(/\d+/g),
        day = datePart[0], // get only two digits
        month = datePart[1],
        year = datePart[2];
    console.log("year", year);
    date = year + "/" + month + "/" + day;
    return date;
}

function resetFilters() {
    stDateG = "1000/02/13";
    endDateG = getCurrentDate();
    fnameG = "";
    locG = "";
    document.getElementById("fStDt").value = "";
    document.getElementById("fEnDt").value = "";
    document.getElementById("fLoc").value = "";
    document.getElementById("fFname").value = "";

    applyFilter(stDateG, endDateG, fnameG, locG);
}

function applyFilter(stDate, endDate, fname, loc) {
    var cnt = 0;

    console.log("Applying filters to", stDate, endDate, fname, loc);
    console.log(typeof stDate, typeof endDate);
    stDate = Date.parse(stDate.toString().toLowerCase());
    endDate = Date.parse(endDate.toString().toLowerCase());

    for (i = 0; i < markers1.length; i++) {
        // markers1[i][2] DATE
        // markers1 3 Time
        // markers1 4 File name
        // markers1 5 Location

        marker = gmarkers1[i];
        // toLowerCase
        var fileDt = formatDateYYYYMMDD(markers1[i][2].toString().toLowerCase());
        fileDt = Date.parse(fileDt);
        console.log("Checking Date range", stDate, endDate, fileDt);
        if (fileDt >= stDate && fileDt <= endDate) {
            // DATE range
            console.log("Date range correct");
            if (
                markers1[i][4]
                    .toString()
                    .toLowerCase()
                    .indexOf(fname.toString().toLowerCase()) > -1
            ) {
                console.log("file name found");
                if (
                    markers1[i][5]
                        .toString()
                        .toLowerCase()
                        .indexOf(loc.toString().toLowerCase()) > -1
                ) {
                    console.log("Location found");
                    marker.setVisible(true);
                    cnt++;
                    continue;
                }
            }
        }
        marker.setVisible(false);
    }
    console.log("No. of markers visible", cnt);
}

//         marker = gmarkers1[i];
//         // If is same category or category not picked
//         if ( (markers1[i][2].toLowerCase().indexOf(category.toLowerCase()) > -1) && (markers1[i][4].toLowerCase().indexOf(textg.toLowerCase()) > -1 || markers1[i][5].toLowerCase().indexOf(textg.toLowerCase()) > -1) || dateg.length === 0) {
//             marker.setVisible(true);
//         }
//         // Categories don't match
//         else {
//             marker.setVisible(false);
//         }
//     }
// }

function resetDate() {
    document.getElementById("fname").value = "";
    dateg = "";
    filterMarkers1(textg);
}

function resetText() {
    document.getElementById("fname1").value = "";
    textg = "";
    if (dateg == "") {
        filterMarkers1(textg);
    } else {
        console.log("in else", dateg);
        filterMarkers(dateg, 0);
    }
}

