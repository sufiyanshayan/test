const PASSWORD = "12345";

const PROTECTED_PAGES = ["index.html", "test.html"];

(function () {
  let page = window.location.pathname.split("/").pop();

  if (page === "") page = "index.html";

  if (!PROTECTED_PAGES.includes(page)) return;

  const saved = sessionStorage.getItem("auth");

  if (saved === PASSWORD) return;

  // 👉 পুরো page clear (blank)
  document.documentElement.innerHTML = `
    <head>
      <title>Locked</title>
      <style>
        body {
          margin: 0;
          background: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: sans-serif;
        }
        .box {
          background: #111;
          padding: 30px;
          border-radius: 10px;
          text-align: center;
          color: white;
        }
        input {
          padding: 10px;
          margin-top: 10px;
          width: 200px;
        }
        button {
          padding: 10px;
          margin-top: 10px;
          width: 100%;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <div class="box">
        <h2>🔒 Locked</h2>
        <input type="password" id="pass" placeholder="Password">
        <br>
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