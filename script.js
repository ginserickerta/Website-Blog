/* ============================================
   5 bestbooks — Interactions & Animations (v2)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll shadow ---------- */
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks   = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Dropdown toggle ---------- */
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const navDropdown = document.querySelector('.nav-dropdown');

  if (dropdownToggle && navDropdown) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      navDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove('open');
      }
    });

    navDropdown.querySelectorAll('.dropdown-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navDropdown.classList.remove('open');
        if (menuToggle) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
  }

  /* ---------- Scroll-reveal for book cards AND full articles ---------- */
  const revealElements = document.querySelectorAll('.book-card, .article-full');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger delay based on dataset or default
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el, index) => {
    // Only stagger book cards, articles come in immediately
    if (el.classList.contains('book-card')) {
      el.dataset.delay = index * 80;
    }
    observer.observe(el);
  });

  /* ---------- Back to Top button ---------- */
  const backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Smooth anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80; // account for sticky header
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Current year in footer ---------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
