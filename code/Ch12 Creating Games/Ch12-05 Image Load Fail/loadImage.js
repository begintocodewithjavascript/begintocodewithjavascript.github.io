function doLoadImage() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        context = canvas.getContext('2d');
        var image = new Image();
        image.src = "cheesey.png";
        image.onload = () => context.drawImage(image, 0, 0);
        image.onerror = () => alert("image not loaded");
    }
    else {
        alert("Graphics not supported");
    }
}
