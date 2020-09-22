function getImageLoadPromise(url) {
    return new Promise((kept, broken) => {
        var image = new Image();
        image.src = url;
        image.onload = () => kept(image);
        image.onerror = () => broken(new Error('Could not load' + url));
    });
}

async function getImages(imageUrls){

    var promiseList = [];
    for (url of imageUrls){
        promiseList[promiseList.length]=getImageLoadPromise(url);
    }

    var result = await Promise.all(promiseList);
    return result;
}

async function doLoadImage() {

    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {

        context = canvas.getContext('2d');

        var imageNames = ["cheese.png", "tomato.png", "cracker.png", "background.png"];
        var images = await getImages(imageNames);

        var x = 0;
        var y = 0;

        for (let image of images){
            context.drawImage(image,x,y);
            x = x + image.width;
            y = y + image.height;
        }
    }
    else {
        alert("Graphics not supported");
    }
}
