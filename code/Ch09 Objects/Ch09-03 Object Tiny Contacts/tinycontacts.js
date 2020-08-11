var contactStore = [];

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
    var contact = contactStore[pos];
    displayElementValue("name", contact.name);
    displayElementValue("address", contact.address);
    displayElementValue("phone", contact.phone);
}


function storeContact(pos){
    var contact = {};
    contact.name = getElementValue("name");
    contact.address = getElementValue("address");
    contact.phone = getElementValue("phone");
    contactStore[pos]=contact;
}

function findContactPos(name) {
    for(let pos=0;pos<contactStore.length;pos=pos+1){
        let storedName=contactStore[pos].name;
        if(storedName==name) {
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
        pos = contactStore.length;
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