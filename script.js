const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
  const shortAnswer = faq.querySelector('.short');
  const longAnswer = faq.querySelector('.long');
  const moreBtn = faq.querySelector('.more-button');
  const lessBtn = faq.querySelector('.less-button');

  moreBtn.addEventListener('click', () => {
    // Close all FAQs first (accordion style)
    document.querySelectorAll('.long').forEach(ans => ans.classList.add("hidden"));
    document.querySelectorAll('.short').forEach(ans => ans.classList.remove("hidden"));
    document.querySelectorAll('.more-button').forEach(btn => btn.classList.remove("hidden"));
    document.querySelectorAll('.less-button').forEach(btn => btn.classList.add("hidden"));

    // Open this one
    shortAnswer.classList.add("hidden");
    longAnswer.classList.remove("hidden");
    moreBtn.classList.add("hidden");
    lessBtn.classList.remove("hidden");
  });

  lessBtn.addEventListener('click', () => {
    shortAnswer.classList.remove("hidden");
    longAnswer.classList.add("hidden");
    moreBtn.classList.remove("hidden");
    lessBtn.classList.add("hidden");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("snack-form");
  const snackList = document.getElementById("snack-list");

  // Load snacks on page load
  async function loadSnacks() {
    const response = await fetch("http://localhost:3000/snacks");
    const snacks = await response.json();
    snackList.innerHTML = "";
    snacks.forEach(snack => {
      const li = document.createElement("li");
      li.textContent = `${snack.name} — ${snack.park} (${snack.type}) ⭐ ${snack.rating}`;
      snackList.appendChild(li);
    });
  }

  // Handle new snack submissions
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newSnack = {
      name: document.getElementById("snack-name").value,
      park: document.getElementById("snack-park").value,
      type: document.getElementById("snack-type").value || "Unknown",
      rating: parseInt(document.getElementById("snack-rating").value) || 0
    };

    await fetch("http://localhost:3000/snacks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSnack)
    });

    // Clear form fields
    form.reset();

    // Reload snack list
    loadSnacks();
  });

  loadSnacks();
});