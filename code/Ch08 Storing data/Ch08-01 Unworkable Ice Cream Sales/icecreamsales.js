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

    var sales1, sales2, sales3, sales4, sales5, sales6;

    sales1 = getNumberFromElement("s1SalesText");
    sales2 = getNumberFromElement("s2SalesText");
    sales3 = getNumberFromElement("s3SalesText");
    sales4 = getNumberFromElement("s4SalesText");
    sales5 = getNumberFromElement("s5SalesText");
    sales6 = getNumberFromElement("s6SalesText");

    var total = sales1 + sales2 + sales3 + sales4 + sales5 + sales6;

    var highestSales;

    if (sales1 > sales2 && sales1 > sales3 && sales1 > sales4 &&
        sales1 > sales5 && sales1 > sales6) {
        highestSales = sales1;
    }

    // at this point I gave up becuse we really should be using 
    // an array to do this
}

