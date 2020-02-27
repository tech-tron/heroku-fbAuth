console.log("touch.js is here!");

document.getElementById("section");

document.addEventListener("touchstart", touchHandler);
document.addEventListener("touchmove", touchHandler);

//The touchHandler function looks like this:
function touchHandler(e) {
    if(e.touches) {
        playerX = e.touches[0].pageX ;
        playerY = e.touches[0].pageY ;
        section.innerHTML = "Touch: "+ " x: " + playerX + ", y: " + playerY;
        e.preventDefault();
        console.log("moveX:"+playerX);
    }
}