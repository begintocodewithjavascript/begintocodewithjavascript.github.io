

class StockItem {

    static getRandomInt(min, max) {
        var range = max - min + 1;
        var spots = Math.floor(Math.random() * (range)) + min;
        return spots;
    }

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

    static getHTML(containerElementId) {
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
