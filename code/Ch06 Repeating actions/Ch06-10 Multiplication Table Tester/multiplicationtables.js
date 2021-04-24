function doMultiplicationTables() {

    // get the multiplication table number from the web page
    var tableTextElement = document.getElementById("tableNumberText");
    var tableNumberText = tableTextElement.value;
    var tableNumber = Number(tableNumberText);

    // get the multiplication table list from the web page
    var multiplicationTableListElement = document.getElementById("multiplicationTableList");

    // remove all the child elements from this list
    while (multiplicationTableListElement.children.length > 0)
        multiplicationTableListElement.removeChild(multiplicationTableListElement.children[0]);

    // build a list
    for (let i = 1; i <= 12; i = i + 1) {

        let resultNunber = tableNumber * i;

        // randomly change some of the numbers
        randomVal = Math.random();
        if (randomVal > 0.9) {
            resultNunber = resultNunber + 1;
        }

        if (randomVal < 0.1) {
            resultNunber = resultNunber - 1;
        }

        let resultString = i + " times " + tableNumber + " is " + resultNunber;

        var listItem = document.createElement("li");

        // store the multipler in the item
        listItem.setAttribute("data-multi", i);

        // store the times table number in the item
        listItem.setAttribute("data-timestablenumber", tableNumber);

        // store the result value in the item
        listItem.setAttribute("data-result", resultNunber);

        // display the result string
        listItem.innerText = resultString;

        // add the list element to the list
        multiplicationTableListElement.appendChild(listItem);
    }
}

function checkMultiplicationTables() {

    // get the multiplication table list from the web page
    var multiplicationTableListElement = document.getElementById("multiplicationTableList");

    // mark all the items
    for (let listElement of multiplicationTableListElement.children) {
        // get the data out of the list element
        // convert them into numbers so we can calculate with them
        let i = Number(listElement.getAttribute("data-multi"));
        let timesTableNumber = Number(listElement.getAttribute("data-timestablenumber"));
        let displayedResult = Number(listElement.getAttribute("data-result"));

        let correctResult = i * timesTableNumber;

        if (displayedResult == correctResult) {
            // this one can go green
            listElement.className = "menuYes";
        }
        else {
            // this one can go red
            listElement.className = "menuNo";
        }
    }
}
