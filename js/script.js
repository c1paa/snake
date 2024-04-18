let canvas = document.querySelector('.canvas');
let draw = canvas.getContext('2d');

let pixelSize = 10;

let len = 10;

function Body(x, y, rot) {
   this.x = x;
   this.y = y;
   this.rot = rot;
}

let tail = [];

let gameon = true;

let rotationBody = [];
let rotation = [];
let mainRotation = 1;

let applex;
let appley;
let apple = false;

let score = 0;

let newBody = null;

function drawPixel(x, y, color = "black", scolor = "black") {
   draw.beginPath();
   draw.fillStyle = color;
   draw.strokeStyle = scolor;
   // draw.rect(x*pixelSize, y*pixelSize, (x+1)*pixelSize, (y+1)*pixelSize);
   draw.moveTo(x*pixelSize, y*pixelSize);
   draw.lineTo((x+1)*pixelSize, y*pixelSize);
   draw.lineTo((x+1)*pixelSize, (y+1)*pixelSize);
   draw.lineTo(x*pixelSize, (y+1)*pixelSize);
   draw.lineTo(x*pixelSize, y*pixelSize);
   draw.fill();
   draw.stroke();
   draw.closePath();
}
// for (let i = 0; i < 50; i++){
//    setTimeout(function() {
//       drawPixel(i, i);
//       drawPixel(49-i, i);
//    }, i*100);
// }
// drawPixel(10, 10);

window.onload = function() {
   for (let i = len; i >= 0; i--) tail.push(new Body(i, 0, 1));
   Game();
}

function Game(delay = 0) {
   Clear();
   if (!apple) CreateApple();
   DrawApple();
   Spawning();
   draw.font = "20px Courier"
   draw.fillText(score, 50, 50);
   Crowl();
   if (newBody != null) {
      len++;
      tail[len-1] = newBody;
      console.log(newBody);
      console.log(tail);
      newBody = null;
      
   }
   if (CheckApple()){
      score++;
      apple = false;
      newBody = new Body(tail[len-1].x, tail[len-1].y, tail[len-1].rot);
   }
   Rotate();
   // console.log(tail[len-1]);
   gameon = CheckCollition();
   if (gameon) setTimeout(Game, delay+100);
   else {
      draw.font = "60px Courier"
      draw.fillText("Game over!", canvas.width/6 , canvas.height/2);
   }
}

window.addEventListener('keypress', function(e) {
   // console.log(mainRotation);
   if (e.key == 's' && mainRotation != 2 && mainRotation != 0){
       rotation.push(2);
       rotationBody.push(0);
       mainRotation = 2;
   }
   else if (e.key == 'w' && mainRotation != 0 && mainRotation != 2) {
      rotation.push(0);
      rotationBody.push(0);
      mainRotation = 0;
   }
   else if (e.key == 'a' && mainRotation != 3 && mainRotation != 1) {
      rotation.push(3);
      rotationBody.push(0);
      mainRotation = 3;
   }
   else if (e.key == 'd' && mainRotation != 1 && mainRotation != 3) {
      rotation.push(1);
      rotationBody.push(0);
      mainRotation = 1;
   }
});

function Spawning() {
   for (let i = 0; i < len; i++) {
      drawPixel(tail[i].x, tail[i].y, "#36870B", "#36870B");
   }
}

function Crowl() {
   for (let i = 0; i < len; i++) {
      if (tail[i].rot == 0) tail[i].y--;
      else if (tail[i].rot == 1) tail[i].x++;
      else if (tail[i].rot == 2) tail[i].y++;
      else if (tail[i].rot == 3) tail[i].x--; 
   }

}

function CheckCollition() {
   for (let i  = 0; i < len; i++) {
      if (tail[i].x > canvas.width/pixelSize-1 || tail[i].x < 0 || 
      tail[i].y > canvas.height/pixelSize-1 || tail[i].y < 0) return false;
   }
   return true; 
}

function Clear() {
   draw.fillStyle = "#68D130";
   draw.rect(0, 0, canvas.width, canvas.height);
   draw.fill();
   draw.fillStyle = "black";
}

function Rotate() {
   // console.log(rotationBody, rotation);
   if (rotation.length == 0 || rotationBody.length == 0) return;
   for (let j = 0; j < rotation.length; j++) {
      tail[rotationBody[j]].rot = rotation[j];
      rotationBody[j]++;
      if (rotationBody[j] >= len) {
         rotation.splice(j, 1);
         rotationBody.splice(j, 1);
         j--;
      } 
   }

}

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function CreateApple() {
   applex = randomFromTo(0, 49);
   appley = randomFromTo(0, 49);
   apple = true;
}

function DrawApple() {
   drawPixel(applex, appley, "red", "red");
}

function CheckApple() {
   if (tail[0].x == applex && tail[0].y == appley) return true;
   return false;
}