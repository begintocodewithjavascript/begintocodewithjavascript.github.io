function makeInputPar(labelText, min, max) {
    var inputPar = document.createElement("p");

    var labelElement = document.createElement("label");
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


function doBuildSalesInputItems(containerElementID, min, max, placeNames) {
    var containerElement = document.getElementById(containerElementID);

    for (placeName of placeNames) {
        let itemPar = makeInputPar(placeName, min, max);
        containerElement.appendChild(itemPar);
    }
}

function getHighest(inputArray) {
    var max = inputArray[0];

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
    var total = 0;
    for (let value of inputArray) {
        total = total + value;
    }
    return total;
}

function getNumberFromElement(element) {

    var text = element.value;

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

    for (const item of salesElement.children) {

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

        // Highlight highest and lowest

        for (const item of salesElement.children) {

            let salesValue = getNumberFromElement(item.children[1]);

            // reset the class to the default one
            item.children[1].className="menuInput";

            if(salesValue==highestSales){
                item.children[1].className="menuInputHighest";
            }

            if(salesValue==lowestSales){
                item.children[1].className="menuInputLowest";
            }
        }
    }

    var outputElement = document.getElementById('outputParagraph');
    outputElement.textContent = result;
}   

