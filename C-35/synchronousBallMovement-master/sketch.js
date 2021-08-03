var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,40,40);
  hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = database.ref('ball/position'); //ref() is used to refer to the location of the database value we care about.
  hypnoticBallPosition.on("value", readPosition, showError);  //on() creates a listener which keeps listening to the changes in the database.

//Everytime a change in the database values of position (reference) happens, the readPosition function is called.
// If there is any error in reading the values in the database, the showError function is called.

}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){

  //.set() is used to set the value in the database.
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
