let users = JSON.parse(localStorage.getItem("users")) || [];
let orgs = JSON.parse(localStorage.getItem("organizations")) || [];
let reports = JSON.parse(localStorage.getItem("reports")) || [];

/* ---------------- AUTH GUARD ---------------- */
const current = JSON.parse(localStorage.getItem("currentUser"));
if (!current || current.role !== "admin") {
  window.location.href = "login.html";
}

/* ---------------- INIT ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  updateStats();
  renderUsers();
  renderOrgs();
  renderReports();
  lucide.createIcons();
});

/* ---------------- TAB SWITCH ---------------- */
function switchTab(tab) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

  document.getElementById(tab).classList.add("active");
  event.target.classList.add("active");
}

/* ---------------- STATS ---------------- */
function updateStats() {
  document.getElementById("totalUsers").innerText = users.length;
  document.getElementById("totalOrgs").innerText = orgs.length;
  document.getElementById("verifiedOrgs").innerText =
    orgs.filter(o => o.verified).length;
}

/* ---------------- USERS ---------------- */
function renderUsers(search="") {
  const list = document.getElementById("userList");
  list.innerHTML = "";

  users
    .filter(u => u.email.includes(search) || u.name.includes(search))
    .forEach((u, i) => {
      list.innerHTML += `
        <div class="job-card">
          <b>${u.name}</b><br>
          <small>${u.email}</small><br><br>

          <button class="btn red" onclick="deleteUser(${i})">Delete</button>
          <button class="btn" onclick="promote(${i})">Make Admin</button>
        </div>
      `;
    });
}

function deleteUser(i) {
  users.splice(i,1);
  save();
}

function promote(i) {
  users[i].role = "admin";
  save();
}

/* ---------------- ORGS ---------------- */
function renderOrgs() {
  const list = document.getElementById("orgList");
  list.innerHTML = "";

  orgs.forEach((o,i) => {
    list.innerHTML += `
      <div class="job-card">
        <b>${o.name}</b><br>
        <small>${o.type}</small><br><br>

        ${o.verified ? `
          <span style="color:green;font-weight:bold;">✔ Verified</span>
        ` : `
          <button class="btn" onclick="verify(${i})">Verify</button>
          <button class="btn red" onclick="reject(${i})">Reject</button>
        `}
      </div>
    `;
  });
}

function verify(i) {
  orgs[i].verified = true;
  save();
}

function reject(i) {
  orgs.splice(i,1);
  save();
}

/* ---------------- REPORTS ---------------- */
function renderReports() {
  const list = document.getElementById("reportList");
  list.innerHTML = "";

  reports.forEach(r => {
    list.innerHTML += `
      <div class="job-card">
        <b>${r.title}</b><br>
        <small>${r.desc}</small>
      </div>
    `;
  });
}

function generateReport() {
  const report = {
    title: "Daily Report",
    desc: `Users: ${users.length}, Orgs: ${orgs.length}`,
    date: new Date().toLocaleDateString()
  };

  reports.push(report);
  save();
}

/* ---------------- SAVE ---------------- */
function save() {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("organizations", JSON.stringify(orgs));
  localStorage.setItem("reports", JSON.stringify(reports));

  updateStats();
  renderUsers();
  renderOrgs();
  renderReports();
}

/* ---------------- LOGOUT ---------------- */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}