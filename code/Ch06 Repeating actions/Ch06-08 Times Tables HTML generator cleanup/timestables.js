function doTimesTables() {

    // get the times table number
    var tableTextElement = document.getElementById("timesTableText");
    var timesTableText = tableTextElement.value;
    var timesTableNumber = Number(timesTableText);

    // get the times table list
    var timesTableListElement = document.getElementById("timesTableList");

    // remove all the child elements from this list
    while(timesTableListElement.children.length > 0)
        timesTableListElement.removeChild(timesTableListElement.children[0]);

    // build a list
    for (let i=1; i<=12;i=i+1) {
        let resultNunber = timesTableNumber * i;

        let resultString = i + " times " + timesTableNumber + " is " + resultNunber;

        var listItem = document.createElement("li");
        listItem.innerText=resultString;
        timesTableListElement.appendChild(listItem);
    }
}
