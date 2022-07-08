class Earth{
    constructor(){
        this.x=0
        this.y=0
        this.path="picture/earth.jpg"
        this.width=100
        this.height=100
        this.speed = 10
    }
}
class Enemy{
    constructor(){
        this.x=400
    this.y=0
    this.path="picture/enemy.webp"
    this.width=100
    this.height=100
    this.speed = 7
    }
}

var sun= new Image()

sun.onload= function(){
    context.drawImage(sun, 0, 0, 900, 500)
}
sun.src= ("picture/Sun.jfif")

var earthObject= new Earth()

var canvas= document.getElementById("GameArea")
var context= canvas.getContext("2d")
var earth= new Image()
earth.onload= function(){
    context.drawImage(earth, earthObject.x, 0, earthObject.width, earthObject.height)
}
earth.src=("picture/earth.jpg")


var enemyObject = new Enemy()

var enemy = new Image()
enemy.onload= function(){
    context.drawImage(enemy, enemyObject.x, enemyObject.y, enemyObject.width, enemyObject.height)
}
enemy.src= enemyObject.path

function coordInBetween(axis, objectA, objectB) {
    if (axis == 'x') {
        if ((objectB.x - objectA.x) <= 0 && (objectA.x - (objectB.x + objectB.width)) <= 0) {
            return true
        } else {
            return false
        }
    }
    else {
        if ((objectB.y - objectA.y) <= 0 && (objectA.y - (objectB.y + objectB.height) <= 0)) {
            return true
        } else {
            return false
        }
    }
}

function areColliding(objectA, objectB){
    if (coordInBetween('x', objectA, objectB)) {
        if (coordInBetween('y', objectA, objectB)) {
            return true
        } else {
            return false
        }
    }
    else if (coordInBetween('x', objectB, objectA)) {
        if (coordInBetween('y', objectB, objectA)) {
            return true
        } else return false;
    }
    else return false;
    
}

function chase(){
    //position earth - position enemy
    var xDisplacement = earthObject.x - enemyObject.x
    var yDisplacment = earthObject.y - enemyObject.y
    var magnitude = ((xDisplacement ** 2) + (yDisplacment ** 2) ) ** 0.5
    enemyObject.x = enemyObject.x + Math.floor((xDisplacement / magnitude) * enemyObject.speed)
    enemyObject.y = enemyObject.y + Math.floor((yDisplacment / magnitude) * enemyObject.speed)
}       

function gameOver(){
        alert("Game Over and Retry")
        earthObject.x = 0
        earthObject.y = 0
        enemyObject.x = 400
        enemyObject.y = 0
    
}

function checkGameOver(){
    if(areColliding(earthObject, enemyObject)) {
        gameOver()
    }
}

const keys= {leftArrow: false, rightArrow: false, upArrow: false, downArrow: false}
function moveleft(){ console.log("Testing")
    earthObject.x= earthObject.x - earthObject.speed
}

function moveright(){ 
    earthObject.x= earthObject.x + earthObject.speed
  
}
function moveup(){ 
    earthObject.y= earthObject.y - earthObject.speed
    
}
function movedown(){ 
    earthObject.y= earthObject.y + earthObject.speed
  
}
function handleKeyPress(events){
    if (events.keyCode == 39){ 
        moveright()                //key code for right arrow
    }
    if (events.keyCode == 37){
            moveleft()              //key code to move left
    }               
    if (events.keyCode == 40){
            movedown()                  //key code to move down
    }
    if (events.keyCode == 38){
             moveup()                  //key code to move up
    }  
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(sun, 0, 0, 900, 500)
    context.drawImage(earth, earthObject.x, earthObject.y, earthObject.width, earthObject.height)
    context.drawImage(enemy, enemyObject.x, enemyObject.y, enemyObject.width, enemyObject.height)
    

}
setInterval(chase, 200);
setInterval(checkGameOver, 50)
addEventListener("keydown", handleKeyPress)


