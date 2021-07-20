const crt = document.getElementsByClassName('crct');
const btn = document.getElementById('btn');
const recom = document.getElementById('recom');
const dscore = document.getElementById('score');
const cong = document.getElementById('congrat');
const quiz = document.getElementById('quiz');
const unitScore = 100 / crt.length;

function grade() {
  score = 0;
  rec = [];
  for (i = 0; i < crt.length; i++) {
    correct = crt[i].checked;
    if (correct) {
      score += unitScore;
    } else {
      rawRecom = crt[i].getAttribute("data-recom");
      rec.push(rawRecom);
    }
  }

  function unRec(arr) {
    preRec = [];
    for (j of arr) {
      if (preRec.indexOf(j) === -1) {
        preRec.push(j);
      }
    }
    return (preRec);
  }
  t = (5 - minute + "m ") + (60 - sec + "s");
  clearInterval(ti);
  dscore.innerHTML = score + "%";
  //$('#congrat #recom span').wrap('<a href="module1.html"  class="disp"></a>')
  jQuery.each(unRec(rec),
    function(index, item) {
      $("<a href='module1.html' class='disp'></a>").text(item).appendTo("#recom");
    });
  Result = {
    name: quiz.getAttribute("data-name"),
    scores: score,
    time: t,
    freq: 1,
    recom: preRec.length >= 1 ? preRec : " All Perfect",
    link: quiz.getAttribute("data-link")
  }
console.log(Result.link);
  function saveResult(allResult, Result) {
    allResult = localStorage.getItem('allResult');
    console.log(Result.recom);
    allResult = allResult ? JSON.parse(allResult) : [];
    if (allResult[0] == null) {
      allResult.push(Result);
    } else {
      for (i = 0; i < allResult.length; i++) {
        if (allResult[i].name === Result.name) {
          allResult[i].freq += 1;
          Result.freq = allResult[i].freq;
          allResult[i] = Result;
          break;
        } else {
          if (i == allResult.length - 1) {
            allResult.push(Result);
            break;
          } else {
            continue;
          }
        }
      }
    }
    localStorage.setItem('allResult', JSON.stringify(allResult));
  }
  saveResult('allResults', Result);
  cong.style.display = "block";
  quiz.style.display = "none";
  return false;
}
btn.onclick = grade;
window.onload = function() {
  minute = 4;
  sec = 60;
  ti = setInterval(function() {
    document.getElementById("timer").innerText = sec > 9? `${minute} : ${sec}`: `${minute} : 0${sec}`
    //minute > 9? + " : " + sec;
    sec--;
    if (minute == 0 && sec == 00) {
        grade();
      }
    else if(sec == 0) {
      minute--;
      sec = 60;
    }
  }, 1000);
}
$('#congrat #recom').on('click', '.disp', function(e) {
  e.preventDefault();
  console.log('test');
  var url = $(this).attr('href') + '#' + $(this).text();
  $('#module').html('loading...').load(url);
  console. log(url);
 // this.attr("href") = url;
});
