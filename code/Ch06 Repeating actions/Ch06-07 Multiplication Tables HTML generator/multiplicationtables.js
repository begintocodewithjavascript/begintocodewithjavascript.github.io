function doMultiplicationTables() {

    // get the multiplication table number from the web page
    var tableTextElement = document.getElementById("tableNumberText");
    var tableNumberText = tableTextElement.value;
    var tableNumber = Number(tableNumberText);

    // get the multiplication table list from the web page
    var multiplicationTableListElement = document.getElementById("multiplicationTableList");

    // count through the table producing results
    for (let i=1; i<=12;i=i+1) {
        // calculate the result
        let resultNunber = tableNumber * i;

        // create a result strung
        let resultString = i + " times " + tableNumber + " is " + resultNunber;

        // make  new list item
        let listItem = document.createElement("li");
        // set the text of the new list item to the result string
        listItem.innerText=resultString;
        // add it to the multiplication table list
        multiplicationTableListElement.appendChild(listItem);
    }
}
