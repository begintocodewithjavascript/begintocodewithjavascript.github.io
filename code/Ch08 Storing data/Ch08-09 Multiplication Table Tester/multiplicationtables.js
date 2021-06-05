function getNumberFromElement(element) {

    var text = element.value;

    var result = Number(text);

    if (isNaN(result)) {
        // fail with bad number input
        element.className = "menuInputError";
        return NaN;
    }

    // if we get here the number is valid
    // set to normal background
    element.className = "menuInput";

    return result;
}

function getNumberFromElementByID(elementID) {

    var element = document.getElementById(elementID);

    return getNumberFromElement(element);
}

function makeInputListItem(labelText) {
    var inputPar = document.createElement("li");

    var labelElement = document.createElement("label");
    labelElement.innerText = labelText ;
    labelElement.className = "menuLabel";
    labelElement.setAttribute("for", labelText);
    inputPar.appendChild(labelElement);

    let inputElement = document.createElement("input");
    inputElement.setAttribute("value", 0);
    inputElement.setAttribute("type", "number");
    inputElement.className = "menuInput";
    inputElement.setAttribute("id", labelText);
    inputPar.appendChild(inputElement);

    return inputPar;
}

function removeChildren(element){
    // remove all the child elements from this element
    while (element.children.length > 0)
        element.removeChild(element.children[0]);
}

function makeMultiplicationTables(containerElementID, tableNoElementID, tableCountElementID)
{
    var containerElement = document.getElementById(containerElementID);

    removeChildren(containerElement);

    var reply = "";

    var tableNo = getNumberFromElementByID(tableNoElementID);

    if(isNaN(tableNo)){
        reply="Invalid table number";
    }

    var tableCount = getNumberFromElementByID(tableCountElementID);

    if(isNaN(tableCount)){
        if(reply=="") {
            reply= "Invalid table count";
        }
        else {
            reply = reply + " and table count";
        }
    }

    if(reply != ""){
        // something wrong with the inputs
        var errorMessage = document.createElement("p");
        errorMessage.innerText=reply;
        errorMessage.className='menuTextError';
        containerElement.appendChild(errorMessage);
        return;
    }

    for(let count=1;count<=tableCount;count=count+1)
    {
        var labelText = count+" times "+tableNo+" is: ";
        let itemPar = makeInputListItem(labelText);

        // store the result value in the item
        itemPar.setAttribute("data-result", count*tableNo);
        containerElement.appendChild(itemPar);
    }
}


function checkMultiplicationTables(containerElementID) {

    // get the multiplication table list
    var containerElement = document.getElementById(containerElementID);

    // mark all the items
    for (let listItem of containerElement.children) {
        // get the data out of the list element
        // convert them into numbers so we can calculate with them
        let rightAnswer = Number(listItem.getAttribute("data-result"));
        let inputElement = listItem.children[1];
        let userInput = getNumberFromElement(inputElement);

        if(userInput == rightAnswer)
        {
            // this one can go green
            inputElement.className = "menuInputRight";
        }
        else {
            // this one can go red
            inputElement.className = "menuInputWrong";
        }
    }
}
