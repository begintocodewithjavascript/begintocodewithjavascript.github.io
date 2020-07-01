function doTimesTables() {

    // get the times table number
    var tableTextElement = document.getElementById("timesTableText");
    var timesTableText = tableTextElement.value;
    var timesTableNumber = Number(timesTableText);

    // get the times table list
    var timesTableListElement = document.getElementById("timesTableList");

    // remove all the child elements from this list
    while (timesTableListElement.children.length > 0)
        timesTableListElement.removeChild(timesTableListElement.children[0]);

    // build a list
    for (let i = 1; i <= 12; i = i + 1) {

        let resultNunber = timesTableNumber * i;

        // randomly change some of the numbers
        randomVal = Math.random();
        if(randomVal>0.9){
            resultNunber = resultNunber + 1;
        }

         if(randomVal<0.1) {
            resultNunber = resultNunber - 1;
         }

        let resultString = i + " times " + timesTableNumber + " is " + resultNunber;

        var listItem = document.createElement("li");

        // store the multipler in the item
        listItem.setAttribute("data-multi", i);

        // store the times table number in the item
        listItem.setAttribute("data-timestablenumber", timesTableNumber);

        // store the result value in the item
        listItem.setAttribute("data-result", resultNunber);

        // display the result string
        listItem.innerText = resultString;

        // add the list element to the list
        timesTableListElement.appendChild(listItem);
    }
}

function checkTimesTables() {

    // get the times table list
    var timesTableListElement = document.getElementById("timesTableList");

    // mark all the items
    for (let listElement of timesTableListElement.children) {
        // get the data out of the list element
        // convert them into numbers so we can calculate with them
        let i = Number(listElement.getAttribute("data-multi"));
        let timesTableNumber = Number(listElement.getAttribute("data-timestablenumber"));
        let displayedResult = Number(listElement.getAttribute("data-result"));

        let correctResult = i * timesTableNumber;

        if(displayedResult == correctResult)
        {
            // this one can go green
            listElement.className = "menuYes";
        }
        else {
            // this one can go red
            listElement.className = "menuNo";
        }
    }
}
