const passwordBox = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lenVal = document.getElementById("len-val");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const historyList = document.getElementById("history");
const toast = document.getElementById("toast");

lenVal.textContent = lengthSlider.value;
lengthSlider.oninput = () => lenVal.textContent = lengthSlider.value;

const U = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const L = "abcdefghijklmnopqrstuvwxyz";
const N = "0123456789";
const S = "@#$^&_+~|{}[]></-=";
const similar = /[0Ool1I]/g;

let history = [];

function createPassword(){
  let chars = "";
  if(upper.checked) chars += U;
  if(lower.checked) chars += L;
  if(number.checked) chars += N;
  if(symbol.checked) chars += S;

  if(chars === ""){
    alert("Select at least one option");
    return;
  }

  let pass="";
  for(let i=0;i<lengthSlider.value;i++){
    pass += chars[Math.floor(Math.random()*chars.length)];
  }

  if(exclude.checked){
    pass = pass.replace(similar,"");
  }

  passwordBox.value = pass;
  updateStrength(pass);
  addHistory(pass);
}

function updateStrength(p){
  let score = 0;
  if(/[A-Z]/.test(p)) score++;
  if(/[a-z]/.test(p)) score++;
  if(/[0-9]/.test(p)) score++;
  if(/[^A-Za-z0-9]/.test(p)) score++;

  if(score<=1){
    strengthBar.style.width="30%";
    strengthBar.style.background="red";
    strengthText.textContent="Weak";
  }else if(score<=3){
    strengthBar.style.width="65%";
    strengthBar.style.background="orange";
    strengthText.textContent="Medium";
  }else{
    strengthBar.style.width="100%";
    strengthBar.style.background="lime";
    strengthText.textContent="Strong";
  }
}

function copyPassword(){
  navigator.clipboard.writeText(passwordBox.value);
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1500);
}

function addHistory(p){
  history.unshift(p);
  if(history.length>5) history.pop();
  historyList.innerHTML="";
  history.forEach(h=>{
    const li=document.createElement("li");
    li.textContent=h;
    li.onclick=()=>navigator.clipboard.writeText(h);
    historyList.appendChild(li);
  });
}
