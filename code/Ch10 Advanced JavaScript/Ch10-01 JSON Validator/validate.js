function doValidate(){
    var inputElement = document.getElementById("inputString");
    var outputElement = document.getElementById("outputResult");

    var inputText = inputElement.value;
    try {
      var result = JSON.parse(inputText);
      outputElement.innerText = "Valid JSON";
    }
    catch {
      outputElement.innerText = "Invalid JSON";
    }
  }
