/* =======================================================
   CIVI RECRUITMENT PLATFORM
   Corporate Red Edition
   Author: SMAIT DEV
   ======================================================= */

// ===============
// GLOBAL ELEMENTS
// ===============
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const mobileMenuBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("nav");
  const searchForm = document.querySelector(".search-bar");
  const jobCards = document.querySelectorAll(".job-card");
  const applyButtons = document.querySelectorAll(".apply");
  const saveButtons = document.querySelectorAll(".save");

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

  // ========= 3️⃣ SEARCH BAR ANIMATION =========
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

  // ========= 4️⃣ APPLY BUTTON =========
  applyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const jobTitle = btn.closest(".job-card").querySelector("h4").innerText;
      showToast(`📩 Applied for ${jobTitle}`, "success");
      btn.innerHTML = `<i data-feather="check-circle"></i> Applied`;
      btn.disabled = true;
      feather.replace();
    });
  });

  // ========= 5️⃣ SAVE JOB =========
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

  // ========= 6️⃣ TOAST MESSAGE SYSTEM =========
  const toastContainer = document.createElement("div");
  toastContainer.classList.add("toast-container");
  document.body.appendChild(toastContainer);

  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.classList.add("toast", type);
    toast.innerHTML = message;
    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => toast.classList.remove("show"), 3000);
    setTimeout(() => toast.remove(), 3500);
  }

  // ========= 7️⃣ DASHBOARD MOCK DATA (Optional for Employer Side) =========
  if (document.querySelector("#dashboard-stats")) {
    const stats = [
      { label: "Active Jobs", value: 12 },
      { label: "Total Applicants", value: 318 },
      { label: "Interviews Scheduled", value: 24 },
      { label: "Hires Made", value: 8 },
    ];

    const statsContainer = document.querySelector("#dashboard-stats");
    stats.forEach((s) => {
      const card = document.createElement("div");
      card.classList.add("stat-card", "fade-in");
      card.innerHTML = `
        <i data-feather="bar-chart-2"></i>
        <h3>${s.value}</h3>
        <p>${s.label}</p>
      `;
      statsContainer.appendChild(card);
    });
    feather.replace();
  }

  // ========= 8️⃣ FEATHER ICON INIT =========
  feather.replace();
});
