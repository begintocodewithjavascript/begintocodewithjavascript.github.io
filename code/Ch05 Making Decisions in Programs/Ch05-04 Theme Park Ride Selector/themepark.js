function doCheckAge() {

    var rideNoElement = document.getElementById("rideNoText");
    var rideNoText = rideNoElement.value;
    var rideNo = Number(rideNoText);

    var ageElement = document.getElementById("ageText");
    var ageText = ageElement.value;
    var ageNo = Number(ageText);

    var resultElement = document.getElementById("menuAnswerPar");

    if (rideNo == 1) {
        // This is the Scenic River Cruise
        // There are no age limits for this ride
        resultElement.className = "menuYes";
        resultElement.innerText = "You can go on the Scenic River Cruise";
    }
    if (rideNo == 2) {
        // This is the Carnival Carousel
        if (ageNo < 3) {
            resultElement.className = "menuNo";
            resultElement.innerText = "You are too young for the Carnival Carousel";
        }
        else {
            resultElement.className = "menuYes";
            resultElement.innerText = "You can go on the Carnival Carousel";
        }
    }
    if (rideNo == 3) {
        // This is the Jungle Adventure Water Splash
        if (ageNo < 6) {
            resultElement.className = "menuNo";
            resultElement.innerText = "You are too young for the Jungle Adventure Water Splash";
        }
        else {
            resultElement.className = "menuYes";
            resultElement.innerText = "You can go on the Jungle Adventure Water Splash";
        }
    }
    if (rideNo == 4) {
        // This is the Downhill Mountain Run
        if (ageNo < 12) {
            resultElement.className = "menuNo";
            resultElement.innerText = "You are too young for the Downhill Mountain Run";
        }
        else {
            resultElement.className = "menuYes";
            resultElement.innerText = "You can go on the Downhill Mountain Run";
        }
    }
    if (rideNo == 5) {
        // This is the Regurgitator 
        if (ageNo < 12) {
            resultElement.className = "menuNo";
            resultElement.innerText = "You are too young for the Regurgitator";
        }
        else {
            // get here if the age is 12 or above
            if (ageNo > 70) {
                resultElement.className = "menuNo";
                resultElement.innerText = "You are too old for the Regurgitator";
            }
            else {
                resultElement.className = "menuYes";
                resultElement.innerText = "You can go on the Regurgitator";
            }
        }
    }
}
