function displayElementValue(id, text){
    var element = document.getElementById(id);
    element.value = text;
}

function getElementValue(id){
    var element = document.getElementById(id);
    return element.value;
}

function displayContactNotFound()
{
    alert("Not found");
}

function doSave() {
    alert("Saves a contact in the store");
}

function doFind() {
    var name = getElementValue("name");
    if(name=="Rob Miles")
    {
        displayElementValue("address", "18 Pussycat Mews\nLondon\nNE1 410S");
        displayElementValue("phone", "+44(1234) 56789");
    }
    else {
        displayContactNotFound();
    }
}