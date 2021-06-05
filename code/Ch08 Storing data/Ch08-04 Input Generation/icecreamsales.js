function makeInputPar(labelText, min, max) {
    let inputPar = document.createElement("p");

    let labelElement = document.createElement("label");
    labelElement.innerText = labelText + " (" + min + "-" + max + "):";
    labelElement.className = "menuLabel";
    labelElement.setAttribute("for", labelText);
    inputPar.appendChild(labelElement);

    let inputElement = document.createElement("input");
    inputElement.setAttribute("max", max);
    inputElement.setAttribute("min", min);
    inputElement.setAttribute("value", 0);
    inputElement.setAttribute("type", "number");
    inputElement.className = "menuInput";
    inputElement.setAttribute("id", labelText);
    inputPar.appendChild(inputElement);

    return inputPar;
}

function doBuildSalesInputItems(containerElementID, min, max, noOfItems) {
    let containerElement = document.getElementById(containerElementID);

    for (let itemCount = 1; itemCount <= noOfItems; itemCount = itemCount + 1) {
        let labelText = "Sales " + itemCount;
        let itemPar = makeInputPar(labelText, min, max);
        containerElement.appendChild(itemPar);
    }
}

function getHighest(inputArray) {
    let max = inputArray[0];

    for (let value of inputArray) {
        if (value > max) {
            max = value;
        }
    }
    return max;
}

function getLowest(inputArray) {
    var min = inputArray[0];

    for (let value of inputArray) {
        if (value < min) {
            min = value;
        }
    }
    return min;
}

function getTotal(inputArray) {
    let total = 0;
    for (let value of inputArray) {
        total = total + value;
    }
    return total;
}

function getNumberFromElement(element) {

    let text = element.value;

    var result = Number(text);

    if (isNaN(result)) {
        // fail with bad number input
        element.className = "menuInputError";
        return NaN;
    }

    // get the max and min values from the input field
    var max = Number(element.getAttribute("max"));
    var min = Number(element.getAttribute("min"));

    if (result > max || result < min) {
        // fail because outside range
        element.className = "menuInputError";
        return NaN;
    }

    // if we get here the number is valid
    // set to normal background
    element.className = "menuInput";

    return result;
}

function doCalc() {

    var sales = [];
    var salesPos = 0;

    var salesElement = document.getElementById('salesItems');

    for (let item of salesElement.children) {

        let salesValue = getNumberFromElement(item.children[1]);

        sales[salesPos] = salesValue;

        salesPos = salesPos + 1;
    }

    var totalSales = getTotal(sales);

    var result;

    if (isNaN(totalSales)) {
        result = "Please enter numbers in the correct range"
    }
    else {

        var highestSales = getHighest(sales);
        var lowestSales = getLowest(sales);

        result = "Total:" + totalSales + " Highest:" + highestSales + " Lowest:" + lowestSales;
    }

    var outputElement = document.getElementById('outputParagraph');
    outputElement.textContent = result;
}   

