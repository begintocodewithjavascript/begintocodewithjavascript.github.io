var dataStore = [];

var storeName ;

function loadDataStore(){

    var dataString = localStorage.getItem(storeName);

    if(dataString==null){
        dataStore = [];
        return false;
    }

    dataStore = JSON.parse(dataString);    

    return true;
}

function saveDataStore(){

    var storeJson = JSON.stringify(dataStore);

    localStorage.setItem(storeName, storeJson);
}

function displayElementValue(id, text){
    var element = document.getElementById(id);
    element.value = text;
}

function getElementValue(id){
    var element = document.getElementById(id);
    return element.value;
}

function displayDataNotFound()
{
    alert("Not found");
}

function displayElement(id, text){
    var element = document.getElementById(id);
    element.value = text;
}

function displayData(pos){

    var data = dataStore[pos];

    for(item of dataSchema){
        displayElement(item.id, data[item.id]);
    }
}


function storeData(pos){
    // Create an empty data item
    var newData = {};

    // Work through the data schema
    for(property of dataSchema){
        // Get the data out of the HTML element
        let itemData = getElementValue(property.id);
        // Create a property to store that data
        newData[property.id] = itemData;
    }
    // put the new data in the storage array
    dataStore[pos]=newData;

    // save the data store 
    saveDataStore();
}

function findDataPos(name) {
    for(let pos=0;pos<dataStore.length;pos=pos+1){
        let storedName=dataStore[pos].name;
        if(storedName==name) {
            return pos;
        }
    }
    return NaN;
}

function copyProperty(source, dest, name){
    var sourceValue = source[name];
    dest.setAttribute(name, sourceValue );
}

function makeInputElement(element) {
    var inputElement = document.createElement("input");
    inputElement.className = "inputText";
    return inputElement;
}

function makeTextareaElement(element) {
    var areaElement = document.createElement("textarea");
    areaElement.className = "inputTextarea";
    copyProperty(element, areaElement, "rows");
    copyProperty(element, areaElement, "cols");
    return areaElement;
}

function makeElement(element) {
    // Create the enclosing paragraph
    var inputPar = document.createElement("p");

    var labelElement = document.createElement("label");
    labelElement.innerText = element.prompt + ":";
    labelElement.className = "inputLabel";
    labelElement.setAttribute("for", element.id);
    inputPar.appendChild(labelElement);

    var inputElement = null;

    switch (element.type) {
        case "input":
            inputElement = makeInputElement(element);
            break;

        case "textarea":
            inputElement = makeTextareaElement(element);
            break;
    }

    if (inputElement == null) {
        return null;
    }

    inputElement.setAttribute("id", element.id);
    inputElement.setAttribute("value", "");
    inputPar.appendChild(inputElement);
    return inputPar;
}


function doBuildPage(containerElementID, schema){

    // store the schema for use later by the application
    dataSchema = schema;

    // get a reference to the element containing the edit items
    var containerElement = document.getElementById(containerElementID);

    // work through each of the items in the schema
    for (item of dataSchema) {
        // make an element for that item
        let itemElement = makeElement(item);
        // add the element to the container
        containerElement.appendChild(itemElement);
    }
}

function doSave() {

    // get the name of the data being saved
    var name = getElementValue("name");

    // find the position of the name to save
    var pos = findDataPos(name);

    if(isNaN(pos)){
        // if we didn't find an existing data name
        // we put the data on the end of the array
        pos = dataStore.length;
    }

    storeData(pos);
}

function doFind() {

    var name = getElementValue("name");

    var pos = findDataPos(name);
    
    if(isNaN(pos)){
        displayDataNotFound();
    }
    else{
        displayData(pos);
    }
}

function doStartTinyData(storeNameToUse){
    storeName = storeNameToUse;

    if(!loadDataStore()){
        alert("Empty store created");
    }

}