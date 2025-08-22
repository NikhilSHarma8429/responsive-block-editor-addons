document.addEventListener("DOMContentLoaded", () => {
  const HIDDEN = "is-hidden-by-default";

  document.querySelectorAll("[data-rba-gallery-block]").forEach((gallery) => {
    const itemsWrapper = gallery.querySelector(".rba-gallery-items");
    const items = gallery.querySelectorAll(".responsive-block-editor-addons-gallery--item");
    const wrapper = gallery.querySelector(".gallery-filter-wrapper");
    if (!itemsWrapper || items.length === 0) return;

    const columnSize = parseInt(itemsWrapper.dataset.columnsize, 10) || 3;

    function applyMasonry() {
    
      const colHeights = new Array(columnSize).fill(0);
      const colWidth = 100 / columnSize;

      items.forEach((item, index) => {
        item.style.position = "absolute"; 
        const minCol = index % columnSize;

        const left = `${minCol * colWidth}%`;
        const top = `${colHeights[minCol]}px`;

        item.style.left = left;
        item.style.top = top;

        const itemHeight = item.offsetHeight;
        colHeights[minCol] += itemHeight;
      });

      itemsWrapper.style.position = "relative";
      itemsWrapper.style.height = `${Math.max(...colHeights)}px`;
    }

    // --- Filtering logic ---
    const buttons = wrapper
      ? wrapper.querySelectorAll(".gallery-filter-button[data-category]:not(.rba-gf-toggle)")
      : [];
    const initiallyActive =
      wrapper && (wrapper.querySelector(".gallery-filter-button.is-active[data-category]") || buttons[0]);

    function matches(item, cat) {
      return cat === "All" || cat === "all" || item.dataset.category === cat;
    }

    function applyFilter(cat) {
      items.forEach((item) => {
        if (matches(item, cat)) {
          item.classList.remove(HIDDEN);
        } else {
          item.classList.add(HIDDEN);
        }
      });
      applyMasonry(); // recalc layout after filter
    }

    function setActive(activeBtn) {
      buttons.forEach((b) => b.classList.remove("is-active"));
      activeBtn.classList.add("is-active");
    }

    // Initial state
    if (initiallyActive) {
      applyFilter(initiallyActive.dataset.category);
      setActive(initiallyActive);
    } else {
      applyMasonry();
    }

    // Handle clicks (tabs or dropdown items)
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.category;
        if (!cat) return;

        applyFilter(cat);
        setActive(btn);

        const details = btn.closest("details");
        if (details && details.hasAttribute("open")) {
          const summary = details.querySelector("summary");
          if (summary) summary.textContent = btn.textContent;
          details.removeAttribute("open");
        }
      });
    });

    // Recalculate on resize
    window.addEventListener("resize", applyMasonry);
  });
});
