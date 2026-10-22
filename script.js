const menuButton = document.querySelector(".site-nav .menu-icon");
const navigation = document.querySelector(".site-nav .trigger");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("open");
    }
  });
}

const publications = [...document.querySelectorAll(".pub")];
document.querySelector("#show-selected-btn")?.addEventListener("click", () => {
  publications.forEach((publication) => {
    publication.hidden = publication.dataset.selected !== "true";
  });
});
document.querySelector("#show-all-btn")?.addEventListener("click", () => {
  publications.forEach((publication) => {
    publication.hidden = false;
  });
});

const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 220 ? "block" : "none";
  });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
