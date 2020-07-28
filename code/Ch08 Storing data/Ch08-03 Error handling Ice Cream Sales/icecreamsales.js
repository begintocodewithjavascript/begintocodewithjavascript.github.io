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


function getNumberFromElement(elementID) {
    var element = document.getElementById(elementID);
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

    sales[0] = getNumberFromElement("s0SalesText");
    sales[1] = getNumberFromElement("s1SalesText");
    sales[2] = getNumberFromElement("s2SalesText");
    sales[3] = getNumberFromElement("s3SalesText");
    sales[4] = getNumberFromElement("s4SalesText");
    sales[5] = getNumberFromElement("s5SalesText");

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

