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

class CrackerChaseGame {

    gameUpdate(timeStamp) {

        for (let sprite of this.sprites) {
            sprite.update();
        }


        for (let sprite of this.sprites) {
            sprite.draw();
        }

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

        this.sprites = [];

        this.background = new Sprite(this, 'images/background.png');
        this.sprites[this.sprites.length] = this.background;
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
