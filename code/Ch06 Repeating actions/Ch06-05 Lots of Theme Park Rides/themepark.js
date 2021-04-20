function doCheckAge() {

    // get the age that was input
    var ageElement = document.getElementById("ageText");
    var ageText = ageElement.value;
    var ageNo = Number(ageText);

    // get the list of rides
    var rideListElement= document.getElementById("rideList");

    // get the number of child list items
    var noOfRides = rideListElement.children.length;

    // make a loop to count round the rides
    for(i=0; i < noOfRides; i=i+1){
        // get the ride element out of the list
        let rideElement = rideListElement.children[i];

        // get the minimum age
        let minAgeText = rideElement.getAttribute("data-MinAge");
        let minAgeNo = Number(minAgeText)
        
        // get the maximum age
        let maxAgeText = rideElement.getAttribute("data-MaxAge");
        let maxAgeNo = Number(maxAgeText);

        // test the age and update the component
        if(ageNo<minAgeNo){
            rideElement.className="menuNo";
        } else{
            if(ageNo>maxAgeNo){
                rideElement.className="menuNo";
            } else{
                rideElement.className="menuYes";
            }
        }
    }
}
