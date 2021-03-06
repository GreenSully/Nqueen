

var n=Math.floor(prompt("Enter number of queen"));

var animate = /*window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||*/
function(callback) { window.setTimeout(callback, 1000/(n*n)) };

var Qimage=new Image();
Qimage.src="queen.png";

var canvas=document.createElement ("canvas");
var ctx;
ctx=canvas.getContext("2d");

var contatore=0;
var dim=25;

var width=dim*n;
var height=dim*n;
canvas.width=width;
canvas.height=height;

var griglia=init();
var finito=false;


var step = function(){
	ctx.fillStyle="#00ff00";
	ctx.fillRect(0,0,width,height);
drawGrid(griglia);
	if(!finito){
		for(var i=0;i<n*n*n;i++){
			nextStep(griglia);
		}
	}
	else{
	alert("numero iterazioni "+contatore);
		return;
	}
	
	
animate(step);
};

function init(){
	var vet=[];
	for(var i=0;i<n;i++){
		vet[i]=0;
	}
	return vet;
}

function nextStep(){
	finito=true;
	for(var i=0;i<n;i++){
		if(verifica(i)){
			finito=false;
			griglia[i]++;
			contatore++;
		//drawGrid(griglia);
		i--;
			continue;
		}
		if(griglia[i]>=n){
			finito=false;
			griglia[i]=0;
			griglia[i-1]++;
			return;
		}
	}
}

function verifica(index){
	for(var i=index-1;i>=0;i--){
		if(griglia[index]==griglia[i]){
			return true;
		}
	}
	
	for(var i=index-1;i>=0;i--){
		if(griglia[index]==griglia[i]+(index-i) || griglia[index]==griglia[i]-(index-i)){
			return true;
		}
	}
	
	return false;
}

function drawGrid(vet){
	ctx.fillStyle="#ffffff";
	for(var i=0;i<n;i++){
		for(var j=0;j<n;j++){
			 if(vet[i]==j){
				ctx.drawImage(Qimage,i*dim+1,j*dim+1,dim-2,dim-2);
			}
			else{
				ctx.fillRect(i*dim+1,j*dim+1,dim-2,dim-2);
			}
		}
	}
}


window.onload=function(){
document.body.appendChild(canvas);
animate(step);
};
