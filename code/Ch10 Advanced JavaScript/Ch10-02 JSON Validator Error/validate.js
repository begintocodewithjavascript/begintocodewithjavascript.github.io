function doValidate() {
  var inputElement = document.getElementById("inputString");
  var outputElement = document.getElementById("outputResult");

  var inputText = inputElement.value;
  try {
    var result = JSON.parse(inputText);
    outputElement.innerText = "Valid JSON";
  }
  catch (error) {
    var errorElement = document.getElementById("outputError");
    errorElement.innerText = error;
    outputElement.innerText = "Invalid JSON";
  }
}
