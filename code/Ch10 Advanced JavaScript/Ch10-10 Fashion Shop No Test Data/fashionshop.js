var mainPage;   // HTML element that contains the user interface
var dataStore;  // Array of stock items
var storeName;  // name of save data in local storage
var activeItem; // currently active stock item (for entry and edit)

const STORE_LOAD_OK = 0;
const STORE_EMPTY = 1;
const STORE_INVALID = 2;

function loadDataStore() {

    // get the data array from local storage
    var dataArrayJSON = localStorage.getItem(storeName);

    // if there is no data make an empty store
    if (dataArrayJSON == null) {
        dataStore = [];
        return STORE_EMPTY;
    }

    // read the stored contacts
    dataStore = [];

    try {
        var dataArray=JSON.parse(dataArrayJSON);

        for (dataLine of dataArray) {
            dataStore[dataStore.length] = StockItem.JSONparse(dataLine);
        }
    }
    catch {
        // if the parse fails make an empty store
        dataStore = [];
        return STORE_INVALID;
    }

    return STORE_LOAD_OK;
}

function saveDataStore() {
    var dataArray = [];

    for(item of dataStore)
    {
        dataArray[dataArray.length] = item.JSONstringify();
    }

    var dataJSON = JSON.stringify(dataArray);

    localStorage.setItem(storeName, dataJSON);
}


function clearPage() {
    // clear the display
    while (mainPage.children.length > 0)
        mainPage.removeChild(mainPage.children[0]);
}

function openPage(title) {
    clearPage();
    let titlePar = document.createElement("p");
    titlePar.innerText = title;
    titlePar.className = "pageTitle";
    mainPage.appendChild(titlePar);
}

function showMenu(schema) {
    for (const buttonDesc of schema) {
        let buttonPar = document.createElement("p");
        buttonPar.className = "menuPar";

        let descriptionPar = document.createElement("p");
        descriptionPar.innerText = buttonDesc.desc;
        descriptionPar.className = "menuButtonCaption";
        buttonPar.appendChild(descriptionPar);

        let button = document.createElement("button");
        button.innerText = buttonDesc.label;
        button.className = "menuButton";
        button.setAttribute("onclick", buttonDesc.func);
        buttonPar.appendChild(button);

        mainPage.appendChild(buttonPar);
    }
}

function doShowMainMenu() {
    openPage("Main Menu");

    showMenu(
        [{ desc: "Add Dress", label: "Dress", func: "doAddDress()" },
        { desc: "Add Pants", label: "Pants", func: "doAddPants()" },
        { desc: "Add Skirt", label: "Skirt", func: "doAddSkirt()" },
        { desc: "Add Top", label: "Top", func: "doAddTop()" },
        { desc: "Update stock item", label: "Update", func: "doUpdateStock()" },
        { desc: "List stock items", label: "List", func: "doListFashionShop()" }]);
}

function addStock(StockClass) {

    activeItem = new StockClass();

    openPage("Add " + activeItem.type);

    activeItem.getHTML(mainPage);

    showMenu(
        [{ desc: "Save item", label: "Save", func: "doSaveAdd()" },
        { desc: "Cancel add", label: "Cancel", func: "doShowMainMenu()" }]);
}

function doSaveAdd() {
    activeItem.loadFromHTML();
    activeItem.stockRef = StockItem.getLargestStockRef(dataStore) + 1;
    dataStore[dataStore.length] = activeItem;
    alert(activeItem.type + " " + activeItem.stockRef + " added");
    saveDataStore();
    doShowMainMenu();
}

function doAddDress() {
    addStock(Dress);
}

function doAddPants() {
    addStock(Pants);
}

function doAddSkirt() {
    addStock(Skirt);
}

function doAddTop() {
    addStock(Top);
}

function doListFashionShop() {

    openPage("Stock List");

    for (let item of dataStore) {
        let itemPar = document.createElement("p");

        let openButton = document.createElement("button");
        openButton.innerText = "Update";
        openButton.className = "itemButton";
        let editFunctionCall = "doUpdateItem('" + item.stockRef + "')";
        openButton.setAttribute("onclick", editFunctionCall);
        itemPar.appendChild(openButton);

        let detailsElement = document.createElement("p");
        detailsElement.innerText = item.getDescription();
        detailsElement.className = "itemList";
        itemPar.appendChild(detailsElement);

        mainPage.appendChild(itemPar);
    }
}

function findItem(stockRef) {
    for (let item of dataStore) {
        if (item.stockRef == stockRef) {
            return item;
        }
    }
    return null;
}

function doUpdateItem(stockRef) {

    var item = findItem(stockRef);

    if (item == null) {
        return false;
    }

    activeItem = item;

    openPage("Update " + item.type + " " + stockRef);

    item.getHTML(mainPage);

    item.sendToHTML();

    showMenu(
        [{ desc: "Save updates", label: "Save", func: "doSaveUpdate()" },
        { desc: "Cancel updates", label: "Cancel", func: "doCancelUpdate()" }]);

    return true;
}

function doSaveUpdate() {
    activeItem.loadFromHTML();
    alert(activeItem.type + " " + activeItem.stockRef + " updated");
    saveDataStore();
    doShowMainMenu();
}


function doCancelUpdate() {
    doShowMainMenu();
}


function doUpdateStock() {
    openPage("Update Stock");
    StockItem.buildElementsFromSchema(mainPage,
        [{ id: "findStockRef", prompt: "Reference", type: "input" }]);

    showMenu(
        [{ desc: "Find item", label: "Find", func: "doFindItem()" },
        { desc: "Cancel updates", label: "Cancel", func: "doCancelUpdate()" }]);
}

function doFindItem() {
    var searchRefElement = document.getElementById("findStockRef");
    var searchRef = searchRefElement.value;

    if (!doUpdateItem(searchRef)) {
        alert("Item " + searchRef + " not found");
    }
}

function doListStock() {
    openPage("List Stock");
    doListFashionShop();
}

function doMakeTestFashionShop() {
    dataStore = [];
    Dress.getTestItems(dataStore);
    Pants.getTestItems(dataStore);
    Skirt.getTestItems(dataStore);
    Top.getTestItems(dataStore);
}

function doStartFashionShop(mainPageId, storeNameToUse) {
    mainPage = document.getElementById(mainPageId);

    storeName = storeNameToUse;

    var loadResult = loadDataStore();

    switch(loadResult){
        case STORE_LOAD_OK:
            break;
        case STORE_EMPTY:
            alert("Empty store created");
            saveDataStore();
            break;
        case STORE_INVALID:
            alert("Store invalid. Empty store created");
            saveDataStore();
            break;
    }

    doShowMainMenu();
}

