function doKeyboardReader() {

    var resultParagraph = document.getElementById("result");
    count = 0;

    window.addEventListener("keydown", (event) => {
        resultParagraph.innerText="Key Down: " + event.code ;
    });
}
