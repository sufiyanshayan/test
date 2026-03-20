<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Protected Page</title>
<style>
  /* Lock screen overlay style */
  #lockScreen {
    position: fixed;
    top:0; left:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.85);
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    color:white;
    font-family: sans-serif;
    z-index:9999;
  }
  #lockScreen input {
    padding:10px;
    font-size:16px;
    margin-top:10px;
    border-radius:5px;
    border:none;
  }
  #lockScreen button {
    margin-top:10px;
    padding:10px 20px;
    font-size:16px;
    border:none;
    border-radius:5px;
    background:#00bfff;
    color:white;
    cursor:pointer;
  }
  #mainContent {
    display:none; /* Hide until password correct */
  }
</style>
</head>
<body>

<!-- Lock screen -->
<div id="lockScreen">
  <h2>Enter Password</h2>
  <input type="password" id="passInput" placeholder="Password">
  <button onclick="checkPassword()">Enter</button>
</div>

<!-- Main content -->
<div id="mainContent">
  <h1>Welcome to My Website 😎</h1>
  <p>This content is password protected.</p>
</div>

<script>
  // Central config (protected pages + password)
  var protectedPages = [
    "index.html",
    "test.html",
    "secret.html"
  ];

  var password = "12345"; // Change to your password

  var currentPage = window.location.pathname.split("/").pop();

  function checkPassword() {
    var userPass = document.getElementById("passInput").value;

    // Check if current page is protected
    if(protectedPages.includes(currentPage)){
      if(userPass === password){
        document.getElementById("lockScreen").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
      } else {
        alert("Wrong password! 🔒");
      }
    } else {
      // Page not protected → show content
      document.getElementById("lockScreen").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
    }
  }

  // Enter key support
  document.getElementById("passInput").addEventListener("keyup", function(event){
    if(event.key === "Enter"){
      checkPassword();
    }
  });
</script>

</body>
</html>