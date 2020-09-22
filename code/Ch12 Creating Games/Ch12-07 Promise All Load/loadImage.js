function getImageLoadPromise(url) {
    return new Promise((kept, broken) => {
        var image = new Image();
        image.src = url;
        image.onload = () => kept(image);
        image.onerror = () => broken(new Error('Could not load' + url));
    });
}

function getImages(imageUrls){

    var promiseList = [];
    for (url of imageUrls){
        promiseList[promiseList.length]=getImageLoadPromise(url);
    }

    Promise.all(promiseList).then( (images)=> {
        var x = 0;
        var y = 0;
        for(image of images){
            context.drawImage(image,x,y);
            x = x + image.width;
            y = y + image.height;
        }
    })
}

function doLoadImage() {

    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {

        context = canvas.getContext('2d');

        var imageNames = ["cheese.png", "tomato.png", "cracker.png", "background.png"];
        getImages(imageNames);
    }
    else {
        alert("Graphics not supported");
    }
}
