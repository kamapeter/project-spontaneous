var base64String;
var file = document.querySelector('.file');
var keys = document.querySelectorAll('input');
var submit = document.querySelector("button[type='button']");
file.onchange = function(evt) {
  var label = file.nextElementSibling;
  //console.log("affected")
  var labelVal = label.innerHTML;
  var fileName = evt.target.value.split("\\").pop();
  label.innerHTML = fileName ? fileName : labelVal;
  convertToDataUrl();
}

function convertToDataUrl() {
  var pic = document.getElementById("fileId")["files"];
  var reader = new FileReader();
  reader.onload = function() {
    base64String = reader.result;
    //console.log(!!base64String);
  }
  reader.readAsDataURL(pic[0]);
}
//Validation scripts  next
const inp_field = {
  name: /^[a-zA-Z]{2,}/,
  username: /^[a-z\d]{5,12}$/i,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  password: /^[#\w@_-]{8,20}$/,
  telephone: /^\d{11}$/
}
const validate = function(field, regex) {
  field.className = regex.test(field.value) ? "pd valid" : "pd invalid";
}
document.addEventListener('keyup', function(e) {
  if (e.target.classList.contains('pd'))
    validate(e.target, inp_field[e.target.attributes.name.value])
});
//profile
submit.onclick = function(e) {
  if (document.querySelectorAll(".valid").length != 6){
    e.preventDefault();
    alert("Make Sure You Enter All Fields Correctly");
  }
  else if (localStorage.getItem("account"))
    alert("You already created an account");
  else {
    Account = {
      name: `${keys[0].value} ${keys[1].value}`,
      username: keys[3].value,
      email: keys[4].value,
      password: keys[5].value,
      picture: base64String
    }
    localStorage.setItem("account", JSON.stringify(Account));
    location.assign("../learn/learn.html");
  }
}
