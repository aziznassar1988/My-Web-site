let toggleBtn = document.querySelector(".menu-toggle");
let menu = document.querySelector("#navLinks");
toggleBtn.addEventListener("click", () => {
  if (toggleBtn.addEventListener) {
    menu.classList.toggle("active");
    if (menu.classList.contains("active")) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }
});

// close Nav bar in mobile Automatically after press any link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    document.querySelector("body").style.overflow = "auto";
  });
});
