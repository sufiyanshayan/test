// ==== CONFIG ====
const PASSWORD = "1234"; // এখানে password দাও
const PROTECTED_PAGES = [
  "index.html",
  "test.html",
  "admin.html"
];

// ==== SYSTEM ====
(function () {
  const currentPage = window.location.pathname.split("/").pop();

  if (!PROTECTED_PAGES.includes(currentPage)) return;

  const saved = localStorage.getItem("auth_pass");

  if (saved === PASSWORD) return;

  let input = prompt("Enter Password:");

  if (input === PASSWORD) {
    localStorage.setItem("auth_pass", input);
  } else {
    alert("Wrong Password!");
    window.location.href = "index.html";
  }
})();