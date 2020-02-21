const interval = 239;
var count = 0;
var bulletCount = 0;
const xRange = 45;
const yRange = 45;
const yConst = 10;
var isPaused = false;
//game images by ids
var game_screen = document.getElementById("bg");
var bullet = document.getElementById("bullet");
var background = document.getElementById('lofi-background');
//pause function vars
var banner = document.getElementById("banner");
var pause_icon = document.getElementById("pause-icon");
var pause_menu = document.getElementById("menu-cover");

var deg = 0;

// var randX;
var randY = 0;
var xPos = 0;
var xAcc = 5;



background.style.position="absolute";
function bg_update(){
    // console.log(x);
    if(xPos > xRange
        || xPos < -xRange){
        xAcc *= -1;
    }
    xPos += xAcc;
    background.style.left = xPos + "px";

    if(count % 3){
        randY = Math.random() * yRange + yConst;
        background.style.top = randY + "px";
    }
}
var enemy = document.getElementById("enemy");
var enemies = {
    x:0,
    y:0,
    width:0,
    height:0,
    maxDelay: 7,
    currentDelay: 0,
    xAcc: -17,
    shrinkDecay: 0.9
};
  // attempting to find where the origional enemy src is set
  // so i can set to reveal
  function init_enemy(){
    enemy.style.position = "absolute";
    //set source
    enemy.src = "images/monster_black.png";
        // set the current delay
    enemies.currentDelay = count + enemies.maxDelay;
    enemies.width = window.innerWidth * 0.65;
    enemies.height = window.innerHeight * 0.80;
    enemies.y = window.innerHeight * Math.random(); //0.25;
    enemies.x = window.innerWidth * Math.random();

}
function moveEnemy(){
    enemies.x += enemies.xAcc;
    //console.log("left@"+enemies.x);
    // enemies.y = enemies.x;
    enemy.style.top = enemies.y + "px";
    enemy.style.left = enemies.x + "px";
}
function shrinkEnemy(){
    //console.log("shrink@"+enemies.width);
    enemies.width *= enemies.shrinkDecay;
    enemy.style.width = enemies.width + "px";
    enemies.height *= enemies.shrinkDecay;
    enemy.style.height = enemies.height + "px";
}
function drawEnemy(){
    moveEnemy();
    shrinkEnemy();
}

setInterval(() => {
    if(isPaused == true){
        // do nothing

    } else {
        count++;
        bg_update();
        if(count < enemies.currentDelay){
            //console.log("enemyX has to @"+enemies.x);
            drawEnemy();
        }else{
            enemy.style.width = "0px";

            init_enemy();
        }
    }
    
    if(bulletCount > 0){
        bulletCount--;
    } else {
        bullet.style.width = "0px";
        background.src = 'images/lofi-background.png';
    }


}, interval);












var quit = document.getElementById("quit-button");
quit.addEventListener("click", () =>{
    console.log("go to homepage");
    window.location ="../games/index.html"
})
pause_icon.addEventListener("click", ()=>{
    console.log("pause icon clicked!!");
    pause_icon.style.display = "none";
    banner.style.display = "none";
    pause_menu.style.display = "block";
    isPaused = true;
});
pause_menu.addEventListener("click", () => {
    pause_icon.style.display = "block";
    banner.style.display = "block";
    pause_menu.style.display = "none";
    isPaused =false;
});














game_screen.addEventListener("click", (e)=>{
    addBullet(e.clientX, e.clientY);
})
function addBullet(x, y){
    bullet.style.position = "absolute";
    bullet.style.width = screen.width * 0.10 +"px";
    bullet.style.height = screen.height * 0.10 + "px";
    y -= screen.height * 0.05;
    x -= screen.width * 0.05;
    bullet.style.top = y + "px";
    bullet.style.left = x + "px";
    bulletCount = 2;
    if(x > (0.2 * window.innerWidth)){
        //console.log(x+"<"+window.innerWidth);
        background.src = 'images/lofi_fireRight.png';
        if(y > (0.6 * window.innerHeight)){
            deg = 60;
        } else {
            deg = 0
        }
    } else {
        //console.log("Y: "+y);
        background.src = 'images/lofi_fireLeft.png';
        if(y > (0.6 * window.innerHeight)) {
            console.log("normal aim")
            deg = 0;
        }else {
            console.log("up aim");
            deg = 20;
        }
    }
    background.setAttribute('style','transform:rotate('+deg+'deg)');
    checkShotHit(x,y);
}
function checkShotHit(x,y){
    //console.log("should check for bullet hit @"+x+", "+y);
    if(enemies.x <= x && enemies.y < y){
        //console.log("inside of image start corner position");
        console.log("hit");
        enemy.src = "images/monster.png";
        enemies.currentDelay = count + 3;
    }
}