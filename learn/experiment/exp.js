var aD= document.querySelector('#sB');
var timer=document.querySelector('.relogio');
var fire=document.getElementById('bob');
var exp=document.querySelector('.experiment');
var anal=document.querySelector('.analysis');
var cell = document.getElementsByClassName("cell");
var calc = document.getElementsByClassName("calc");
var graph = document.querySelector('.graph');
var table = document.querySelector('table');
var min = 0;
var sec = 0*1;
var ms = 0; 
function x(){
				ms += 1;
				sec=parseInt(sec);
				
       if (ms == 100){
       				ms = 0;
       				sec += 1*1; 
       }
       if(sec==60){
       				sec=0;
       				min+=1 ;
       }
       if (sec <10){
       				sec = "0" + sec; 
       }
       timer.innerText="0"+min+": "+ sec+": "+ms;
}
    
aD.addEventListener("webkitAnimationEnd", function() {
				clearInterval(addinc);
				count.innerHTML = inc+1;
}, false); 
document.onclick = function () {
				if(aD.className != "stringnBob") {
								aD.className = "stringnBob";
								addinc = setInterval(x,10);
								document.querySelector("#info").style.display = "none";
								setTimeout(function () {
												exp.style.display = "none";
												anal.style.display = "block";
								},43000)
								var i= 0;
								setTimeout(function (){
												setInterval( function () {
												if(i<cell.length) {
																cell[i].style.visibility= "visible";
																i +=1;
																}
												},500);},43001)
												setTimeout(function (){
													table.style.display = " none";
												  graph.style.display= "block";
									},65001)
									setTimeout(function (){
								   var	j=0;
												setInterval( function () {
												if(j<calc.length) {
																calc[j].style.visibility= "visible";
																j +=1;
																}
												},2500);},75000)
									}		
}		
																																																																			
									
inc=0;
aD.addEventListener("webkitAnimationIteration",function (){
				count = document.querySelector('.count');
				inc += 1;
				count.innerHTML = inc;
				}, false);
