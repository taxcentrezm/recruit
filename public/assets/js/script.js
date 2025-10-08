document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const mobileMenuBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("nav");
  const searchForm = document.querySelector(".search-bar");
  const applyButtons = document.querySelectorAll(".apply");
  const saveButtons = document.querySelectorAll(".save");

  // ========= 8️⃣ HERO BACKGROUND SLIDESHOW =========
const heroSection = document.querySelector(".hero");

if (heroSection) {
  const heroImages = [
    "assets/img/1 (1).jpg",
    "assets/img/1 (2).jpg",
    "assets/img/1 (3).jpg"
  ];

  let current = 0;

  function changeHeroBackground() {
    heroSection.style.backgroundImage = `url('${heroImages[current]}')`;
    heroSection.style.transition = "background-image 1s ease-in-out";
    current = (current + 1) % heroImages.length;
  }

  changeHeroBackground();
  setInterval(changeHeroBackground, 5000);
}


  // ========= 1️⃣ MOBILE NAV MENU =========
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuBtn.classList.toggle("open");
    });
  }

  // ========= 2️⃣ NAVBAR SCROLL EFFECT =========
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ========= 3️⃣ SEARCH BAR VALIDATION =========
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const keyword = document.querySelector("#search-keyword").value.trim();
      const location = document.querySelector("#search-location").value.trim();

      if (keyword === "" && location === "") {
        showToast("Please enter job title or location 🔍", "warning");
        return;
      }

      showToast(`Searching jobs for "${keyword}" in ${location || "All Areas"}...`, "info");

      setTimeout(() => {
        showToast("✅ Results loaded successfully", "success");
      }, 1500);
    });
  }

  // ========= 4️⃣ APPLY BUTTON LOGIC =========
  applyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const jobTitle = btn.closest(".job-card").querySelector("h4").innerText;
      showToast(`📩 Applied for ${jobTitle}`, "success");
      btn.innerHTML = `<i data-feather="check-circle"></i> Applied`;
      btn.disabled = true;
      feather.replace();
    });
  });

  // ========= 5️⃣ SAVE JOB LOGIC =========
  saveButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("saved");
      const isSaved = btn.classList.contains("saved");
      const jobTitle = btn.closest(".job-card").querySelector("h4").innerText;

      if (isSaved) {
        btn.innerHTML = `<i data-feather="bookmark"></i> Saved`;
        showToast(`💾 Saved ${jobTitle} to your list`, "success");
      } else {
        btn.innerHTML = `<i data-feather="bookmark"></i> Save`;
        showToast(`🗑️ Removed ${jobTitle} from saved jobs`, "warning");
      }
      feather.replace();
    });
  });

  // ========= 6️⃣ TOAST SYSTEM =========
  const toastContainer = document.querySelector(".toast-container") || (() => {
    const container = document.createElement("div");
    container.classList.add("toast-container");
    document.body.appendChild(container);
    return container;
  })();

  function showToast(message, type = "info", duration = 4000) {
    const toast = document.createElement("div");
    toast.classList.add("toast", type);

    const icons = {
      success: "check-circle",
      warning: "alert-triangle",
      info: "info"
    };

    toast.innerHTML = `
      <i data-feather="${icons[type] || 'info'}"></i>
      <span>${message}</span>
      <button class="close-btn" aria-label="Close toast">&times;</button>
    `;

    toastContainer.appendChild(toast);
    feather.replace();

    setTimeout(() => toast.classList.add("show"), 10);

    const removeToast = () => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    };

    setTimeout(removeToast, duration);
    toast.querySelector(".close-btn").addEventListener("click", removeToast);
  }

  // ========= 7️⃣ ICON INIT =========
  feather.replace();
});
