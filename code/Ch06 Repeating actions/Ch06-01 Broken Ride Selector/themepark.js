function doCheckAge() {

    var ageElement = document.getElementById("ageText");
    var ageText = ageElement.value;
    var ageNo = Number(ageText);

    var riverCruiseElement = document.getElementById("scenicRiver");
    riverCruiseElement.className = "menuYes";

    var carnivalCarouselElement = document.getElementById("carnivalCarousel");

    carnivalCarouselElement.className = "menuYes";
    if (ageNo < 3) {
        carnivalCarouselElement.className = "menuNo";
    } else {
        carnivalCarouselElement.className = "menuYes";
    }

    var jungleAdventureElement = document.getElementById("jungleAdventure");
    if (ageNo < 6) {
        jungleAdventureElement.className = "menuNo";
    } else {
        jungleAdventureElement.className = "menuYes";
    }

    var downhillMountainElement = document.getElementById("downhillMountain");
    if (ageNo < 12) {
        downhillMountainElement.className = "menuNo";
    } else {
        jungleAdventureElement.className = "menuYes";
    }

    var regurgitatorElement = document.getElementById("regurgitator");
    if (ageNo < 12) {
        regurgitatorElement.className = "menuNo";
    } else {
        // get here if the age is 12 or above
        if (ageNo > 90) {
            regurgitatorElement.className = "menuNo";
        } else {
            regurgitatorElement.className = "menuYes";
        }
    }
}
