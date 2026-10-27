/**
 * WHITE FEATHER SUPPLIES — CLIENT INTERACTION ENGINE
 * Standard: Emil Kowalski interaction craftsmanship
 * Features: Multi-card hero momentum, before/after comparison slider,
 *           quick view modal, scroll deep dive, animated accordion,
 *           newsletter validation, and accessible keyboard focus traps.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAnnouncementBar();
  initStickyHeader();
  initMobileDrawer();
  initHeroSlider();
  initBeforeAfterSlider();
  initColorSwatches();
  initQuickViewModal();
  initFeatureDeepDive();
  initFaqAccordion();
  initNewsletter();
  initScrollReveals();
});

/* ─── 1. Announcement Bar ─── */
function initAnnouncementBar() {
  const bar = document.getElementById('announcementBar');
  const dismissBtn = document.getElementById('announcementDismiss');
  if (!bar || !dismissBtn) return;

  if (sessionStorage.getItem('wfs_announcement_dismissed') === 'true') {
    bar.classList.add('is-dismissed');
  }

  dismissBtn.addEventListener('click', () => {
    bar.classList.add('is-dismissed');
    sessionStorage.setItem('wfs_announcement_dismissed', 'true');
  });
}

/* ─── 2. Sticky Header ─── */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── 3. Mobile Navigation Drawer ─── */
function initMobileDrawer() {
  const drawer = document.getElementById('mobileNavDrawer');
  const openBtn = document.getElementById('menuToggle');
  const closeBtn = document.getElementById('drawerClose');
  const backdrop = document.getElementById('drawerBackdrop');
  if (!drawer || !openBtn || !closeBtn || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    openBtn.focus();
  };

  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/* ─── 4. Hero Bento: In-Card Sliders ─── */
function initHeroSlider() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-card-slider]').forEach((card) => {
    const slides = Array.from(card.querySelectorAll('.cs-slide'));
    if (slides.length < 2) return;
    const marks = Array.from(card.querySelectorAll('.cs-progress span, .cs-dots span'));
    const interval = parseInt(card.dataset.interval, 10) || 3500;
    card.style.setProperty('--cs-interval', `${interval}ms`);

    let index = 0;
    let timer = null;

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
        slide.classList.toggle('is-prev', i === (index - 1 + slides.length) % slides.length);
      });
      marks.forEach((mark, i) => {
        mark.classList.remove('is-active', 'is-done');
        void mark.offsetWidth; // restart the fill animation
        if (i < index) mark.classList.add('is-done');
        if (i === index) mark.classList.add('is-active');
      });
    }

    function play() {
      stop();
      if (reduceMotion) return;
      card.classList.remove('is-paused');
      timer = setInterval(() => show(index + 1), interval);
    }

    function stop() {
      clearInterval(timer);
      timer = null;
    }

    card.querySelector('[data-cs-prev]')?.addEventListener('click', () => { show(index - 1); play(); });
    card.querySelector('[data-cs-next]')?.addEventListener('click', () => { show(index + 1); play(); });

    card.addEventListener('mouseenter', () => { stop(); card.classList.add('is-paused'); });
    card.addEventListener('mouseleave', play);

    // Swipe
    let startX = null;
    card.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stop(); }, { passive: true });
    card.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
      startX = null;
      play();
    });

    // Pause when off-screen
    new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : stop())).observe(card);

    show(0);
  });

  // Ingredient tabs ("What will you keep?")
  const tabs = Array.from(document.querySelectorAll('.keep-tab'));
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });
    });
  });
}

/* ─── 5. Before / After Comparison Slider ─── */
function initBeforeAfterSlider() {
  const container = document.getElementById('comparisonContainer');
  const beforeImg = document.getElementById('comparisonBefore');
  const handle = document.getElementById('comparisonHandle');
  if (!container || !beforeImg || !handle) return;

  let isSliding = false;

  function setSliderPosition(percent) {
    const clamped = Math.max(0, Math.min(100, percent));
    handle.style.left = `${clamped}%`;
    beforeImg.style.clipPath = `polygon(0 0, ${clamped}% 0, ${clamped}% 100%, 0 100%)`;
    handle.setAttribute('aria-valuenow', Math.round(clamped));
  }

  function updateFromEvent(e) {
    const rect = container.getBoundingClientRect();
    const pageX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const offsetX = pageX - rect.left;
    const percent = (offsetX / rect.width) * 100;
    setSliderPosition(percent);
  }

  handle.addEventListener('mousedown', () => isSliding = true);
  container.addEventListener('mousedown', (e) => {
    isSliding = true;
    updateFromEvent(e);
  });

  window.addEventListener('mousemove', (e) => {
    if (isSliding) updateFromEvent(e);
  });

  window.addEventListener('mouseup', () => isSliding = false);

  container.addEventListener('touchstart', (e) => {
    isSliding = true;
    updateFromEvent(e);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isSliding) updateFromEvent(e);
  }, { passive: true });

  window.addEventListener('touchend', () => isSliding = false);

  // Keyboard accessibility
  handle.addEventListener('keydown', (e) => {
    const current = parseFloat(handle.style.left || '50');
    if (e.key === 'ArrowLeft') {
      setSliderPosition(current - 5);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      setSliderPosition(current + 5);
      e.preventDefault();
    }
  });

  // Default to 50%
  setSliderPosition(50);
}

/* ─── 6. Product Swatches on Cards ─── */
function initColorSwatches() {
  document.querySelectorAll('.swatch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parentCard = btn.closest('.product-card') || btn.closest('.modal-card');
      if (!parentCard) return;

      parentCard.querySelectorAll('.swatch-btn').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');

      const color = btn.getAttribute('data-color');
      const targetImg = btn.getAttribute('data-target-img');
      const primaryImg = parentCard.querySelector('.product-img-primary') || parentCard.querySelector('.modal-img');

      if (primaryImg && targetImg) {
        primaryImg.src = targetImg;
      }
    });
  });
}

/* ─── 7. Quick View Modal Engine ─── */
const PRODUCT_DATA = {
  '8.5L': {
    title: '8.5L Extra-Large Plastic Food Storage Containers – Set of 2',
    price: '$40.99',
    compare: '$43.99',
    savings: 'Save $3.00 (7%)',
    specs: '7.87"W x 5.51"L x 11.96"H · BPA-Free ABS & SAN · 4-Lock Blue Gasket',
    description: 'Includes 2 extra-large 8.5L containers with airtight silicone-sealed clamp lids, 2 precision measuring cups, waterproof chalkboard labels, and a white chalk marker.',
    image: 'assets/studio/m85_stack_square.jpg',
    secondary: 'assets/studio/m85_lifestyle.jpg',
    url: 'https://whitefeathersupplies.com/products/extra-large-8-5l-plastic-food-storage-containers-set-of-2',
    variants: [
      { name: 'Clear', color: 'clear', img: 'assets/studio/m85_stack_square.jpg' }
    ]
  },
  '6.5L': {
    title: '6.5L Plastic Food Containers – Set of 2',
    price: '$40.99',
    compare: '$44.99',
    savings: 'Save $4.00 (9%)',
    specs: '6.8"W x 6.0"L x 11.2"H · BPA-Free ABS & SAN · 4-Lock Blue Gasket',
    description: 'Includes 2 versatile 6.5L containers with airtight silicone-sealed clamp lids, 18 waterproof reusable labels, and 2 precision measuring cups.',
    image: 'assets/studio/m65_clear.jpg',
    secondary: 'assets/studio/m65_black.jpg',
    url: 'https://whitefeathersupplies.com/products/6-5l-plastic-food-container-set-of-2',
    variants: [
      { name: 'Clear', color: 'clear', img: 'assets/studio/m65_clear.jpg' },
      { name: 'Black', color: 'black', img: 'assets/studio/m65_black.jpg' },
      { name: 'Grey', color: 'grey', img: 'assets/studio/m65_grey.jpg' }
    ]
  }
};

function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  if (!modal || !closeBtn) return;

  document.querySelectorAll('[data-quick-view]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const productKey = trigger.getAttribute('data-quick-view');
      openQuickView(productKey);
    });
  });

  function openQuickView(key) {
    const data = PRODUCT_DATA[key];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalPrice').textContent = data.price;
    document.getElementById('modalCompare').textContent = data.compare;
    document.getElementById('modalSavings').textContent = data.savings;
    document.getElementById('modalSpecs').textContent = data.specs;
    document.getElementById('modalDesc').textContent = data.description;
    document.getElementById('modalImg').src = data.image;
    document.getElementById('modalFullLink').href = data.url;

    // Build swatches
    const swatchContainer = document.getElementById('modalSwatches');
    swatchContainer.innerHTML = '';
    data.variants.forEach((v, idx) => {
      const s = document.createElement('button');
      s.className = `swatch-btn ${idx === 0 ? 'is-selected' : ''}`;
      s.setAttribute('data-color', v.color);
      s.setAttribute('data-target-img', v.img);
      s.setAttribute('aria-label', `Select ${v.name} lid`);
      s.addEventListener('click', () => {
        swatchContainer.querySelectorAll('.swatch-btn').forEach(b => b.classList.remove('is-selected'));
        s.classList.add('is-selected');
        document.getElementById('modalImg').src = v.img;
      });
      swatchContainer.appendChild(s);
    });

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Quantity counter
  const minus = document.getElementById('modalQtyMinus');
  const plus = document.getElementById('modalQtyPlus');
  const qtyInput = document.getElementById('modalQtyInput');

  if (minus && plus && qtyInput) {
    minus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });
    plus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      qtyInput.value = val + 1;
    });
  }

  // Add to cart toast feedback
  const addToCartBtn = document.getElementById('modalAddToCart');
  const toast = document.getElementById('cartToast');
  const headerCartCount = document.getElementById('headerCartCount');

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const addedQty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
      let currentCount = parseInt(headerCartCount.textContent) || 0;
      headerCartCount.textContent = currentCount + addedQty;

      addToCartBtn.textContent = '✓ Added to Cart!';
      addToCartBtn.style.backgroundColor = '#059669';

      if (toast) {
        toast.classList.add('is-visible');
        setTimeout(() => toast.classList.remove('is-visible'), 3200);
      }

      setTimeout(() => {
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.style.backgroundColor = '';
        closeModal();
      }, 900);
    });
  }
}

/* ─── 8. Scroll-Driven Feature Deep Dive ─── */
function initFeatureDeepDive() {
  const cards = document.querySelectorAll('.deepdive-feature-card');
  const hotspots = document.querySelectorAll('.deepdive-hotspot');
  const img = document.getElementById('deepdiveImg');
  if (!cards.length || !img) return;

  const featureImages = {
    '1': 'assets/studio/seal_macro.jpg',        // Gasket & clamps
    '2': 'assets/studio/m85_stack_square.jpg',  // Clear body
    '3': 'assets/studio/m65_clear.jpg',         // Measuring & portions
    '4': 'assets/studio/chalk_label.jpg',       // Labels & marker
    '5': 'assets/studio/stack_studio.jpg'       // Stacked pantry
  };

  function activateFeature(step) {
    cards.forEach(c => {
      c.classList.toggle('is-active', c.getAttribute('data-step') === step);
    });

    hotspots.forEach(h => {
      h.classList.toggle('is-active', h.getAttribute('data-step') === step);
    });

    if (featureImages[step]) {
      img.style.opacity = '0.5';
      img.style.transform = 'scale(0.98)';
      setTimeout(() => {
        img.src = featureImages[step];
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, 150);
    }
  }

  cards.forEach(c => {
    c.addEventListener('click', () => activateFeature(c.getAttribute('data-step')));
    c.addEventListener('mouseenter', () => activateFeature(c.getAttribute('data-step')));
  });

  hotspots.forEach(h => {
    h.addEventListener('click', () => activateFeature(h.getAttribute('data-step')));
  });
}

/* ─── 9. Real FAQ Accordion Engine ─── */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all others
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherTrigger = other.querySelector('.faq-trigger');
          const otherContent = other.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* ─── 10. Newsletter Form ─── */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const input = document.getElementById('newsletterEmail');
  const successMsg = document.getElementById('newsletterSuccess');
  if (!form || !input || !successMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (email && email.includes('@')) {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';
      }
      setTimeout(() => {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.textContent = `Thank you! We've sent a 10% welcome voucher to ${email}.`;
      }, 400);
    }
  });
}

/* ─── 11. Emil Kowalski Scroll Reveals ─── */
function initScrollReveals() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('is-revealed'));
  }
}
