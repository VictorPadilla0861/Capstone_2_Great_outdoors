"use strict"

window.onload = () => {
    //
    const states = document.getElementById("states");
    const parktype = document.getElementById("parktype");
    addLocationsToDropdown();
    addNationalParksToDropdown();
};

function addLocationsToDropdown() {

    locationsArray.forEach(function (location) {
    let option = document.createElement("option");

    option.value = location;
    option.textContent = location;

    // Add the new option to the dropdown
    states.appendChild(option);
    });
}

function addNationalParksToDropdown(){

    locationsArray.forEach(function (park) {
        let option = document.createElement("option");
    
        option.value = park.LocationName;
        option.textContent = park.LocationName;
    
        parktype.appendChild(option);
        });
}

function getSelectedStateValue(){
    const selectedValue = states.value;
}