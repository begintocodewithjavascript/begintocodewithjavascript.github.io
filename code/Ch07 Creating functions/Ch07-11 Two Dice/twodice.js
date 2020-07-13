function getCustomDiceSpots(min, max) {
    var range = max - min + 1;
    var spots = Math.floor(Math.random() * (range)) + min;
    return spots;
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

function doRollDice(minElementName, maxElemementName, outputElementName) {


    var outputElement = document.getElementById(outputElementName);

    var minRand = getNumberFromElement(minElementName);
    var maxRand = getNumberFromElement(maxElemementName);

    if (isNaN(minRand) || isNaN(maxRand)) {
        outputElement.textContent="Invalid range values";
        return;
    }

    if (minRand >= maxRand) {
        outputElement.textContent="Minimum above maximum";
        return;
    }

    var spots = getCustomDiceSpots(minRand, maxRand);
    var message = "Rolled: " + spots;
    outputElement.textContent = message;
}

