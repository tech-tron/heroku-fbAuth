var menu = document.getElementById("menuModal");

// Get the button that opens the modal
var menuBtn = document.getElementById("menuIcon");



var quitBtn = document.getElementById("quitBtn");
quitBtn.onclick = function () {
    console.log("forfiet button clicked");
    location.replace('index-game.html');
}
var resumeBtn = document.getElementById("resumeBtn");
resumeBtn.onclick = function () {
    menu.style.display = "none";
    menuBtn.style.display = "inline";
}

// modal
// Get the modal

// Get the <span> element that closes the modal

// When the user clicks the button, open the modal 
menuBtn.addEventListener("click", (e) => {
    menu.style.display = "block";
    menuBtn.style.display = "none"
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", () => {
    if (event.target == menu) {
        menu.style.display = "none";
        menuBtn.style.display = "inline"
    }
});