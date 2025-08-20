document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-rba-gallery-block]").forEach((gallery) => {
    const items = gallery.querySelectorAll(".responsive-block-editor-addons-gallery--item");
    const wrapper = gallery.querySelector(".gallery-filter-wrapper");
    if (!wrapper || items.length === 0) return;

    const buttons = wrapper.querySelectorAll(".gallery-filter-button[data-category]:not(.rba-gf-toggle)");
    if (buttons.length === 0) return;

    const initiallyActive = wrapper.querySelector(".gallery-filter-button.is-active[data-category]") || buttons[0];

    function applyFilter(cat) {
      const target = (cat || "").trim().toLowerCase();
      items.forEach((item) => {
        const match = target === "all" || (item.dataset.category || "").toLowerCase() === target;
        item.classList.toggle("is-hidden", !match);  
      });
    }

    function setActive(activeBtn) {
      buttons.forEach((b) => b.classList.remove("is-active"));
      activeBtn.classList.add("is-active");
    }

    // Initial state
    if (initiallyActive) {
      applyFilter(initiallyActive.dataset.category);
      setActive(initiallyActive);
    }

    // Handle all button clicks
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.category;
        if (!cat) return;
        
        applyFilter(cat);
        setActive(btn);
      });
    });


  });
});
