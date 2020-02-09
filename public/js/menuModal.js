$(document).ready(function () {
    var quitBtn = document.getElementById("quitBtn");
    quitBtn.onclick = function(){
        console.log("forfiet button clicked");
        location.replace('index.html');
    }
    var resumeBtn = document.getElementById("resumeBtn");
    resumeBtn.onclick = function(){
        menu.style.display = "none";
        menuBtn.style.display = "inline";
    }

    // modal
    // Get the modal
    var menu = document.getElementById("menuModal");

    // Get the button that opens the modal
    var menuBtn = document.getElementById("menuBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    menuBtn.onclick = function () {
        menu.style.display = "block";
        menuBtn.style.display = "none"
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        menu.style.display = "none";
        menuBtn.style.display = "inline";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == menu) {
            menu.style.display = "none";
            menuBtn.style.display = "inline"
        }
    }
});