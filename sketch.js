var balloon, balloon_img1, balloon_img2;
var database;
var height;

function preload() {
  bg = loadImage("Hot Air Ballon-01.png");
  balloon_img1 = loadAnimation("Hot Air Ballon-02.png");
  balloon_img2 = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-02.png", "Hot Air Ballon-02.png", "Hot Air Ballon-03.png",
   "Hot Air Ballon-03.png" , "Hot Air Ballon-03.png", "Hot Air Ballon-04.png", "Hot Air Ballon-04.png", 
   "Hot Air Ballon-04.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1500,700);
   balloon = createSprite(250, 650, 150, 150);
   balloon.addAnimation(balloon_img2);
  // balloon.scale = 0.5;

   var balloonheight = database.ref('balloon / height');
   balloonheight.on("value", readHeight, showError );
   textSize(20);

}

function draw() {
 background(bg); 
 
 if(keyDown(LEFT_ARROW )){
   updateHeight(-10, 0);
   balloon.addAnimation("Hot Air Balloon", balloon_img2)
 }
 else if(keyDown(RIGHT_ARROW )){
  updateHeight(10, 0);
  balloon.addAnimation("Hot Air Balloon", balloon_img2)
}
else if(keyDown(UP_ARROW )){
  updateHeight(0, -10);
  balloon.addAnimation("Hot Air Balloon", balloon_img2)
  balloon.scale = balloon.scale - 0.005;

}
else  if(keyDown(DOWN_ARROW )){
  updateHeight(0, 10);
  balloon.addAnimation("Hot Air Balloon", balloon_img2)
  balloon.scale = balloon.scale + 0.005;
}
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move hot air balloon", 40, 40)
}

function updateHeight(x, y) {
  database.ref('balloon/height').set({
    'x' : height.x + x, 
    'y' : height.y + y
  })

}

function readHeight(data) {
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;

}

function showError() {
  console.log("error in the database")
}