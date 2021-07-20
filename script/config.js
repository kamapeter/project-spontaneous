var $ = document.querySelector.bind(document);
var useCustKey = $("#switch");
var useDark = $("#switch2");
var keyType = $("#keyType");
var deci = $("#setDeci");
var g = $("#setG");
var saver = $("#save");
var userPref = {cons:{g:null,deci:null}};
window.onload = function () {
    var user = localStorage.getItem("userPref") ?
       JSON.parse(localStorage.getItem("userPref")) : false;
		if(user) {
				keyType.value = user.keyType? user.keyType : "";
				if(user.dark) useDark.click();
				if(user.useCust) useCustKey.click();
		   if(!!user.cons.deci) deci.value = user.cons.deci;
		   if(user.cons.g) g.value = user.cons.g;
		   if(user.keyType) keyType.value = user.keyType;
		}
};
off = () => {if(useDark.checked) {
		document.body.classList.add("dark");
		console.log("work");
		userPref.dark = true;
 }else{
		document.body.classList.remove("dark");
		userPref.dark = false;
 }
}
setKey = (e) =>{
	  userPref.keyType = e.target.value;
}
setDeci = (e) => userPref.cons.deci = e.target.value;
setG = (e) => userPref.cons.g = e.target.value;
toggleCustKey = (e) =>{
   userPref.useCust = e.target.checked? true : false;
   $("#fg").className = e.target.checked?
   "pref" : "pref inactive";
   keyType.disabled = e.target.checked? false : true;
}
useCustKey
.addEventListener("change",toggleCustKey,false);
useDark.addEventListener("change",off,false);
deci.addEventListener("change",setDeci,false);
g.addEventListener("change",setG,false);
keyType.addEventListener("change",setKey,false);
saver.addEventListener("click", function () {
	  Object.assign(userPref,{
	  		keyType : keyType.value,
	  		//dark : useDark.checked ? true : false,
	  		cons : {
	  				g : g.value,
	  				deci : deci.value
	  		}
	  });
		localStorage
		.setItem("userPref",JSON.stringify(userPref));
});