var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup= new Group()
  
  ghost = createSprite(200,200,50,50)
  ghost.addImage('ghost',ghostImg)
  ghost.scale=0.3
  

}

function draw() {
  background(200);
  if(gameState==='play'){
    if(keyDown('right')){
      ghost.x=ghost.x+3
    }
    if(keyDown('left')){
      ghost.x=ghost.x-3
    }
    if(keyDown('space')){
      ghost.velocityY=-3
    }
    ghost.velocityY = ghost.velocityY + 0.8

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0

    }
    if(invisibleBlockGroup.isTouching(ghost)){
      ghost.destroy()
      gameState='end'

    }

  }
    doors()

  if(tower.y > 400){
      tower.y = 300
    }
    drawSprites()
    if (gameState === "end"){
       stroke("yellow");
        fill("yellow");
         textSize(30);
          text("Fim de Jogo", 230,250)
         }
}

function doors(){
  if (frameCount % 240 === 0){
  var door=createSprite(200,-50)
  var climber=createSprite(200,10)
  var invisibleBlock=createSprite(200,15)
  
  invisibleBlock.width=climber.width
  invisibleBlock.height=2

  invisibleBlock.velocity=1
  climber.velocity=1
  door.velocityY=1
  
  door.x = Math.round(random(120,400));
    climber.x = door.x
    invisibleBlock.x = door.x

  door.addImage(doorImg)
climber.addImage(climberImg)

ghost.depth = door.depth
ghost.depth+=1

door.lifetime = 800
invisibleBlock.lifetime = 800
climber.lifetime = 800

doorsGroup.add(door)
invisibleBlock.debug=true
invisibleBlockGroup.add(invisibleBlock)
climbersGroup.add(climber)
  }
  
}