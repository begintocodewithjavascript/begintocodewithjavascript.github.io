var contactNames = [];
var contactAddresses = [];
var contactPhones = [];

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

function displayContact(pos){
    displayElementValue("name", contactNames[pos]);
    displayElementValue("address", contactAddresses[pos]);
    displayElementValue("phone", contactPhones[pos]);
}


function storeContact(pos){
    contactNames[pos] = getElementValue("name");
    contactAddresses[pos] = getElementValue("address");
    contactPhones[pos] = getElementValue("phone");
}

function findContactPos(name) {
    for(let pos=0;pos<contactNames.length;pos=pos+1){
        if(contactNames[pos]==name) {
            return pos;
        }
    }
    return NaN;
}

function doSave() {

    // get the name of the contact being saved
    var name = getElementValue("name");

    // find the position of the name to save
    var pos = findContactPos(name);

    if(isNaN(pos)){
        // if we didn't find an existing contact name
        // we put the contact on the end of the array
        pos = contactNames.length;
    }

    storeContact(pos);
}

function doFind() {

    var name = getElementValue("name");

    var pos = findContactPos(name);
    
    if(isNaN(pos)){
        displayContactNotFound();
    }
    else{
        displayContact(pos);
    }
}