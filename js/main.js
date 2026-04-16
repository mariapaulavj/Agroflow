/* ============================================
   AGROFLOW INTELLIGENCE — MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR: scroll effect & active link ─── */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mark current page active
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath || (currentPath === 'index.html' && href === '')) {
      link.classList.add('active');
    }
  });

  /* ─── MOBILE MENU TOGGLE ─── */
  const toggle = document.querySelector('.nav-menu-toggle');
  const mobileMenu = document.querySelector('.nav-links');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      const bars = toggle.querySelectorAll('span');
      if (isOpen) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
      }
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        toggle.querySelectorAll('span').forEach(bar => {
          bar.style.transform = '';
          bar.style.opacity = '';
        });
      });
    });
  }

  /* ─── INTERSECTION OBSERVER: fade-up animations ─── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  }

  /* ─── COUNTER ANIMATION ─── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => countObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  /* ─── DASHBOARD PROGRESS BARS ─── */
  const progressBars = document.querySelectorAll('.progress-fill');
  if (progressBars.length) {
    const pbObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.dataset.width || '0%';
          setTimeout(() => { bar.style.width = width; }, 200);
          pbObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => {
      bar.style.width = '0%';
      pbObserver.observe(bar);
    });
  }

  /* ─── CONTACT FORM ─── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate submission
      setTimeout(() => {
        form.style.display = 'none';
        const success = document.getElementById('form-success');
        if (success) success.classList.add('show');
      }, 1400);
    });
  }

  /* ─── PRICING TOGGLE (Annual / Monthly) ─── */
  const pricingToggle = document.getElementById('pricing-toggle');
  const prices = document.querySelectorAll('[data-monthly][data-annual]');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isAnnual = pricingToggle.checked;
      prices.forEach(el => {
        el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
      });
      const toggleLabel = document.querySelector('.toggle-label-annual');
      const toggleSave  = document.querySelector('.toggle-save');
      if (toggleLabel) toggleLabel.style.fontWeight = isAnnual ? '700' : '400';
      if (toggleSave)  toggleSave.style.display = isAnnual ? 'inline' : 'none';
    });
  }

  /* ─── PHOTO CAROUSELS ─── */
  document.querySelectorAll('.photo-carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots   = carousel.querySelectorAll('.carousel-dot');
    if (slides.length < 2) return;
    let current = 0;

    const goTo = (i) => {
      slides[current].classList.remove('active');
      dots[current]?.classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current]?.classList.add('active');
    };

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    setInterval(() => goTo(current + 1), 4500);
  });

  /* ─── SMOOTH SCROLL for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
