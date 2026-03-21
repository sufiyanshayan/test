<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Website</title>

<script>
/* ===== CENTRAL CONTROL ===== */

// যেসব page lock করতে চাও
var LOCK_PAGES = [
  "index.html",
  "test.html",
  "secret.html"
];

// password
var LOCK_PASSWORD = "12345";

/* ===== LOCK SYSTEM ===== */

(function(){
  var currentPage = window.location.pathname.split("/").pop();

  if(LOCK_PAGES.includes(currentPage)){

    // page hide (flash prevent)
    document.documentElement.style.display = "none";

    var userPass = prompt("Enter Password 🔒");

    if(userPass === LOCK_PASSWORD){
      document.documentElement.style.display = "block";
    } else {
      document.body.innerHTML = `
        <div style="
          display:flex;
          justify-content:center;
          align-items:center;
          height:100vh;
          font-family:sans-serif;
          background:#111;
          color:white;
        ">
          <h1>Access Denied 🔒</h1>
        </div>
      `;
      document.documentElement.style.display = "block";
    }

  }

})();
</script>

</head>
<body>

<h1>Welcome to My Website 😎</h1>
<p>This is your normal page content.</p>

</body>
</html>