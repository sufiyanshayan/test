<script>
// ===== CONFIG =====
const USERS = [
  { username: "admin", password: "12345" },
  { username: "guest", password: "guest123" }
];
const PROTECTED_PAGES = ["index.html","test.html","secret.html"];
const MAX_ATTEMPTS = 3;
const BLOCK_DURATION = 30*1000;

// ===== KEYS =====
const LOGIN_KEY = "auth_logged_in"; // logged in state
const ATTEMPT_KEY = "auth_attempt";
const BLOCK_KEY = "auth_block";

// hide content initially
document.documentElement.style.display = "none";

(function(){
  let page = window.location.pathname.split("/").pop() || "index.html";
  if(!PROTECTED_PAGES.includes(page)){
    document.documentElement.style.display = ""; // show normal content
    return;
  }

  // ===== CHECK LOGIN =====
  if(sessionStorage.getItem(LOGIN_KEY) === "true"){
    document.documentElement.style.display = ""; // show content
    return;
  }

  // ===== CHECK BLOCK =====
  const blockUntil = sessionStorage.getItem(BLOCK_KEY);
  if(blockUntil && Date.now() < parseInt(blockUntil)){
    const wait = Math.ceil((parseInt(blockUntil)-Date.now())/1000);
    document.body.innerHTML = `
      <body style="margin:0;height:100vh;background:black;display:flex;justify-content:center;align-items:center;color:white;font-family:sans-serif;">
        <h2>⏳ Too many wrong attempts. Wait ${wait} sec</h2>
      </body>`;
    return;
  }

  // ===== GET ATTEMPTS =====
  let attempts = parseInt(sessionStorage.getItem(ATTEMPT_KEY)) || 0;

  // ===== LOGIN UI =====
  document.documentElement.innerHTML = `
  <head>
    <title>🔒 Login Required</title>
    <style>
      body{margin:0;height:100vh;display:flex;justify-content:center;align-items:center;background:#000;color:white;font-family:sans-serif;}
      .login-box{background:#111;padding:30px;border-radius:10px;text-align:center;box-shadow:0 0 15px rgba(0,0,0,0.7);width:280px;}
      input{padding:10px;width:100%;border-radius:6px;border:none;margin:5px 0;}
      button{padding:10px;width:100%;border:none;border-radius:6px;background:#0f62fe;color:white;font-weight:bold;cursor:pointer;margin:5px 0;}
      button:hover{background:#0353e9;}
      .info{color:#ccc;font-size:0.85em;}
    </style>
  </head>
  <body>
    <div class="login-box">
      <h2>🔒 Login</h2>
      <input type="text" id="username" placeholder="Username">
      <input type="password" id="password" placeholder="Password">
      <button id="loginBtn">Enter</button>
      <div class="info">Attempts left: ${MAX_ATTEMPTS - attempts}</div>
    </div>
  </body>
  `;

  // ===== LOGIN CHECK =====
  document.getElementById("loginBtn").addEventListener("click", ()=>{
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const valid = USERS.find(u=>u.username===user && u.password===pass);

    if(valid){
      sessionStorage.setItem(LOGIN_KEY, "true");
      sessionStorage.removeItem(ATTEMPT_KEY);
      sessionStorage.removeItem(BLOCK_KEY);
      document.documentElement.style.display = ""; // show page content
    } else {
      attempts++;
      sessionStorage.setItem(ATTEMPT_KEY, attempts);
      if(attempts>=MAX_ATTEMPTS){
        sessionStorage.setItem(BLOCK_KEY, Date.now()+BLOCK_DURATION);
      }
      location.reload();
    }
  });

})();
</script>