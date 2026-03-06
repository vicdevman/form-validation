const email = document.getElementById("email");
const password = document.getElementById("password");
const emailText = document.getElementById("emailText");
const passText = document.getElementById("passText");
const strength = document.getElementById("strength");
const login = document.getElementById("login");
const togglePassword = document.getElementById("togglePassword");
const feedback = document.getElementById("feedback");

const EYE_ICON = `<svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
const EYE_OFF_ICON = `<svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

togglePassword.addEventListener("click", () => {
  const isPassword = password.type === "password";
  password.type = isPassword ? "text" : "password";
  togglePassword.innerHTML = isPassword ? EYE_OFF_ICON : EYE_ICON;
});

email.addEventListener("input", () => {
  const check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (email.value === "") {
    emailText.textContent = "";
    emailText.className = "note";
    return;
  }

  if (check.test(email.value)) {
    emailText.textContent = "Valid email address";
    emailText.className = "note ok";
  } else {
    emailText.textContent = "Please enter a valid email";
    emailText.className = "note bad";
  }
});

password.addEventListener("input", () => {
  const v = password.value;
  const requirements = {
    length: v.length >= 8,
    uppercase: /[A-Z]/.test(v),
    number: /[0-9]/.test(v),
    symbol: /[^A-Za-z0-9]/.test(v),
  };

  const score = Object.values(requirements).filter(Boolean).length;

  // Update Strength Meter
  const colors = ["#f43f5e", "#f43f5e", "#f59e0b", "#3b82f6", "#10b981"];
  const labels = [
    "Too weak",
    "Weak",
    "Getting stronger",
    "Strong",
    "Very strong",
  ];

  strength.style.width = v.length === 0 ? "0%" : `${(score / 4) * 100}%`;
  strength.style.backgroundColor = colors[score];

  passText.textContent = v.length === 0 ? "" : labels[score];
  passText.className = `note ${score >= 3 ? "ok" : score > 1 ? "" : "bad"}`;

  // Update Feedback List
  feedback.innerHTML = `
        <ul>
            <li style="color: ${requirements.length ? "var(--success)" : "var(--text-muted)"}">Min 8 characters</li>
            <li style="color: ${requirements.uppercase ? "var(--success)" : "var(--text-muted)"}">Uppercase letter</li>
            <li style="color: ${requirements.number ? "var(--success)" : "var(--text-muted)"}">One number</li>
            <li style="color: ${requirements.symbol ? "var(--success)" : "var(--text-muted)"}">One special char</li>
        </ul>
    `;
});

login.addEventListener("click", (e) => {
  e.preventDefault();

  if (email.value === "" || password.value === "") {
    login.style.animation = "shake 0.4s ease";
    setTimeout(() => (login.style.animation = ""), 400);
    return;
  }

  login.classList.add("busy");

  // Simulate API Call
  setTimeout(() => {
    login.classList.remove("busy");
    alert("Authentication successful!");
  }, 1500);
});

// Add shake animation dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
