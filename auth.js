const PASSWORD = "12345"; // এখানে তোমার password
const PROTECTED_PAGES = ["index.html","test.html"];
const SESSION_KEY = "auth_attempt";
const BLOCK_KEY = "auth_block";
const MAX_ATTEMPTS = 3;
const BLOCK_DURATION = 30*1000; // 30 seconds

(function(){
  let page = window.location.pathname.split("/").pop();
  if(page==="") page="index.html";

  if(!PROTECTED_PAGES.includes(page)) return;

  // check if blocked
  const blockUntil = sessionStorage.getItem(BLOCK_KEY);
  if(blockUntil && Date.now() < parseInt(blockUntil)){
    const wait = Math.ceil((parseInt(blockUntil)-Date.now())/1000);
    document.body.innerHTML = `<body style="margin:0;height:100vh;background:black;display:flex;justify-content:center;align-items:center;color:white;font-family:sans-serif;"><h2>⏳ Too many wrong attempts. Wait ${wait} sec</h2></body>`;
    setTimeout(()=>location.reload(),1000);
    return;
  }

  let attempts = parseInt(sessionStorage.getItem(SESSION_KEY))||0;

  document.documentElement.innerHTML = `
  <head>
    <title>🔒 Protected</title>
    <style>
      body{margin:0;height:100vh;display:flex;justify-content:center;align-items:center;background:#000;font-family:sans-serif;color:white;}
      .login-box{background:#111;padding:40px;border-radius:12px;text-align:center;box-shadow:0 0 20px rgba(0,0,0,0.7);width:300px;}
      .login-box h2{color:#0f62fe;margin-bottom:15px;}
      input{padding:10px;width:100%;border-radius:6px;border:none;margin-bottom:10px;}
      button{padding:10px;width:100%;border:none;border-radius:6px;background:#0f62fe;color:white;font-weight:bold;cursor:pointer;margin-bottom:5px;}
      button:hover{background:#0353e9;}
      .logout-btn{background:#ff3b3b;}
      .logout-btn:hover{background:#d60000;}
      .info{color:#ccc;font-size:0.9em;}
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

  window.checkPass = function(){
    const val = document.getElementById("pass").value;
    if(val === PASSWORD){
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(BLOCK_KEY);
      location.reload();
    }else{
      attempts++;
      sessionStorage.setItem(SESSION_KEY,attempts);
      if(attempts>=MAX_ATTEMPTS){
        sessionStorage.setItem(BLOCK_KEY, Date.now()+BLOCK_DURATION);
      }
      location.reload();
    }
  };

  window.logout = function(){
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(BLOCK_KEY);
    location.reload();
  };
})();