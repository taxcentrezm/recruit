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
