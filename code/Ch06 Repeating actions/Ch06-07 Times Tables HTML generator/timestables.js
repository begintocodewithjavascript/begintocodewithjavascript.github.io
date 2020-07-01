function doTimesTables() {

    // get the times table number from the web page
    var tableTextElement = document.getElementById("timesTableText");
    var timesTableText = tableTextElement.value;
    var timesTableNumber = Number(timesTableText);

    // get the times table list from the web page
    var timesTableListElement = document.getElementById("timesTableList");

    // count through the times table producing results
    for (let i=1; i<=12;i=i+1) {
        // calculate the result
        let resultNunber = timesTableNumber * i;

        // create a result strung
        let resultString = i + " times " + timesTableNumber + " is " + resultNunber;

        // make  new list item
        let listItem = document.createElement("li");
        // set the text of the new list item to the result string
        listItem.innerText=resultString;
        // add it to the times table list
        timesTableListElement.appendChild(listItem);
    }
}
