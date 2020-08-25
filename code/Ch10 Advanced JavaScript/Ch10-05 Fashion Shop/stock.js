class StockItem {

    static getLargestStockRef(items) {
        if (items.length == 0) {
            return 0;
        }

        var largest = items[0].stockRef;

        for (const item of items) {
            if (item.stockRef > largest) {
                largest = item.stockRef;
            }
        }

        return largest;
    }


    static getRandomInt(min, max) {
        var range = max - min + 1;
        var spots = Math.floor(Math.random() * (range)) + min;
        return spots;
    }

    static makeElement(description) {
        // Create the enclosing paragraph
        var inputPar = document.createElement("p");

        // Create the label for the element
        var labelElement = document.createElement("label");
        labelElement.innerText = description.prompt + ":";
        labelElement.className = "inputLabel";
        labelElement.setAttribute("for", description.id);
        inputPar.appendChild(labelElement);

        var inputElement;

        // decide what kind of element to make
        switch (description.type) {
            case "input":
                inputElement = document.createElement("input");
                inputElement.className = "inputText";
                break;

            case "textarea":
                inputElement = document.createElement("textarea");
                inputElement.className = "inputTextarea";
                inputElement.setAttribute("rows", description.rows);
                inputElement.setAttribute("cols", description.cols);
                break;
            // add new kinds of element here
        }

        // set the id for the element
        inputElement.setAttribute("id", description.id);
        // give the element an initial value
        inputElement.setAttribute("value", "");
        // add the element to the paragraph
        inputPar.appendChild(inputElement);
        // return the whole paragraph
        return inputPar;
    }

    static StockItemSchema = [
        { id: "price", prompt: "Price", type: "input" },
        { id: "stockLevel", prompt: "Stock Level", type: "input" },
        { id: "description", prompt: "Description", type: "textarea", rows: 5, cols: 40 },
        { id: "color", prompt: "Color", type: "input" }];

    static buildElementsFromSchema(HTMLdisplay, dataSchema) {
        // work through each of the items in the schema
        for (let item of dataSchema) {
            // make an element for that item
            let itemElement = StockItem.makeElement(item);
            // add the element to the container
            HTMLdisplay.appendChild(itemElement);
        }
    }

    constructor(stockRef, stockLevel, price, description, color) {
        this.stockRef = stockRef;
        this.stockLevel = stockLevel;
        this.price = price;
        this.description = description;
        this.color = color;
    }

    getDescription() {
        var result = "Ref:" + this.stockRef +
            " Price:" + this.price +
            " Stock:" + this.stockLevel +
            " Description:" + this.description +
            " Color:" + this.color;

        return result;
    }

    sendToHTML() {
        // work through each of the items in the object
        for (let item in this) {
            if (item == "type" || item == "stockRef") {
                // don't add the type or stockref to the HTML
                continue;
            }
            // get the element to send to
            let itemElement = document.getElementById(item);
            // set the element to the value in this object
            itemElement.value = this[item];
        }
    }

    loadFromHTML() {
        // work through each of the items in the object
        for (let item in this) {
            if (item == "type" || item == "stockRef") {
                // don't load the type or stockref from the HTML
                continue;
            }
            // get the element to load from
            let itemElement = document.getElementById(item);
            // set the element to the value in this object
            this[item] = itemElement.value;
        }
    }

    isDirty() {
        for (let item in this) {
            if (item == "type" || item == "stockRef") {
                // don't test the type or stockref from the HTML
                continue;
            }
            // get the element to load from
            let itemElement = document.getElementById(item);
            // set the element to the value in this object
            if (this[item] != itemElement.value) {
                return true;
            }
        }
        return false;
    }

    getHTML(containerElementId) {
        StockItem.buildElementsFromSchema(containerElementId, StockItem.StockItemSchema);
    }

    JSONstringify() {
        return JSON.stringify(this);
    }

    static JSONparse(text) {
        var rawObject = JSON.parse(text);
        var result = null;

        switch (rawObject.type) {
            case "dress":
                result = new Dress();
                break;
            case "pants":
                result = new Pants();
                break;
            case "skirt":
                result = new Skirt();
                break;
            case "top":
                result = new Top();
                break;
        }

        Object.assign(result, rawObject);
        return result;
    }
}

class Dress extends StockItem {

    constructor(stockRef, stockLevel, price, description, color, pattern, size) {
        super(stockRef, stockLevel, price, description, color);
        this.type = "dress";
        this.pattern = pattern;
        this.size = size;
    }

    getDescription() {

        var result = super.getDescription() +
            " Pattern:" + this.pattern +
            " Size:" + this.size;
        return result;
    }

    static DressSchema = [{ id: "pattern", prompt: "Pattern", type: "input" },
    { id: "size", prompt: "Size", type: "input" }];

    getHTML(containerElementId) {
        super.getHTML(containerElementId);
        StockItem.buildElementsFromSchema(containerElementId, Dress.DressSchema);
    }

    static colors = ["red", "blue", "green", "yellow"];
    static patterns = ['plain', 'striped', 'spotted', 'swirly'];
    static sizes = [8, 10, 12, 14];

    static getTestItems(dest) {
        var stockNo = StockItem.getLargestStockRef(dest) + 1;
        for (let color of Dress.colors) {
            for (let pattern of Dress.patterns) {
                for (let size of Dress.sizes) {
                    let price = StockItem.getRandomInt(10, 200);
                    let stock = StockItem.getRandomInt(0, 15);
                    let description = color + " " + pattern + " dress";
                    dest[dest.length] = new Dress(stockNo, stock, price, description, color, pattern, size);
                    stockNo = stockNo + 1;
                }
            }
        }
    }
}

class Pants extends StockItem {

    constructor(stockRef, stockLevel, price, description, color, pattern, length, waist) {
        super(stockRef, stockLevel, price, description, color);
        this.type = "pants";
        this.pattern = pattern;
        this.length = length;
        this.waist = waist;
    }

    getDescription() {
        var result = super.getDescription() +
            " Pattern:" + this.pattern +
            " Waist:" + this.waist +
            " Length:" + this.length;

        return result;
    }

    static PantsSchema = [{ id: "pattern", prompt: "Pattern", type: "input" },
    { id: "length", prompt: "Length", type: "input" },
    { id: "waist", prompt: "Waist", type: "input" }];

    getHTML(containerElementId) {
        super.getHTML(containerElementId);
        StockItem.buildElementsFromSchema(containerElementId, Pants.PantsSchema);
    }

    static colors = ["red", "blue", "green", "yellow"];
    static patterns = ['plain', 'lines'];
    static lengths = [28, 30, 32];
    static waists = [24, 28, 30, 32];

    static getTestItems(dest) {
        var stockNo = StockItem.getLargestStockRef(dest) + 1;
        for (let color of Pants.colors) {
            for (let pattern of Pants.patterns) {
                for (let length of Pants.lengths) {
                    for (let waist of Pants.waists) {
                        let price = StockItem.getRandomInt(10, 200);
                        let stock = StockItem.getRandomInt(0, 15);
                        let description = color + " " + pattern + " pants";
                        dest[dest.length] = new Pants(stockNo, stock, price, description, color, pattern, length, waist);
                        stockNo = stockNo + 1;
                    }
                }
            }
        }
    }
}

class Skirt extends StockItem {

    constructor(stockRef, stockLevel, price, description, color, pattern, waist) {
        super(stockRef, stockLevel, price, description, color);
        this.type = "skirt";
        this.pattern = pattern;
        this.waist = waist;
    }

    getDescription() {
        var result = super.getDescription() +
            " Pattern:" + this.pattern +
            " Waist:" + this.waist;

        return result;
    }

    static SkirtSchema =
        [{ id: "pattern", prompt: "Pattern", type: "input" },
        { id: "waist", prompt: "Waist", type: "input" }];

    getHTML(containerElementId) {
        super.getHTML(containerElementId);
        StockItem.buildElementsFromSchema(containerElementId, Skirt.SkirtSchema);
    }

    static colors = ["red", "blue", "green", "yellow"];
    static patterns = ['plain', 'stripes', 'dots'];
    static waists = [24, 30, 32];

    static getTestItems(dest) {
        var stockNo = StockItem.getLargestStockRef(dest) + 1;
        for (let color of Skirt.colors) {
            for (let pattern of Skirt.patterns) {
                for (let waist of Skirt.waists) {
                    let price = StockItem.getRandomInt(10, 200);
                    let stock = StockItem.getRandomInt(0, 15);
                    let description = color + " " + pattern + " skirt";
                    dest[dest.length] = new Skirt(stockNo, stock, price, description, color, pattern, waist);
                    stockNo = stockNo + 1;
                }
            }
        }
    }
}

class Top extends StockItem {

    constructor(stockRef, stockLevel, price, description, color, pattern, size) {
        super(stockRef, stockLevel, price, description, color);
        this.type = "top";
        this.pattern = pattern;
        this.size = size;
    }

    getDescription() {
        var result = super.getDescription() +
            " Pattern:" + this.pattern +
            " Size:" + this.size;

        return result;
    }

    static TopSchema =
        [{ id: "pattern", prompt: "Pattern", type: "input" },
        { id: "size", prompt: "Size", type: "input" }];

    getHTML(containerElementId) {
        super.getHTML(containerElementId);
        StockItem.buildElementsFromSchema(containerElementId, Top.TopSchema);
    }

    static colors = ["red", "blue", "green", "yellow"];
    static patterns = ['plain', 'lines'];
    static sizes = [8, 10, 14];

    static getTestItems(dest) {
        var stockNo = StockItem.getLargestStockRef(dest) + 1;
        for (let color of Top.colors) {
            for (let pattern of Top.patterns) {
                for (let size of Top.sizes) {
                    let price = StockItem.getRandomInt(10, 200);
                    let stock = StockItem.getRandomInt(0, 15);
                    let description = color + " " + pattern + " Top";
                    dest[dest.length] = new Top(stockNo, stock, price, description, color, pattern, size);
                    stockNo = stockNo + 1;
                }
            }
        }
    }
}

