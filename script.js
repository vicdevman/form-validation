const email=document.getElementById("email")
const password=document.getElementById("password")
const emailText=document.getElementById("emailText")
const passText=document.getElementById("passText")
const strength=document.getElementById("strength")
const login=document.getElementById("login")
const togglePassword = document.createElement("span");
togglePassword.textContent = "👁";
togglePassword.style.cursor = "pointer";
const passwordGroup = document.querySelector(".group:nth-child(2)");
passwordGroup.appendChild(togglePassword);

togglePassword.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    togglePassword.textContent = "🙈";
  } else {
    password.type = "password";
    togglePassword.textContent = "👁";
  }
});

email.addEventListener("input",()=>{

const check=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(email.value===""){
emailText.textContent=""
return
}

if(check.test(email.value)){
emailText.textContent="Looks good"
emailText.className="note ok"
}else{
emailText.textContent="That email seems off"
emailText.className="note bad"
}

})

password.addEventListener("input",()=>{

let score=0
const v=password.value

const requirements = {
  length: v.length > 7,
  uppercase: /[A-Z]/.test(v),
  number: /[0-9]/.test(v),
  symbol: /[^A-Za-z0-9]/.test(v),
};

score = Object.values(requirements).filter(Boolean).length;

const size=[0,25,50,75,100]
strength.style.width=size[score]+"%"

if(score<=1){
strength.style.background="#ef4444"
passText.textContent="Too weak"
passText.className="note bad"
}

if(score===2){
strength.style.background="#f59e0b"
passText.textContent="Getting stronger"
passText.className="note"
}

if(score===3){
strength.style.background="#3b82f6"
passText.textContent="Strong password"
passText.className="note ok"
}

if(score===4){
strength.style.background="#22c55e"
passText.textContent="Very strong"
passText.className="note ok"
}

const feedback = document.getElementById("feedback");
feedback.innerHTML = (`
  <ul>
    <li style="color: ${requirements.length ? '#16a34a' : '#dc2626'}">At least 8 characters</li>
    <li style="color: ${requirements.uppercase ? '#16a34a' : '#dc2626'}">At least one uppercase letter</li>
    <li style="color: ${requirements.number ? '#16a34a' : '#dc2626'}">At least one number</li>
    <li style="color: ${requirements.symbol ? '#16a34a' : '#dc2626'}">At least one symbol</li>
  </ul>
`);

})

login.addEventListener("click",()=>{

if(email.value===""||password.value===""){
alert("Please fill in your login details")
return
}

login.classList.add("busy")
login.textContent="Signing in..."

setTimeout(()=>{
login.classList.remove("busy")
login.textContent="Sign in"
alert("Login request sent")
},1200)

})
