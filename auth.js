const PASSWORD = "12345"; // plain password
const PROTECTED_PAGES = ["index.html", "test.html"];
const SESSION_KEY = "auth_attempt"; // session storage key
const BLOCK_KEY = "auth_block"; // blocked timestamp
const MAX_ATTEMPTS = 3;
const BLOCK_DURATION = 30; // seconds

(function () {
  let page = window.location.pathname.split("/").pop();
  if (page === "") page = "index.html";

  // check if page is protected
  if (!PROTECTED_PAGES.includes(page)) return;

  // check if blocked
  const blockUntil = sessionStorage.getItem(BLOCK_KEY);
  if (blockUntil && Date.now() < parseInt(blockUntil)) {
    const wait = Math.ceil((parseInt(blockUntil) - Date.now()) / 1000);
    document.body.innerHTML = `<body style="margin:0;height:100vh;background:black;display:flex;justify-content:center;align-items:center;color:white;font-family:sans-serif;">
      <h2>⏳ Too many wrong attempts. Wait ${wait} sec</h2>
    </body>`;
    setTimeout(()=>location.reload(), 1000);
    return;
  }

  // check session (reload resets, so always ask)
  let attempts = parseInt(sessionStorage.getItem(SESSION_KEY)) || 0;

  // overlay login screen
  document.documentElement.innerHTML = `
  <head>
    <title>🔒 Locked</title>
    <style>
      body {margin:0;height:100vh;display:flex;justify-content:center;align-items:center;background:#111;color:white;font-family:'Segoe UI', sans-serif;}
      .login-box {background:linear-gradient(135deg,#1c1c1c,#111);padding:40px;border-radius:15px;box-shadow:0 0 25px rgba(0,0,0,0.7);text-align:center;width:300px;}
      .login-box h2 {margin-bottom:20px;color:#0f62fe;}
      input {padding:12px;margin-bottom:15px;width:100%;border:none;border-radius:8px;outline:none;}
      button {padding:12px;width:100%;border:none;border-radius:8px;background:#0f62fe;color:white;font-weight:bold;cursor:pointer;transition:0.3s;}
      button:hover{background:#0353e9;}
      .logout-btn{margin-top:10px;background:#ff3b3b;}
      .logout-btn:hover{background:#d60000;}
      .info {margin-top:10px;color:#ccc;font-size:0.9em;}
    </style>
  </head>
  <body>
    <div class="login-box">
      <h2>🔒 Enter Password</h2>
      <input type="password" id="pass" placeholder="Password">
      <button onclick="checkPass()">Enter</button>
      <button class="logout-btn" onclick="logout()">Logout</button>
      <div class="info">Attempts left: ${MAX_ATTEMPTS - attempts}</div>
    </div>
  </body>
  `;

  window.checkPass = function() {
    const val = document.getElementById("pass").value;
    if (val === PASSWORD) {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(BLOCK_KEY);
      location.reload(); // show actual content
    } else {
      attempts++;
      sessionStorage.setItem(SESSION_KEY, attempts);
      if (attempts >= MAX_ATTEMPTS) {
        const blockTime = Date.now() + BLOCK_DURATION*1000;
        sessionStorage.setItem(BLOCK_KEY, blockTime);
        location.reload();
      } else {
        location.reload();
      }
    }
  };

  window.logout = function() {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(BLOCK_KEY);
    location.reload();
  };
})();