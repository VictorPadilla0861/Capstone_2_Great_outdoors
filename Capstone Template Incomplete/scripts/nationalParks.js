
"use strict"

window.onload = init;

function init(){
const stateRadio=document.getElementById("locationRadio");
stateRadio.addEventListener("click", displayDropdown);
const parkTypeRadio=document.getElementById("parkTypeRadio");
parkTypeRadio.addEventListener("click", displayDropdown);
const parkStateRadio=document.getElementById("parkStateRadio");
parkStateRadio.addEventListener("click", displayDropdown);
}

function displayDropdown(){


  if(locationRadio.checked){

    document.getElementById("dropdownDiv").innerHTML = `
    <form id="locationSearchForm">
      <div class="d-flex justify-content-evenly">
        <select id="searchByLocationDropdown" class="form-select form-select-lg mb-3"></select>
        <button type="submit" id="searchByLocationBtn" class="btn btn-custom">Search</button>
      </div>
    </form>`;
  

      const locationDropdown = document.getElementById("searchByLocationDropdown");
      for(let index = 0; index < locationsArray.length; index++){
        const locationOptions = new Option(locationsArray[index], locationsArray[index]);
        locationDropdown.appendChild(locationOptions);
      }

        const locationSearchBtn = document.getElementById("locationSearchForm");
        locationSearchBtn.addEventListener("submit", displayParks)
}


else if(parkTypeRadio.checked){

  document.getElementById("dropdownDiv").innerHTML = `
    <form id="parkTypeSearchForm">
    <select id="searchByParkTypeDropdown" class="form-select form-select-lg mb-3"></select>
    <button type="submit" id="searchByParkTypeBtn" class="btn btn-custom">Search</button>
    </form>`;

  const parkTypeDropdown = document.getElementById("searchByParkTypeDropdown");
  for(let index = 0; index < parkTypeArray.length; index++){
    const parkTypeOptions = new Option(parkTypeArray[index], parkTypeArray[index]);
    parkTypeDropdown.appendChild(parkTypeOptions);
  }

  const parkTypeSearchBtn = document.getElementById("parkTypeSearchForm");
  parkTypeSearchBtn.addEventListener("submit", displayParks);
}

else if(parkStateRadio.checked){
  document.getElementById("dropdownDiv").innerHTML = `
  <form id="parkTypeSearchForm">
  <select id="searchByParkTypeDropdown" class="form-select form-select-lg mb-3"></select>
  <select id="searchByLocationDropdown" class="form-select form-select-lg mb-3"></select>

  <button type="submit" id="searchBtn" class="btn btn-custom">Search</button>
  </form>`;
  const parkTypeDropdown = document.getElementById("searchByParkTypeDropdown");
  for(let index = 0; index < parkTypeArray.length; index++){
    const parkTypeOptions = new Option(parkTypeArray[index], parkTypeArray[index]);
    parkTypeDropdown.appendChild(parkTypeOptions);
  }
  const locationDropdown = document.getElementById("searchByLocationDropdown");
  for(let index = 0; index < locationsArray.length; index++){
    const locationOptions = new Option(locationsArray[index], locationsArray[index]);
    locationDropdown.appendChild(locationOptions);
  }
  const searchBtn=document.getElementById("searchBtn")
  searchBtn.onclick= displayParks;
}

else{
  document.getElementById("dropdownDiv").innerHTML = "";
}
}

function displayParks(event){
  event.preventDefault();

  let matching = null;

  if(locationRadio.checked){
    const locations = document.getElementById("searchByLocationDropdown");
    const selectedLocationValue = locations.value;
     console.log(selectedLocationValue);
    matching = nationalParksArray.filter(location => location.State == selectedLocationValue);
  }

  else if(parkTypeRadio.checked){
    const parkType = document.getElementById("searchByParkTypeDropdown");
    const selectedParkTypeValue = parkType.value;
    matching = nationalParksArray.filter(parks => parks.LocationName.includes(selectedParkTypeValue));
  }

  else if(parkStateRadio.checked){
    const locations = document.getElementById("searchByLocationDropdown");
    const selectedLocationValue = locations.value;
    console.log(selectedLocationValue)
    const parkType = document.getElementById("searchByParkTypeDropdown");
    const selectedParkTypeValue = parkType.value;
    console.log(selectedParkTypeValue)

    matching = nationalParksArray.filter(both => both.State == selectedLocationValue && both.LocationName.includes(selectedParkTypeValue) );
    console.log(matching)
  }

  let displayPArkInfo = "";
  for(let index = 0; index < matching.length; index++){

    const name = matching[index].LocationName;
    const city = matching[index].City;
    const state = matching[index].State;


    let phone = null;
    if(matching[index].Phone == 0){
          phone = "N/A";
    }
    else if(matching[index].Phone.includes("(")){
      phone = matching[index].Phone;
    }
    else {
      phone = "N/A"
    }

    let fax = null;
    if (matching[index].Fax == 0){
      fax = "N/A"

    }
    else {
      fax = matching[index].Fax;
    }
    let parkWebsite = null;
    if(matching[index].Visit){
      parkWebsite = `<button class="d-flex justify-content-center><a href="${matching[index].Visit}" target="_blank">More Info</a><button>`
    }
    else{
      parkWebsite = "<br>";
    }

    displayPArkInfo +=`
    <div class="card my-3" style="width: 18rem;">
    <div class="card-body d-flex flex-column justify-content-between">
      <div>
        <h5 class="card-title">${name}</h5>
      </div>
      <br>
      <div>
        <h6 class="card-subtitle mb-2 text-muted">${city}, ${state}</h6>
        <p class="card-text"><strong>Contactt</strong><br>Phone: ${phone}</br><br>Fax: ${fax}</br></p>
        ${parkWebsite}
        </div></br>
      </div>
    </div>`;

  }
  document.getElementById("displayParks").innerHTML = displayPArkInfo;
}