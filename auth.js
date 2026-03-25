const PASSWORD = "12345";

const PROTECTED_PAGES = ["index.html", "test.html"];

(function () {
  let page = window.location.pathname.split("/").pop();

  if (page === "") page = "index.html";

  if (!PROTECTED_PAGES.includes(page)) return;

  const saved = sessionStorage.getItem("auth");

  if (saved === PASSWORD) return;

  const input = prompt("Enter Password:");

  if (input === PASSWORD) {
    sessionStorage.setItem("auth", input);
  } else {
    alert("Wrong password!");
    window.location.href = "https://google.com";
  }
})();