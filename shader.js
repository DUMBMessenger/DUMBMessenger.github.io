// background particles
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
const particles = [];
for(let i=0;i<100;i++){
  particles.push({x:Math.random()*w, y:Math.random()*h, r:Math.random()*2+1, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3});
}
function animate(){
  ctx.fillStyle='#0f0f12';
  ctx.fillRect(0,0,w,h);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>w)p.vx*=-1;
    if(p.y<0||p.y>h)p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(183,131,255,0.6)';
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize',()=>{w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight;});
