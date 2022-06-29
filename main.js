img = "";
Status = "";
objects = [];
sing = "";
function setup() {
  canvas =  createCanvas(380,380);
  canvas.center();
 video = createCapture(380,380);
video.size(380,380);
video.hide();
  }
  function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
  document.getElementById("status").innerHTML = "object : is detecting";
  }
function modelLoaded() {
  console.log("model Loaded!");
 Status = true;
 
}
function preload() {
 sing = loadSound("1.mp3");  
}
function draw() {
    image(video , 0 , 0 , 380 , 380);
   
if(Status != "")
{
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video , gotPoses);
  for (let i = 0; i < objects.length; i++) {
    sing.stop();
    document.getElementById("status").innerHTML = "object : detected";
fill(r,g,b);
percent = floor(objects[i].confidence * 100);
text(objects[i].label + "" + percent + "%" , objects[i].x+15 , objects[i].y+15);
  noFill();
stroke(r.g.b);
rect(objects[i].x , objects[i].y , objects[i].width  , objects[i].height);
  }
}
else{
 sing.play();   
}
}
function gotPoses(error , results)
{
  if(error){
    console.log(error);
  }
  console.log(results);
  objects = results;
}