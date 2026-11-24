document.addEventListener("DOMContentLoaded", () => {
  const b = document.querySelector(".burger"), n = document.querySelector("nav");
  if (b && n) {
    if (window.innerWidth < 768) n.style.height = "0px";
    b.addEventListener("click", () => {
      n.style.height = (n.style.height === "0px" || n.style.height === "") ? n.scrollHeight + "px" : "0px";
    });
    window.addEventListener("resize", () => {
      n.style.height = window.innerWidth >= 768 ? "auto" : "0px";
    });
  }
  const t = document.getElementById("theme-toggle");
  if (t) {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-theme");
      t.textContent = "ðŸŒ™ Dark";
    }
    t.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isLight = document.body.classList.contains("light-theme");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      t.textContent = isLight ? "ðŸŒ™ Dark" : "â˜€ï¸ Light";
    });
  }

  // Active nav highlight
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(a => { if (a.getAttribute("href") === page) a.classList.add("active-link"); });

  // Skill filter buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      document.querySelectorAll(".card[data-cat]").forEach(c => {
        c.style.display = (f === "all" || c.dataset.cat === f) ? "block" : "none";
      });
    });
  });

  // Personalized Thank You page message
  const params = new URLSearchParams(window.location.search);
  const sender = params.get("yourName");
  const email = params.get("yourEmail");
  if (sender && document.getElementById("ty-heading")) {
    document.getElementById("ty-heading").textContent = "Thank You, " + sender + "!";
    if (email) document.getElementById("ty-msg").textContent = "Your message has been received. I will reply to " + email + " as soon as possible.";
  }

  // Smooth Scroll-to-Top button
  const topBtn = document.createElement("button");
  topBtn.textContent = "↑";
  topBtn.className = "scroll-top-btn";
  topBtn.setAttribute("aria-label", "Scroll back to top");
  document.body.appendChild(topBtn);
  window.addEventListener("scroll", () => { topBtn.style.display = window.scrollY > 220 ? "block" : "none"; });
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});