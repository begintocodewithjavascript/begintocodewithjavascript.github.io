function getCustomDiceSpots(min, max) {
    var range = max - min + 1;
    var spots = Math.floor(Math.random() * (range)) + min;
    return spots;
}

function getNumberFromElement(name)
{
    var element = document.getElementById(name);
    var text = element.value;
    var result = Number(text);
    return result;
}

function doRollDice(minElementName, maxElemementName, outputElementName) {

    var min = getNumberFromElement(minElementName);
    var max = getNumberFromElement(maxElemementName);

    var spots = getCustomDiceSpots(min, max);

    var message = "Rolled: " + spots;

    var outputElement = document.getElementById(outputElementName);
    outputElement.textContent = message;
}
