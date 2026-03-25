const PASSWORD = "12345";
const PROTECTED_PAGES = ["index.html", "test.html"];

(function () {
  let page = window.location.pathname.split("/").pop();

  if (page === "") page = "index.html";

  console.log("Current page:", page); // debug

  if (!PROTECTED_PAGES.includes(page)) {
    console.log("Not protected page");
    return;
  }

  const saved = sessionStorage.getItem("auth");

  if (saved === PASSWORD) {
    console.log("Already logged in");
    return;
  }

  console.log("LOCK ACTIVATED");

  document.documentElement.innerHTML = `
    <head>
      <title>Locked</title>
      <style>
        body {
          margin: 0;
          background: black;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: white;
        }
      </style>
    </head>
    <body>
      <div>
        <h2>🔒 Locked</h2>
        <input type="password" id="pass">
        <button onclick="checkPass()">Enter</button>
      </div>
    </body>
  `;

  window.checkPass = function () {
    const input = document.getElementById("pass").value;

    if (input === PASSWORD) {
      sessionStorage.setItem("auth", input);
      location.reload();
    } else {
      alert("Wrong password!");
    }
  };
})();