var $ = document.querySelector.bind(document);
var Account = JSON.parse(localStorage.getItem("account"));	
var userN = $("input[type=text]");
var passW = $("input[type=password]");
var btn = $("button[type='button']");

var respond = function () {
		function displayMsg(msg) {
				var msgDiv = document.createElement("div");
				var close = document.createElement("a");		
				var cont = document.body;
				var b4 = $('h2');
				var prexist = cont.querySelector('.alert');
				
				Object.assign(close,{
						innerHTML: "&times;",
						href: "javascript:void(0)",
						className: "close-btn",
						onclick: closeMsg
				});				
				function closeMsg() {
						var parent = cont.querySelector(".alert");
						parent.classList.add("remove");
						setTimeout(function () {
								cont.removeChild(parent)
						},600);
				}
				Object.assign(msgDiv,{
						className: "alert",
						textContent: msg
				});
				msgDiv.appendChild(close);
				//console.log(msg.outerHTML);
				if(prexist)
				   cont.removeChild(prexist);
				cont.insertBefore(msgDiv,b4);
		}
		if(Account) {
				if(passW.value === Account.password && userN.value === Account.username){
						location.assign("../learn/learn.html")
				}else{
						displayMsg("Wrong Password Or Username")
				}
		}else{
				displayMsg("Please Create an Account")
		}
		//console.log(!!$(".close-btn"))
}
btn.addEventListener("click",respond,false);

