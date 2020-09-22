function getImageLoadPromise(url) {
    return new Promise((kept, broken) => {
        var image = new Image();
        image.src = url;
        image.onload = () => kept(image);
        image.onerror = () => broken(new Error('Could not load' + url));
    });
}

function doLoadImage() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        context = canvas.getContext('2d');
        var imagePromise = getImageLoadPromise("cheese.png");
        imagePromise.then((image) => context.drawImage(image, 0, 0));
        imagePromise.catch((error) => alert(error));
    }
    else {
        alert("Graphics not supported");
    }
}
