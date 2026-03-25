const PASSWORD = "12345"; // এখানে তোমার plain password
const PROTECTED_PAGES = ["index.html", "test.html"];
const SESSION_KEY = "auth"; // session key (reload পর্যন্ত safe)

(function () {
  let page = window.location.pathname.split("/").pop();
  if (page === "") page = "index.html"; // default page

  const saved = sessionStorage.getItem(SESSION_KEY);
  if (saved === PASSWORD) return; // already entered

  if (!PROTECTED_PAGES.includes(page)) return; // not protected

  // overlay login screen
  document.documentElement.innerHTML = `
  <head>
    <title>🔒 Protected Page</title>
    <style>
      body {
        margin:0;
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#0a0a0a;
        font-family:'Segoe UI', sans-serif;
        color:white;
      }
      .login-container {
        background: linear-gradient(135deg,#1c1c1c,#111);
        padding:40px;
        border-radius:15px;
        box-shadow:0 0 25px rgba(0,0,0,0.7);
        text-align:center;
        width:300px;
      }
      .login-container h2 {
        margin-bottom:20px;
        color:#0f62fe;
      }
      input {
        padding:12px;
        margin-bottom:15px;
        width:100%;
        border:none;
        border-radius:8px;
        outline:none;
      }
      button {
        padding:12px;
        width:100%;
        border:none;
        border-radius:8px;
        background:#0f62fe;
        color:white;
        font-weight:bold;
        cursor:pointer;
        transition:0.3s;
      }
      button:hover { background:#0353e9; }
      .logout-btn {
        margin-top:10px;
        background:#ff3b3b;
      }
      .logout-btn:hover { background:#d60000; }
    </style>
  </head>
  <body>
    <div class="login-container">
      <h2>🔒 Enter Password</h2>
      <input type="password" id="pass" placeholder="Password">
      <button onclick="checkPass()">Enter</button>
      <button class="logout-btn" onclick="logout()">Logout</button>
    </div>
  </body>
  `;

  window.checkPass = function () {
    const input = document.getElementById("pass").value;
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, input);
      location.reload();
    } else {
      alert("Wrong password!");
    }
  };

  window.logout = function () {
    sessionStorage.removeItem(SESSION_KEY);
    location.reload();
  };
})();