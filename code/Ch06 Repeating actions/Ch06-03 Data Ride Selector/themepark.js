function doCheckAge() {

    var ageElement = document.getElementById("ageText");
    var ageText = ageElement.value;
    var ageNo = Number(ageText);

    // Anyone can go on the River Cruise
    var riverCruiseElement = document.getElementById("scenicRiver");
    riverCruiseElement.className = "menuYes";

    // Get the carnival element
    var carnivalCarouselElement = document.getElementById("carnivalCarousel");

    // Get the min age from the carnival element data attribute
    var carnivalMinAgeText = carnivalCarouselElement.getAttribute("data-MinAge");
    var carnivalMinAgeNo = Number(carnivalMinAgeText)    

    // Get the max age from the carnival element data attribute
    var carinvalMaxAgeText = carnivalCarouselElement.getAttribute("data-MaxAge");
    var carinvalMaxAgeNo = Number(carinvalMaxAgeText);

    // Now use the age values to update the element color
    if(ageNo<carnivalMinAgeNo){
        carnivalCarouselElement.className="menuNo";
    }
    else{
        if(ageNo>carinvalMaxAgeNo){
            carnivalCarouselElement.className="menuNo";
        } else{
            carnivalCarouselElement.className="menuYes";
        }
    }
}
