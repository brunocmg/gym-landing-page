(() => {
  const track = document.querySelector(".carrossel-faixa");
  if (!track) return;

  const visibleCards = 3;
  const originalSlides = Array.from(
    track.querySelectorAll(".carrossel-card, .carrossel-slide"),
  );
  const btnPrev = document.querySelector(".carrossel-arrow.esquerda");
  const btnNext = document.querySelector(".carrossel-arrow.direita");

  let autoplayId = null;
  const AUTOPLAY_DELAY = 4500;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;
  let scrollEndTimer = null;

  function buildInfiniteTrack() {
    const headClones = originalSlides.slice(-visibleCards).map((slide) => {
      const clone = slide.cloneNode(true);
      clone.dataset.clone = "true";
      return clone;
    });

    const tailClones = originalSlides.slice(0, visibleCards).map((slide) => {
      const clone = slide.cloneNode(true);
      clone.dataset.clone = "true";
      return clone;
    });

    headClones.reverse().forEach((clone) => {
      track.insertBefore(clone, track.firstChild);
    });

    tailClones.forEach((clone) => track.appendChild(clone));
  }

  buildInfiniteTrack();

  let slides = Array.from(track.querySelectorAll(".carrossel-slide"));
  let index = visibleCards;

  function getMaxIndex() {
    return slides.length - 1;
  }

  function clampIndex(value) {
    return Math.min(Math.max(value, 0), getMaxIndex());
  }

  function refreshSlides() {
    slides = Array.from(track.querySelectorAll(".carrossel-slide"));
  }

  function getSlideLeft(targetIndex) {
    return slides[targetIndex]?.offsetLeft ?? 0;
  }

  function jumpWithoutAnimation(targetIndex) {
    index = targetIndex;
    track.style.scrollBehavior = "auto";
    track.scrollTo({
      left: getSlideLeft(targetIndex),
      behavior: "auto",
    });
    track.offsetHeight;
    track.style.scrollBehavior = "smooth";
  }

  function normalizeIfNeeded() {
    refreshSlides();
    const realStart = visibleCards;
    const realEnd = slides.length - visibleCards - 1;

    if (index > realEnd) {
      index = index - originalSlides.length;
      jumpWithoutAnimation(index);
    }

    if (index < realStart) {
      index = index + originalSlides.length;
      jumpWithoutAnimation(index);
    }
  }

  function goTo(targetIndex, smooth = true) {
    refreshSlides();
    index = clampIndex(targetIndex);
    track.scrollTo({
      left: getSlideLeft(index),
      behavior: smooth ? "smooth" : "auto",
    });
  }

  function next() {
    goTo(index + 1, true);
  }

  function prev() {
    goTo(index - 1, true);
  }

  track.addEventListener("scroll", () => {
    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      refreshSlides();
      const left = track.scrollLeft;
      let closest = 0;
      slides.forEach((c, i) => {
        if (
          Math.abs(c.offsetLeft - left) <
          Math.abs(slides[closest].offsetLeft - left)
        )
          closest = i;
      });
      index = closest;
      normalizeIfNeeded();
    }, 80);
  });


  if (btnNext) btnNext.addEventListener("click", next);
  if (btnPrev) btnPrev.addEventListener("click", prev);


  track.addEventListener("pointerdown", (event) => {
    isDragging = true;
    dragStartX = event.clientX;
    dragStartScrollLeft = track.scrollLeft;
    event.preventDefault();
    track.setPointerCapture(event.pointerId);
    track.style.cursor = "grabbing";
    stopAutoplay();
  });

  track.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - dragStartX;
    track.scrollLeft = dragStartScrollLeft - deltaX;
  });

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = "grab";
    normalizeIfNeeded();
    startAutoplay();
  }

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("lostpointercapture", endDrag);


  function startAutoplay() {
    if (autoplayId) return;
    autoplayId = setInterval(() => next(), AUTOPLAY_DELAY);
  }
  function stopAutoplay() {
    if (!autoplayId) return;
    clearInterval(autoplayId);
    autoplayId = null;
  }

  track.addEventListener("mouseenter", stopAutoplay);
  track.addEventListener("mouseleave", startAutoplay);
  track.addEventListener("focusin", stopAutoplay);
  track.addEventListener("focusout", startAutoplay);


  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });


  let resizeTimer = null;
  window.addEventListener("resize", () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => goTo(index, false), 120);
  });


  refreshSlides();
  track.style.scrollBehavior = "smooth";
  jumpWithoutAnimation(visibleCards);
  startAutoplay();
})();
