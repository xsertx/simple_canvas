var canvas = document.querySelector('canvas');
const numberOfCircles = 800;
var circles = [numberOfCircles]; 

var colorArray = [
  '#356AFF',
  '#B75BE8',
  '#FF7471',
  '#E88B2A'
];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}
// Creating an object Circle
function Circle(x = 0,y = 0,r = 10,dx = 3,dy = 3)
{
  this.x = x;
  this.y = y;
  
  this.dx = dx;
  this.dy = dy;
  
  this.r = r;
  this.original_r = r;

  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  
  // Method to just draw circle
  this.draw = () => {
    c.beginPath();
    c.arc(this.x,this.y,this.r,0,2*Math.PI,false);
    c.strokeStyle = 'white';
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }
  // Methond to move circle and then draw. Circle is bouncing back from the border
  this.update = () => {
    if (this.x >= window.innerWidth - this.r || this.x <= this.r)
    {
      this.dx = -this.dx;
    }
    
    if (this.y >= window.innerHeight - this.r || this.y <= this.r)
    {
      this.dy = -this.dy;
    }
    
    this.x += this.dx;
    this.y += this.dy;

    const space_dist = 150;

    if (this.original_r*6>=this.r &&mouse.x - this.x < space_dist && mouse.x - this.x > -space_dist && mouse.y - this.y < space_dist && mouse.y - this.y > -space_dist){
      this.r += 1;
    } 
    else{
      if (this.r > 1) this.r -= 1;
    }

    this.draw();
  }
}

// Creating an array of Circles with random directions
function init()
{
  for (let i = 0; i < numberOfCircles; i++)
  {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    
    let radius = Math.random() * 10;
    //let radius = 20;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;

    circles[i] = new Circle(x,y,radius,dx,dy);
  }
}


let a = 1;

// Function to animate circles
function anim()
{
  requestAnimationFrame(anim);
  c.clearRect(0,0,window.innerWidth,window.innerHeight);

  for (let i = 0; i < numberOfCircles; i++)
    {
      circles[i].update();
    }
}
init();
anim();

// Function to check if 2 circles are gonna be intercept or not
function isIntercept(x1,y1,r1,x2,y2,r2)
  {
    m = Math;
    dist = m.sqrt(m.pow(x1 - x2,2) + m.pow(y1-y2,2));
    if (dist < r1+r2)
      return 1;
    else 
      return 0;
  }



window.addEventListener('mousemove', 
function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize',
function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();

});

