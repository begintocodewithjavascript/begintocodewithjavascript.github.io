class StockItem{
    constructor(stockRef, stockLevel, price, description, color) {
        this.stockRef = stockRef;
        this.stockLevel = stockLevel;
        this.price = price;
        this.description = description;
        this.color = color;
    }
}

class Dress extends StockItem{

    constructor(stockRef, stockLevel, price, description, color, pattern, size) {
        super(stockRef, stockLevel, price, description, color);
        this.pattern = pattern;
        this.size = size;
    }

    getDescription(){
        var result = "Ref:" + this.stockRef +
            " Price:" + this.price +
            " Stock:" + this.stockLevel +
            " Description:" + this.description +
            " Color:" + this. color +
            " Pattern:" + this.pattern +
            " Size:" + this.size ;
        return result;
    }
}

class Pants extends StockItem{

    constructor(stockRef, stockLevel, price, description, color, pattern, length, waist) {
        super(stockRef, stockLevel, price, description, color);
        this.pattern = pattern;
        this.length = length;
        this.waist = waist;
    }

    getDescription(){
        var result = "Ref:" + this.stockRef +
            " Price:" + this.price +
            " Stock:" + this.stockLevel +
            " Description:" + this.description +
            " Color:" + this. color +
            " Pattern:" + this.pattern +
            " Waist:" + this.waist +
            " Length:" + this.length ;
        
        return result;
    }
}
