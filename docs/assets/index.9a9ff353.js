var v=Object.defineProperty;var u=(n,t,e)=>t in n?v(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var s=(n,t,e)=>(u(n,typeof t!="symbol"?t+"":t,e),e);const y=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const h of i)if(h.type==="childList")for(const r of h.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const h={};return i.integrity&&(h.integrity=i.integrity),i.referrerpolicy&&(h.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?h.credentials="include":i.crossorigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function o(i){if(i.ep)return;i.ep=!0;const h=e(i);fetch(i.href,h)}};y();function k(n,t){const e=document.createElement("canvas");return e.width=n,e.height=t,e}function a(n,t,e,o,i,h){!i||(i==null||i.beginPath(),i==null||i.rect(n,t,e,o),i.fillStyle=h||"#000",i==null||i.fill(),i==null||i.closePath())}function d(n,t,e){return n<t?n=t:n>e&&(n=e),n}class m{constructor(t,e,o,i,h){s(this,"coordinates");s(this,"previousCoordinates",{x:0,y:0});s(this,"width");s(this,"height");s(this,"ctx");s(this,"color","#FF0000");s(this,"direction","LEFT");this.coordinates=t,this.previousCoordinates=t,this.width=e,this.height=o,this.direction=i,this.ctx=h}draw(){a(this.coordinates.x,this.coordinates.y,this.width,this.height,this.ctx,this.color)}move(){if(!this.ctx)return;this.previousCoordinates={...this.coordinates};const t=this.ctx.canvas.width,e=this.ctx.canvas.height;this.direction==="LEFT"?this.coordinates.x-=this.width:this.direction==="RIGHT"?this.coordinates.x+=this.width:this.direction==="UP"?this.coordinates.y-=this.height:this.coordinates.y+=this.height,this.coordinates.x==t?this.coordinates.x=0:this.coordinates.x<0?this.coordinates.x=t-this.width:this.coordinates.y==e?this.coordinates.y=0:this.coordinates.y<0&&(this.coordinates.y=e-this.height)}setDirection(t){this.direction=t}getCoordinates(){return this.coordinates}getPreviousCoordinates(){return this.previousCoordinates}}class c{constructor(t,e,o,i){s(this,"coordinates");s(this,"previousCoordinates",{x:0,y:0});s(this,"width");s(this,"height");s(this,"ctx");s(this,"color","#000");this.coordinates=t,this.width=e,this.height=o,this.ctx=i}draw(){a(this.coordinates.x,this.coordinates.y,this.width,this.height,this.ctx,this.color)}setCoordinates(t){this.previousCoordinates={...this.coordinates},this.coordinates=t}getCoordinates(){return this.coordinates}getPreviousCoordinates(){return this.previousCoordinates}}class l{constructor(t,e,o,i,h,r){s(this,"snake",new Array);s(this,"unitWidth");s(this,"unitHeight");s(this,"ctx");s(this,"food");const f=new m(t,e,o,i,h),g=new c(t,e,o,h);this.snake.push(f,g),this.unitWidth=e,this.unitHeight=o,this.food=r,this.ctx=h}checkForEatEvent(){var o;const t=this.snake[0].getCoordinates(),e=this.food.getCoordinates();if(t.x===e.x&&t.y===e.y){const i=new CustomEvent("eat");(o=this.ctx)==null||o.canvas.dispatchEvent(i)}}checkForCollision(){var e;const t=this.snake[0].getCoordinates();for(let o=1;o<this.snake.length;o++){let i=this.snake[o].getCoordinates();if(t.x==i.x&&t.y==i.y){const h=new CustomEvent("collision");(e=this.ctx)==null||e.canvas.dispatchEvent(h)}}}draw(){this.snake.forEach(t=>{t.draw()})}move(){this.snake[0].move();for(let e=1;e<this.snake.length;e++){let o=this.snake[e],i=this.snake[e-1];o.setCoordinates(i.getPreviousCoordinates())}this.checkForEatEvent(),this.checkForCollision()}increaseLength(){if(this.snake[this.snake.length-1].getPreviousCoordinates()){const t=new c(this.snake[this.snake.length-1].getPreviousCoordinates(),this.unitWidth,this.unitHeight,this.ctx);this.snake.push(t)}}setDirection(t){this.snake[0].setDirection(t)}setFood(t){this.food=t}}class w{constructor(t,e){s(this,"color");s(this,"coordinates");s(this,"width");s(this,"height");s(this,"ctx");this.color="#e69f43",this.coordinates=t,this.width=20,this.height=20,this.ctx=e}draw(){a(this.coordinates.x,this.coordinates.y,this.width,this.height,this.ctx,this.color)}getCoordinates(){return this.coordinates}}class p{constructor(){s(this,"ctx");s(this,"canvas");s(this,"canvasWidth");s(this,"canvasHeight");s(this,"bodyPartWidth");s(this,"bodyPartHeight");s(this,"intervalId");s(this,"direction");s(this,"snake");s(this,"food");s(this,"score");s(this,"highScore");s(this,"scoreElement");s(this,"highScoreElement");this.canvasWidth=500,this.canvasHeight=500,this.bodyPartWidth=20,this.bodyPartHeight=20,this.canvas=k(this.canvasWidth,this.canvasHeight),this.ctx=this.canvas.getContext("2d"),this.direction="LEFT",this.score=0,this.highScore=0,this.scoreElement=document.getElementById("score"),this.highScoreElement=document.getElementById("highScore"),this.food=this.createFood(),this.snake=new l({x:this.bodyPartWidth*8,y:this.bodyPartHeight*8},this.bodyPartWidth,this.bodyPartHeight,this.direction,this.ctx,this.food),this.addCanvasToDom(),this.addMovementListeners(),this.initDraw(),this.initMovement(),this.handleEatEvent(),this.handleCollisionEvent(),this.renderScore()}renderScore(){this.scoreElement.innerText=`${this.score}`,this.highScoreElement.innerText=`${this.highScore}`}addCanvasToDom(){var t;(t=document.querySelector("#app"))==null||t.appendChild(this.canvas)}addMovementListeners(){document.addEventListener("keydown",t=>{t.key==="ArrowUp"&&this.direction!="DOWN"?this.direction="UP":t.key==="ArrowDown"&&this.direction!="UP"?this.direction="DOWN":t.key==="ArrowLeft"&&this.direction!="RIGHT"?this.direction="LEFT":t.key==="ArrowRight"&&this.direction!="LEFT"&&(this.direction="RIGHT")})}initDraw(){this.draw()}draw(){var t;(t=this.ctx)==null||t.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.snake.draw(),this.food.draw(),this.snake.setDirection(this.direction),requestAnimationFrame(()=>{this.draw()})}initMovement(){this.intervalId=setInterval(()=>{this.move()},200)}move(){this.snake.move()}createFood(){let t=Math.floor(Math.random()*(this.canvasWidth/this.bodyPartWidth)+1)*this.bodyPartWidth;t=d(t,0,480);let e=Math.floor(Math.random()*(this.canvasHeight/this.bodyPartHeight)+1)*this.bodyPartHeight;return e=d(e,0,480),new w({x:t,y:e},this.ctx)}handleEatEvent(){this.canvas.addEventListener("eat",()=>{this.score++,this.food=this.createFood(),this.snake.setFood(this.food),this.snake.increaseLength(),this.renderScore()})}handleCollisionEvent(){this.canvas.addEventListener("collision",()=>{clearInterval(this.intervalId),this.handleGameOver()})}handleGameOver(){alert("You lost, try again...."),this.score>this.highScore&&(this.highScore=this.score),this.score=0,this.renderScore(),this.food=this.createFood(),this.snake=new l({x:this.bodyPartWidth*8,y:this.bodyPartHeight*8},this.bodyPartWidth,this.bodyPartHeight,this.direction,this.ctx,this.food),this.initMovement()}}new p;