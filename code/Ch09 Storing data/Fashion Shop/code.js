function doAddition() {
    let no1Number = Number(no1Text.value);
    let no2Number = Number(no2Text.value);
    let result = no1Number + no2Number;
    let resultDisplay = document.getElementById("resultParagraph");
    resultDisplay.innerHTML = result;
}
