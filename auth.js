const PASSWORD_HASH = "827ccb0eea8a706c4c34a16891f84e7b"; // password: 12345

const PROTECTED_PAGES = [
  "index.html",
  "test.html"
];

// ===== HASH FUNCTION =====
async function md5(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("MD5", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// ===== SYSTEM =====
(async function () {
  let page = window.location.pathname.split("/").pop();

  // 👉 index.html detect fix (important)
  if (page === "") page = "index.html";

  if (!PROTECTED_PAGES.includes(page)) return;

  const saved = localStorage.getItem("auth");

  if (saved === PASSWORD_HASH) return;

  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      background:#111;
      color:white;
      flex-direction:column;
      font-family:sans-serif;
    ">
      <h2>🔒 Protected Page</h2>
      <input type="password" id="pass" placeholder="Enter password"
        style="padding:10px;margin:10px;">
      <button onclick="checkPass()">Login</button>
    </div>
  `;

  window.checkPass = async function () {
    const input = document.getElementById("pass").value;
    const hash = await md5(input);

    if (hash === PASSWORD_HASH) {
      localStorage.setItem("auth", hash);
      location.reload();
    } else {
      alert("Wrong password!");
    }
  };
})();