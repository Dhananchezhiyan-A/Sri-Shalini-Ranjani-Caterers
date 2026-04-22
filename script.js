/* =============================================
   1. GSAP PLUGIN REGISTRATION
   ============================================= */
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* =============================================
   2. PRELOADER
   ============================================= */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');

  // Let the bar animation play, then fade out
  setTimeout(() => {
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: () => {
        preloader.classList.add('hidden');
        initHeroAnimations(); // Kick off hero after preloader
      }
    });
  }, 2000);
});

/* =============================================
   3. NAVBAR — Scroll effect + Hamburger
   ============================================= */
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');

// Sticky shadow on scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Active link based on scroll position
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';

  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) currentSection = sec.getAttribute('id');
  });

  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) link.classList.add('active');
  });
}

/* =============================================
   4. HERO ANIMATIONS (GSAP)
   ============================================= */
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.2 });

  tl.to('.hero-pre-title', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .to('.hero-title-line1', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out'
  }, '-=0.4')
  .to('.hero-title-line2', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out'
  }, '-=0.6')
  .to('.hero-divider', {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.3')
  .to('.hero-tagline', {
    opacity: 1,
    duration: 0.7,
    ease: 'power2.out'
  }, '-=0.2')
  .to('.hero-sub', {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.3')
  .to('.hero-buttons', {
    opacity: 1,
    duration: 0.7,
    ease: 'power2.out'
  }, '-=0.2');
}

/* =============================================
   5. PARALLAX HERO BACKGROUND
   ============================================= */
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    heroSection.style.backgroundPositionY = `calc(50% + ${scrollY * 0.35}px)`;
  }
});

/* =============================================
   6. SCROLL REVEAL ANIMATIONS (GSAP ScrollTrigger)
   ============================================= */
function initScrollReveal() {
  // Reveal up
  gsap.utils.toArray('.reveal-up').forEach(el => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Reveal left
  gsap.utils.toArray('.reveal-left').forEach(el => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Reveal right
  gsap.utils.toArray('.reveal-right').forEach(el => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });
}

initScrollReveal();

/* =============================================
   7. STAT COUNTER ANIMATION
   ============================================= */
function animateCounter(el, target) {
  const startTime = performance.now();
  const duration = 1800;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

ScrollTrigger.create({
  trigger: '.about-stats',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.stat-number').forEach(el => {
      animateCounter(el, parseInt(el.dataset.target));
    });
  }
});

/* =============================================
   8. SERVICE CARDS — GSAP hover micro-interactions
   ============================================= */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card.querySelector('.service-icon-wrap'), {
      rotation: 15,
      scale: 1.1,
      duration: 0.4,
      ease: 'back.out(1.7)'
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card.querySelector('.service-icon-wrap'), {
      rotation: 0,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out'
    });
  });
});

/* =============================================
   9. MENU FILTER WITH GSAP ANIMATION
   ============================================= */
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Update active tab
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const category = tab.dataset.category;

    // Filter cards with GSAP
    menuCards.forEach((card, i) => {
      const match = category === 'all' || card.dataset.category === category;

      if (match) {
        card.classList.remove('hidden');
        gsap.fromTo(card,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, delay: i * 0.05, ease: 'power2.out' }
        );
      } else {
        gsap.to(card, {
          opacity: 0, scale: 0.95, duration: 0.25, ease: 'power2.in',
          onComplete: () => card.classList.add('hidden')
        });
      }
    });
  });
});

/* =============================================
   10. GALLERY — Lightbox
   ============================================= */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxCap  = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img     = item.querySelector('img');
    const caption = item.querySelector('.gallery-overlay span');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCap.textContent = caption ? caption.textContent : '';
    lightbox.classList.add('active');

    gsap.fromTo(lightboxImg, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.5)' });
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  gsap.to(lightbox, {
    opacity: 0, duration: 0.3, ease: 'power2.in',
    onComplete: () => {
      lightbox.classList.remove('active');
      lightbox.style.opacity = '';
      document.body.style.overflow = '';
    }
  });
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* =============================================
   11. TESTIMONIALS SLIDER
   ============================================= */
const track     = document.getElementById('testimonialsTrack');
const dotsWrap  = document.getElementById('sliderDots');
const prevBtn   = document.getElementById('prevBtn');
const nextBtn   = document.getElementById('nextBtn');
const cards     = track.querySelectorAll('.testimonial-card');

let currentSlide = 0;
let autoSlideTimer;
let visibleCards = getVisibleCards();

function getVisibleCards() {
  return window.innerWidth <= 768 ? 1 : 2;
}

const totalSlides = Math.ceil(cards.length / getVisibleCards());

// Build dots
function buildDots() {
  dotsWrap.innerHTML = '';
  const n = Math.ceil(cards.length / getVisibleCards());
  for (let i = 0; i < n; i++) {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === currentSlide) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  }
}

function goToSlide(index) {
  const vc = getVisibleCards();
  const maxSlide = Math.ceil(cards.length / vc) - 1;
  currentSlide = Math.max(0, Math.min(index, maxSlide));

  // Width of one card + gap
  const cardWidth = track.clientWidth / vc;
  const offset = currentSlide * (cardWidth * vc + 32); // 32 = gap (2rem)

  // Simpler: calc based on track scroll
  const slidePercent = currentSlide * (100 / vc) * vc;
  track.style.transform = `translateX(-${currentSlide * (100 / vc) * vc}%)`;

  // Actually: use pixel-based for precision
  const totalCardWidth = cards[0].offsetWidth + 32;
  track.style.transform = `translateX(-${currentSlide * totalCardWidth * vc}px)`;

  // Update dots
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });

  resetAutoSlide();
}

function nextSlide() {
  const maxSlide = Math.ceil(cards.length / getVisibleCards()) - 1;
  goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
}
function prevSlide() {
  const maxSlide = Math.ceil(cards.length / getVisibleCards()) - 1;
  goToSlide(currentSlide <= 0 ? maxSlide : currentSlide - 1);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(nextSlide, 5000);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Touch/swipe support
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
});

// Resize handler
window.addEventListener('resize', () => {
  visibleCards = getVisibleCards();
  buildDots();
  goToSlide(0);
});

buildDots();
resetAutoSlide();

/* =============================================
   12. CONTACT FORM VALIDATION
   ============================================= */
const contactForm = document.getElementById('contactForm');

const validators = {
  name: (v) => {
    if (!v.trim()) return 'Full name is required.';
    if (v.trim().length < 3) return 'Name must be at least 3 characters.';
    return '';
  },
  phone: (v) => {
    if (!v.trim()) return 'Phone number is required.';
    if (!/^[+\d\s\-()]{7,15}$/.test(v.trim())) return 'Enter a valid phone number.';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Enter a valid email address.';
    return '';
  },
  eventType: (v) => {
    if (!v) return 'Please select an event type.';
    return '';
  },
  guestCount: (v) => {
    if (!v) return 'Guest count is required.';
    if (parseInt(v) < 1) return 'Enter a valid guest count.';
    return '';
  }
};

function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}Error`);
  const validate = validators[fieldId];

  if (!validate || !field) return true;

  const error = validate(field.value);
  errorEl.textContent = error;
  field.classList.toggle('error', !!error);
  return !error;
}

// Real-time validation
['name','phone','email','eventType','guestCount'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('blur', () => validateField(id));
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) validateField(id);
    });
  }
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const fields = ['name','phone','email','eventType','guestCount'];
  const valid = fields.map(validateField).every(Boolean);

  if (!valid) {
    // Shake animation on first error
    const firstError = contactForm.querySelector('.error');
    if (firstError) {
      gsap.to(firstError, {
        x: [-8, 8, -6, 6, -3, 3, 0],
        duration: 0.5,
        ease: 'power1.inOut'
      });
      firstError.focus();
    }
    return;
  }

  // Simulate form submission
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const successMsg = document.getElementById('formSuccess');

  btnText.textContent = 'Sending...';
  submitBtn.disabled = true;

  gsap.to(submitBtn, { scale: 0.97, duration: 0.2 });

  setTimeout(() => {
    gsap.to(submitBtn, {
      opacity: 0, y: 10, duration: 0.3,
      onComplete: () => { submitBtn.style.display = 'none'; }
    });

    successMsg.style.display = 'flex';
    gsap.fromTo(successMsg,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' }
    );

    contactForm.reset();
  }, 1500);
});

/* =============================================
   13. GSAP SECTION TITLE ANIMATIONS
   ============================================= */
gsap.utils.toArray('.section-title').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  });
});

gsap.utils.toArray('.gold-divider').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    scaleX: 0,
    duration: 0.7,
    ease: 'power2.out'
  });
});

/* =============================================
   14. GSAP SERVICE CARD STAGGER
   ============================================= */
ScrollTrigger.create({
  trigger: '.services-grid',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.from('.service-card', {
      opacity: 0,
      y: 50,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out'
    });
  }
});

/* =============================================
   15. MENU CARD INITIAL ANIMATION
   ============================================= */
ScrollTrigger.create({
  trigger: '#menuGrid',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.from('.menu-card', {
      opacity: 0,
      y: 40,
      scale: 0.95,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out'
    });
  }
});

/* =============================================
   16. GALLERY ITEM STAGGER ANIMATION
   ============================================= */
ScrollTrigger.create({
  trigger: '.gallery-grid',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.from('.gallery-item', {
      opacity: 0,
      scale: 0.88,
      stagger: 0.07,
      duration: 0.65,
      ease: 'back.out(1.2)'
    });
  }
});

/* =============================================
   17. FOOTER YEAR
   ============================================= */
document.getElementById('year').textContent = new Date().getFullYear();

/* =============================================
   18. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* =============================================
   19. BUTTON MICRO-INTERACTIONS (GSAP)
   ============================================= */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { scale: 1.04, duration: 0.25, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.inOut' });
  });
  btn.addEventListener('mousedown', () => {
    gsap.to(btn, { scale: 0.97, duration: 0.1 });
  });
  btn.addEventListener('mouseup', () => {
    gsap.to(btn, { scale: 1.04, duration: 0.15 });
  });
});

/* =============================================
   20. CONTACT ITEM HOVER ANIMATION
   ============================================= */
document.querySelectorAll('.contact-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item.querySelector('.contact-icon'), {
      scale: 1.12,
      rotation: 8,
      duration: 0.3,
      ease: 'back.out(2)'
    });
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(item.querySelector('.contact-icon'), {
      scale: 1,
      rotation: 0,
      duration: 0.25,
      ease: 'power2.out'
    });
  });
});

/* =============================================
   21. FOOTER SOCIAL LINK HOVER
   ============================================= */
document.querySelectorAll('.footer-social a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    gsap.to(link, { y: -4, duration: 0.25, ease: 'power2.out' });
  });
  link.addEventListener('mouseleave', () => {
    gsap.to(link, { y: 0, duration: 0.25, ease: 'power2.out' });
  });
});

console.log('%cSri Shalini Ranjani Caterers 🍛', 'font-size:18px; color:#c9a84c; font-weight:bold;');
console.log('%cCrafting Unforgettable Feasts Since 1999', 'font-size:12px; color:#6b1a1a;');