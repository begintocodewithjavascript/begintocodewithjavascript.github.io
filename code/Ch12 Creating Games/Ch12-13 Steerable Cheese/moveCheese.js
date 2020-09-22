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
var cheeseX = 0;
var cheeseY = 0;
var cheeseSpeed = 5;
var cheeseXSpeed = 0;
var cheeseYSpeed = 0;

var canvasWidth=800;
var canvasHeight=600;

function gameUpdate(timeStamp) {

    context.fillStyle = "cornflowerblue";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    cheeseX = cheeseX + cheeseXSpeed;
    cheeseY = cheeseY + cheeseYSpeed;
    
    context.drawImage(cheese, cheeseX, cheeseY);
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
            cheeseXSpeed = -cheeseSpeed;
            break;
        case 'ArrowRight':
            cheeseXSpeed = cheeseSpeed;
            break;
        case 'ArrowUp':
            cheeseYSpeed = -cheeseSpeed;
            break;
        case 'ArrowDown':
            cheeseYSpeed = cheeseSpeed;
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch(event.code){
        case 'ArrowLeft':
            cheeseXSpeed=0;
            break;
        case 'ArrowRight':
            cheeseXSpeed=0;
            break;
        case 'ArrowUp':
            cheeseYSpeed=0;
            break;
        case 'ArrowDown':
            cheeseYSpeed=0;
            break;
    }
});

window.addEventListener("blur", (event) => {
    cheeseXSpeed = 0;
    cheeseYSpeed = 0;
});



        window.requestAnimationFrame(gameUpdate);
    }
    else {
        alert("Graphics not supported");
    }
}
