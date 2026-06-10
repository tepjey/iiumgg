// auth.js

// Save user
function signup(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find(u => u.email === email);
  if (exists) {
    alert("User already exists!");
    return;
  }

  users.push({ name, email, password, role: "user" });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created!");
  window.location.href = "login.html";
}

// create default admin if not exists
let users = JSON.parse(localStorage.getItem("users")) || [];

const adminExists = users.find(u => u.email === "admin@gardengigs.com");

if (!adminExists) {
  users.push({
    name: "Admin",
    email: "admin@gardengigs.com",
    password: "admin123",
    role: "admin"
  });

  localStorage.setItem("users", JSON.stringify(users));
}

// Login
function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid login!");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  // redirect based on role
  if (user.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "index.html";
  }
}


// logout helper
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}