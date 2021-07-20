var $ = document.querySelector.bind(document);
const units = {    
  DISTANCE: "Metre(m)",    TIME: "Seconds(s)",    MASS: "Kilogram(Kg)",   FORCE: "Newton(N)",  CURRENT: "Amperes(A)",       VELOCITY: "ms",   CURRENT: "Amperes(A)",       VELOCITY: "m/s",   ACCELERATION: " m/s²",             																																																																																																								  ENERGY: "Joules(J)", 				MOMENTUM: ["Ns ", " Kgm/s¹"],				 IMPULSE: "Ns", 				ANGULAR_VELOCITY:["radians per second ", " (rad/s)"], ANGULAR_ACCELERATION: "rad/s²",    TEMPERATURE: ["Kelvin(K) ", " Celcius(°c) ", " Fahrenheit(°f)"],AMOUNT_OF_SUBSTANCE:"mole(mol)", LUMINOUS_INTENSITY: "Candela(cd)", POWER: ["Watts(W)", "HorsePower(Hp)"], FREQUENCY: "Hertz(Hz)", CHARGE: "Coulomb(C)", WORK: "Joules(J)", RESISTANCE: "Ohm", POTENTIAL_DIFFERENCE: "Volt(V)", INDUCTANCE: " Henry(H)", CAPACITANCE: "Farad(F)", MAGNETIC_FLUX: "Weber(W)", MAGNETIC_FIELD: " Tesla(T)", DENSITY: "Kg/m³", PRESSURE: ["N/m² ", "Pascal(pa)", " mmHg"], VOLUME: "m³", AREA: " m²", MOMENT: "Nm", TORQUE: "Nm"
}
var formulae = {  DISTANCE: ["  S = vt", "S = r×theta", "S = ut + ½at²", " S = (u + v)t/2", "T = √(2H/g)"], TIME: [" t= s/v", "t= (v-u)/a"], MASS:[" m = F/a", "m = &rho;v"], FORCE:[" F = ma", "F = PA", " F = P/V", "F = GMm/r²"],DENSITY: ["d = m/v", "d = P/gh"], HEIGHT: [" H = U²/2g","H = ½gt²", ], TENSION:"T = 2π√(l/g)",}
function suggest(obj,con) {
		for (var key of Object.keys(obj)){
				opt =document.createElement("option");
				opt.value = key.replace("_"," ");
				$(con).appendChild(opt);
		}
}
suggest(units,"#units");
suggest(formulae,"#formulae");
var findUBut = $("#findU");
var findFBut = $("#findF");
var clearBut = $(".clear");
var clearBut2 = $("#findFormulae .clear");
findUBut.addEventListener("click",getR,false);
findFBut.addEventListener("click",getR,false);
clearBut.addEventListener("click",clear,false);
clearBut2.addEventListener("click",clear,false);
function getR(e) {
		var query = e.target.parentNode.field.value
		.toUpperCase().replace(" ","_");
		var result;
		var con = e.target.parentNode.parentNode.querySelector(".resultCon");
		if (e.target.getAttribute("id") === "findU")
		  result = units[query];
		else
		  result = formulae[query];		 
		//console.log(result);
		displayUnits(result,con);
}
function displayUnits(results,con) {
		/*var con = $("#resultCon");*/
		con.innerHTML = "";
		function show(res) {
				var li = document.createElement("li");
				Object.assign(li,{
						innerHTML : res,
						className : "searchR"
				})
				con.appendChild(li);
				li.classList.add("fade");
		}
   if(results) {
   		if(Array.isArray(results)) {
   				results.forEach(
   						function (res) {
   								show(res)
   						}
   				);
   		}else{
   				show(results)
   		}
   }else{
   		show(" Enter A valid quantity Name")
   }
}
function clear(e) {
		let form = e.target.parentNode;
		form.querySelector("input[type = search]").value = "";
		var disp = form.parentNode.querySelector(".resultCon").childNodes;
		for(i = 0; i < disp.length; i++){
				disp[i].classList.add("fadeOut");
		}
		 $(".resultCon").childNodes ="";
}

$(".topBar").addEventListener("click",function (e) {
		e.preventDefault();
		if(e.target.getAttribute("href")){
		$(".blueH").classList.remove("blueH");
		e.target.parentNode.classList.add("blueH");
		$(".slideIn").classList.add("slideOut");
		setTimeout(function () {
				$(".slideIn").classList.remove("slideIn");
				$(e.target.hash).classList.remove("slideOut");
				$(e.target.hash).classList.add("slideIn");
		},400)
		}
},false)
window.onload = function () {
		var where = location.hash;
		window.scrollTo(0,0);
		if (where)
				$(where).classList.add("slideIn");
	  else
	  		$("#findUnits").classList.add("slideIn");
		
}
