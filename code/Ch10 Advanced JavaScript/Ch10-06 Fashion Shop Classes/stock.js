class StockItem{

    constructor(stockRef, stockLevel, price, description, color) {
        this.stockRef = stockRef;
        this.price = price;
        this.stockLevel = stockLevel;
        this.description = description;
        this.color = color;
    }

}

class BrokenDress extends StockItem{

    constructor(stockRef, stockLevel, price, description, color, pattern, size){
        this.pattern = pattern;
        this.size = size;
    }
}

class Dress extends StockItem{

    constructor(stockRef, stockLevel, price, description, color, pattern, size){
        super(stockRef,stockLevel, price, description, color);
        this.pattern = pattern;
        this.size = size;
    }
}

class Pants extends StockItem{

    constructor(stockRef, stockLevel, price, description, color, pattern, length, waist){
        super(stockRef,stockLevel, price, description, color);
        this.pattern = pattern;
        this.length = length;
        this.waist = waist;
    }
}
