class Sprite {

    constructor(game, url) {
        this.game = game;
        this.url = url;
    }

    reset() {
        this.x = 0;
        this.y = 0;
    }

    getInitialisePromise() {
        return new Promise((resolve, reject) => {
            this.image = new Image();
            this.image.src = this.url;
            this.image.onload = () => {
                this.reset();
                resolve(true);
            }
            this.image.onerror = () => reject(new Error('Could not load' + this.url));
        });
    }

    update() {
    }

    draw() {
        this.game.context.drawImage(this.image, this.x, this.y);
    }
}

class Cracker extends Sprite {

    constructor(game, imageUrl, audioURL) {
        super(game, imageUrl);

        this.audioURL = audioURL;
        this.audio = new Audio();
        this.audio.src = this.audioURL;

        this.width = game.canvasWidth / 20;
        this.height = game.canvasWidth / 20;
    }

    getRandomInt(min, max) {
        var range = max - min + 1;
        var result = Math.floor(Math.random() * (range)) + min;
        return result;
    }

    intersectsWith(sprite) {
        if ((this.x + this.width) < sprite.x) return false;
        if ((this.y + this.height) < sprite.y) return false;
        if (this.x > (sprite.x + sprite.width)) return false;
        if (this.y > (sprite.y + sprite.width)) return false;
        return true;
    }

    update() {
        if (this.intersectsWith(this.game.cheese)) {
            this.audio.play();
            this.reset();
            this.game.score = this.game.score + 10;
        }
    }

    reset() {
        this.x = this.getRandomInt(0, this.game.canvasWidth - this.width)
        this.y = this.getRandomInt(0, this.game.canvasHeight - this.height)
    }

    draw() {
        this.game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    getInitialisePromisex() {
        var imagePromise = super.getInitialisePromise();

        var soundPromise =  new Promise((resolve, reject) => {
            this.audio = new Audio();
            this.audio.src = this.audioURL;
            console.log("Loading " + this.audio.src)
            this.audio.onload = () => {
                console.log("audio loaded");
                resolve(true);
            }
            this.audio.onerror = () => reject(new Error('Could not load' + this.url));
        });

        var promiseList = [ soundPromise ];

        return Promise.all(promiseList);
    }

}

class Tomato extends Sprite {
    constructor(game, imageUrl, entryDelay) {
        super(game, imageUrl);
        console.log(entryDelay);
    
        this.entryDelay = entryDelay; 
    
        this.width = game.canvasWidth / 12;
        this.height = game.canvasWidth / 12;
        this.acceleration = 0.1 + (entryDelay / 10000); 
        this.friction = 0.99;
    }
    
    reset(){
        this.x=-this.width;
        this.y=-this.height;
        this.entryCount = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    update(){

        this.entryCount = this.entryCount + 1;

        if (this.entryCount < this.entryDelay) {
            return;
        }

        if(this.game.cheese.x > this.x){
            this.xSpeed = this.xSpeed + this.acceleration;
        }
        else {
            this.xSpeed = this.xSpeed - this.acceleration;
        }

        if(this.game.cheese.y > this.y){
            this.ySpeed = this.ySpeed + this.acceleration;
        }
        else {
            this.ySpeed = this.ySpeed - this.acceleration;
        }

        this.xSpeed = this.xSpeed * this.friction;
        this.ySpeed = this.ySpeed * this.friction;

        this.x = this.x + this.xSpeed;
        this.y = this.y + this.ySpeed;
    }

    draw() {
        this.game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

}

class Cheese extends Sprite {

    constructor(game, url) {
        super(game, url);

        this.width = game.canvasWidth / 15;
        this.height = game.canvasWidth / 15;

        this.speed = 5;
        this.xSpeed = 0;
        this.ySpeed = 0;

        window.addEventListener("keydown", (event) => {
            switch (event.code) {
                case 'ArrowLeft':
                    this.xSpeed = -this.speed;
                    break;
                case 'ArrowRight':
                    this.xSpeed = this.speed;
                    break;
                case 'ArrowUp':
                    this.ySpeed = -this.speed;
                    break;
                case 'ArrowDown':
                    this.ySpeed = this.speed;
                    break;
            }
        });
        window.addEventListener("keyup", (event) => {
            switch (event.code) {
                case 'ArrowLeft':
                    this.xSpeed = 0;
                    break;
                case 'ArrowRight':
                    this.xSpeed = 0;
                    break;
                case 'ArrowUp':
                    this.ySpeed = 0;
                    break;
                case 'ArrowDown':
                    this.ySpeed = 0;
                    break;
            }
        });
    }

    reset() {
        this.x = (this.game.canvasWidth - this.width) / 2.0;
        this.y = (this.game.canvasHeight - this.height) / 2.0;
    }

    update() {
        super.update();

        this.x = this.x + this.xSpeed;
        this.y = this.y + this.ySpeed;

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.game.canvasWidth) {
            this.x = this.game.canvasWidth - this.width;
        }

        if (this.y < 0) this.y = 0;
        if (this.y + this.height > this.game.canvasHeight) {
            this.y = this.game.canvasHeight - this.height;
        }
    }

    draw() {
        this.game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

}

class CrackerChaseGame {

    gameUpdate(timeStamp) {

        for (let sprite of this.sprites) {
            sprite.update();
        }


        for (let sprite of this.sprites) {
            sprite.draw();
        }

        this.context.font = "40px Arial";
        this.context.fillStyle = "red";
        this.context.fillText("Score: " + this.score, 10, 40);

        window.requestAnimationFrame(this.gameUpdate.bind(this));
    }

    gameReset() {
        for (let sprite of this.sprites) {
            sprite.reset();
        }
    }

    constructor() {

        this.canvas = document.getElementById("canvas");
        this.context = canvas.getContext('2d');

        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        this.score=0;
        
        this.sprites = [];

        this.background = new Sprite(this, 'images/background.png');
        this.sprites[this.sprites.length] = this.background;

        for (let i = 0; i < 30; i = i + 1) {
            this.sprites[this.sprites.length] = new Cracker(this, 'images/cracker.png', 'sounds/burp.wav');;
        }

        for (let tomatoCount = 0; tomatoCount < 5; tomatoCount = tomatoCount + 1) {
            let entryDelay = 300 + (tomatoCount * 600);
            this.sprites[this.sprites.length] = 
                new Tomato(this, 'images/tomato.png', entryDelay);;
        }

        this.cheese = new Cheese(this, 'images/cheese.png');
        this.sprites[this.sprites.length] = this.cheese;
    }

    async gameInitialize() {
        var promiseList = [];
        for (let sprite of this.sprites) {
            promiseList[promiseList.length] = sprite.getInitialisePromise();
        }

        await Promise.all(promiseList);
    }

    gameStart() {
        this.gameReset();
        window.requestAnimationFrame(this.gameUpdate.bind(this));
    }
}

async function doGame() {
    var activeGame = new CrackerChaseGame();
    await activeGame.gameInitialize();
    activeGame.gameStart();
}
