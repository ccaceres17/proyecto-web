/* script.js
 - Menu responsive
 - IntersectionObserver fade-in
 - Form validation (simulated)
 - Counters
 - Scroll to top
 - Parallax hero small effect
*/

(() => {
  // Menu toggle
  const btnHamburger = document.getElementById('btnHamburger');
  const mainNav = document.getElementById('mainNav');
  btnHamburger && btnHamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    btnHamburger.classList.toggle('open');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior:'smooth', block:'start' });
        // close menu on mobile
        if (mainNav.classList.contains('open')) mainNav.classList.remove('open');
      }
    })
  });

  // Intersection observer for fade-in
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // Counters
  const counters = document.querySelectorAll('.count');
  const runCounters = (el) => {
    const target = +el.dataset.target;
    const duration = 1500;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const inc = () => {
      start += step;
      if (start >= target) {
        el.textContent = target;
      } else {
        el.textContent = start;
        requestAnimationFrame(inc);
      }
    };
    inc();
  };
  if (counters.length) {
    const countersObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          runCounters(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => countersObserver.observe(c));
  }

  // Form validation & simulated submit
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // basic validation
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const email = form.email.value.trim();
      if (!name || !phone || !email) {
        formMessage.textContent = 'Please complete all required fields.';
        formMessage.style.color = 'crimson';
        return;
      }
      // simulate send
      formMessage.textContent = 'Sending...';
      formMessage.style.color = 'var(--muted)';
      setTimeout(() => {
        formMessage.textContent = 'Your request has been sent! We will contact you soon.';
        formMessage.style.color = 'green';
        form.reset();
      }, 900);
    });
  }

  // Scroll to top button
  const btnTop = document.getElementById('btnScrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btnTop.style.display = 'flex';
    else btnTop.style.display = 'none';
  });
  btnTop && btnTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  // Small parallax effect for hero background
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      hero.style.backgroundPosition = `center ${Math.max(-10, -offset * 0.12)}px`;
    });
  }

})();