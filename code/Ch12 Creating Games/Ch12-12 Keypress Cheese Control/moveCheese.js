function getImageLoadPromise(url) {
    return new Promise((kept, broken) => {
        var image = new Image();
        image.src = url;
        image.onload = () => kept(image);
        image.onerror = () => broken(new Error('Could not load' + url));
    });
}

async function getImages(imageUrls) {

    var promiseList = [];

    for (url of imageUrls) {
        promiseList[promiseList.length] = getImageLoadPromise(url);
    }

    var result = await Promise.all(promiseList);

    return result;
}

var context;
var cheese;
var x = 0;
var y = 0;
var canvasWidth=800;
var canvasHeight=600;

function gameUpdate(timeStamp) {
    context.fillStyle = "cornflowerblue";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    
    context.drawImage(cheese, x, y);
    window.requestAnimationFrame(gameUpdate);
}

async function doMoveCheese() {

    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {

        context = canvas.getContext('2d');

        var imageNames = ["cheese.png"];
        var images = await getImages(imageNames);

        cheese = images[0];

        window.addEventListener("keydown", (event) => {
            switch(event.code){
                case 'ArrowLeft':
                    x = x - 1;
                    break;
                case 'ArrowRight':
                    x = x + 1;
                    break;
                case 'ArrowUp':
                    y = y - 1;
                    break;
                case 'ArrowDown':
                    y = y + 1;
                    break;
            }
        });
    
        window.requestAnimationFrame(gameUpdate);
    }
    else {
        alert("Graphics not supported");
    }
}
