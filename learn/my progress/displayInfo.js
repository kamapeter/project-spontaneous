var allResults, arrScore, Account;
allResults = JSON.parse(localStorage.getItem('allResult'));
var Account = JSON.parse(localStorage.getItem("account"));
//console.log(JSON.stringify(Account))
$("#name").text(Account ? `${Account.name}` : "Your");
$(document).ready(function() {
  if (allResults) {
    arrScore = [];
    $.each(allResults, function(index, eachRes) {
      const divCon = document.createElement("div");
      divCon.className = "resultStat";
      const hdr = document.createElement("h4");
      hdr.textContent = `Name of Lesson: ${eachRes.name}`;
      const ulCon = document.createElement("ul");      
      const liS =document.createElement("li");
      liS.textContent = `Score: ${eachRes.scores}%`;
      const liT = document.createElement("li");
      liT.textContent = `Time-Taken: ${eachRes.time}`;
      const liRec = document.createElement("li");
      liRec.innerHTML = `Reccomendations: ${links(eachRes.recom,eachRes.link)}`;
      const liN = document.createElement("li");
      liN.textContent = `No of Times: ${eachRes.freq}`;
      ulCon.appendChild(liS);
      ulCon.appendChild(liT);
      ulCon.appendChild(liRec);
      ulCon.appendChild(liN);
      divCon.appendChild(hdr);
      divCon.appendChild(ulCon);
      $('.mainR').append(divCon);
      arrScore.push(eachRes.scores);
    });
  } else {
    $(".mainR").html("<h1>Please Take Some Quiz</h1>")
  }
  /*	if ($(window).width() >= 600){
  					
  	}else{$(".LearnH").css("fontSize", 25)}*/
  $(".g-stats").ready(
    function() {
      if (Account) {
        ppic = new Image();
        ppic.className += 'profilePic';
        ppic.src = Account.picture ? Account.picture : "../../img/avatar.svg";
        $('.ppicCon').append(ppic);
        pname = `<h4>${Account.name}</h4>`;
        $('.ppicCon').append(pname);
        if(arrScore){
        		$("#high").html(" " + Math.max.apply(null, arrScore) + "%");
        		$("#minS").html(" " + Math.min.apply(null, arrScore).toFixed(0) + "%");
        		var mean = arrScore.reduce(function(pv, cv, i, ar) {
          		var dvd = ar.length;
          		return pv + cv / dvd;
        		}, 0);
        		$("#meanS").html(" " + mean.toFixed(0) + "%");
        }
        var pro = allResults? 
          ((allResults.length / 20) * 100).toFixed(2):
           0;
        $(" #myBar").animate({
          width: pro + "%"
        }, 800).text(pro + '%');
      } else {
        $(".g-stats").html("<h1>Please Create A Spontaneous Account</h1>");
      }
    });
  return false;
});

function links(items, linkBase) {
  var b = document.createElement('span');
  if (!Array.isArray(items)) {
    b.textContent = items;
  } else {
    items.forEach(function(item) {
      var anchor = document.createElement('a');
      Object.assign(anchor, {
        textContent: ` ${item} `,
        href: `.././${linkBase}#${item}`
      });
      //console.log(anchor.href);
      b.appendChild(anchor);
    });
  }
  return b.outerHTML;
}
$(".del").click(
		function () {
		   var ask = confirm("You Are About To Delete Your Spontaneous Account");
		   if (ask){
		   		localStorage.removeItem('account');
		   		location.href = location.href;
		   }
		}
);
