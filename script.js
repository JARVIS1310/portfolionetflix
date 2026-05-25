/* ============================================================
   🎥 NETFLIX INTRO TIMING
   ============================================================ */
(function initNetflixIntro() {
  const intro = document.getElementById('netflix-intro');
  if (!intro) return;

  // Let the logo ident animation run, then fade out the screen
  setTimeout(() => {
    intro.classList.add('fade-out');
    // Set display none after fade-out transition completes (600ms)
    setTimeout(() => {
      intro.style.display = 'none';
    }, 600);
  }, 2400);
})();

/* Contact API health-check helper removed — contact form expects Node API to be available */

/* ============================================================
   ✍️ STRICT TYPEWRITER ANIMATION (SINGLE LINE LOOP)
   ============================================================ */
(function initTypewriter() {
  const text = "Hi, I am Harsh Kumar Choudhary";
  const typewriterElement = document.getElementById('typewriter-text');
  if (!typewriterElement) return;

  let charIndex = 0;
  let isDeleting = false;
  let holdTimer = null;

  function typeAction() {
    if (isDeleting) {
      // Erase character by character
      charIndex--;
      typewriterElement.textContent = text.substring(0, charIndex);
      
      if (charIndex === 0) {
        isDeleting = false;
        // Pause 0.5s before typing again
        holdTimer = setTimeout(typeAction, 500);
      } else {
        // Erasing speed (faster)
        holdTimer = setTimeout(typeAction, 35);
      }
    } else {
      // Type character by character
      charIndex++;
      typewriterElement.textContent = text.substring(0, charIndex);
      
      if (charIndex === text.length) {
        isDeleting = true;
        // Pause 2.0s once fully typed
        holdTimer = setTimeout(typeAction, 2000);
      } else {
        // Typing speed
        holdTimer = setTimeout(typeAction, 70);
      }
    }
  }

  // Start the typing loop
  holdTimer = setTimeout(typeAction, 1000);
})();

/* ============================================================
   🍿 CINEMATIC SPARK/EMBER CANVAS (Adapted particle canvas)
   ============================================================ */
(function initEmbers() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  
  const PARTICLE_COUNT = 45;
  const CONNECT_DIST = 130;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        // Ebers float upwards slowly
        vy: (Math.random() - 0.7) * 0.25,
        r: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.5 + 0.15,
        isRed: Math.random() > 0.4 // 60% Netflix red, 40% Cinema white
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      // Wrap around boundaries
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      
      if (p.isRed) {
        ctx.fillStyle = `rgba(229, 9, 20, ${p.alpha})`; // Netflix red
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.6})`; // Warm white
      }
      ctx.fill();

      // Inter-particle networking lines (subtle red glow mesh)
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < CONNECT_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          // Red connection lines
          ctx.strokeStyle = `rgba(229, 9, 20, ${0.1 * (1 - dist / CONNECT_DIST)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createParticles(); });
  resize();
  createParticles();
  draw();
})();

/* ============================================================
   📱 MOBILE NAVBAR DRAWER
   ============================================================ */
(function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-netflix');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

/* ============================================================
   🍿 SCROLL & ROW JUMP NAVIGATION
   ============================================================ */
(function initScrollNavigation() {
  const header = document.querySelector('.site-header-netflix');
  const scrollProgress = document.getElementById('scroll-progress');

  if (!header && !scrollProgress) return;

  // Change header background on scroll and keep the progress bar in sync.
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    if (header) {
      header.classList.toggle('scrolled', scrollTop > 50);
    }

    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = pct + '%';
    }
  });
})();

/* ============================================================
   🃏 TILT & MAGNETIC INTERACTIVE HOVERS
   ============================================================ */
(function initTiltAndMagnetic() {
  // 3D Card Tilt Effect
  const tiltCards = document.querySelectorAll('.tilt');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -7;
      const rotateY = ((x / rect.width) - 0.5) * 7;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Magnetic Button Attractor
  const magneticElements = document.querySelectorAll('.magnetic');
  magneticElements.forEach((element) => {
    element.addEventListener('mousemove', (event) => {
      const rect = element.getBoundingClientRect();
      const moveX = (event.clientX - (rect.left + rect.width / 2)) * 0.16;
      const moveY = (event.clientY - (rect.top + rect.height / 2)) * 0.16;
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
    });
  });
})();

/* ============================================================
   🍿 REVEAL SECTIONS ON SCROLL
   ============================================================ */
(function initRevealObserver() {
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealItems.forEach((item) => observer.observe(item));
})();

/* ============================================================
   🍿 CERTIFICATIONS ROW BUILDER & MODAL POPUPS
   ============================================================ */
(function buildCertificates() {
  const certContainer = document.getElementById('certContainer');
  const eventContainer = document.getElementById('eventContainer');
  const internContainer = document.getElementById('internContainer');

  if (!certContainer || !eventContainer || !internContainer) return;

  const certs = ['certify1.png', 'certify2.png', 'certify3.png', 'certify4.png', 'certify5.png', 'certify6.png', 'certify7.png', 'certify8.png', 'certify9.png', 'certify14.png', 'certify15.png', 'certify16.png', 'certify17.png', 'certify18.png', 'certify19.png'];
  const events = ['certify10.png', 'certify11.png', 'certify12.png', 'certify13.png', 'certify24.png'];
  const internships = ['certify20.png', 'certify21.png', 'certify22.png', 'certify23.png', 'certify25.png', 'certify26.png', 'certify27.png', 'certify28.png', 'certify29.png'];

  // Add modular preview modal container
  const modal = document.createElement('div');
  modal.className = 'preview-modal';
  modal.innerHTML = '<button type="button" class="preview-close" aria-label="Close preview">×</button><img alt="Credential certificate full preview">';
  document.body.appendChild(modal);

  const previewImage = modal.querySelector('img');
  const closeButton = modal.querySelector('.preview-close');

  function closePreview() {
    modal.classList.remove('open');
    previewImage.src = '';
  }

  closeButton.addEventListener('click', closePreview);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closePreview();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePreview();
  });

  function createCard(src, label) {
    const card = document.createElement('article');
    // Styled as Netflix row cards with premium glow & tilt support
    card.className = 'card row-card cert-card reveal tilt';
    // Use a small client-side fallback so missing uploads don't show a broken image
    card.innerHTML = `<img src="${src}" alt="${label}" onerror="this.onerror=null;this.src='internship.png';"><h3>${label}</h3>`;
    
    card.addEventListener('click', () => {
      previewImage.src = src;
      modal.classList.add('open');
    });

    // Wire up mouse movements for local 3D tilt dynamically
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -7;
      const rotateY = ((x / rect.width) - 0.5) * 7;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
      card.style.borderColor = '#E50914';
      card.style.boxShadow = '0 15px 35px rgba(0,0,0,0.85), 0 0 20px rgba(229, 9, 20, 0.25)';
      card.style.zIndex = '50';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.borderColor = '';
      card.style.boxShadow = '';
      card.style.zIndex = '';
    });

    return card;
  }

  // Populate row-scroll tracks with explicit labels
  const certLabels = [
    'freeCodeCamp',
    'Scaler Topics',
    'Google Analytics Academy',
    'simplilearn SkillUP',
    'neocolab',
    'Google',
    'IBM',
    'UAB',
    'University of Colorado',
    'udemy',
    'udemy',
    'Infosys',
    'Infosys',
    'MongoDB',
    'MongoDB'
  ];

  certs.forEach((src, index) => {
    const label = certLabels[index] || `Certificate ${index + 1}`;
    certContainer.appendChild(createCard(src, label));
  });

  const eventLabels = [
    'Techfest IIT ROPAR',
    'Techfest IIT ROPAR',
    'Techfest IIT ROPAR',
    'SYMPOSIUM 2.0',
    'Quiz IIT ROORKEE'
  ];

  events.forEach((src, index) => {
    const label = eventLabels[index] || `Workshop ${index + 1}`;
    eventContainer.appendChild(createCard(src, label));
  });

  const internLabels = [
    'DELOITTE',
    'DELOITTE',
    'TATA',
    'TATA',
    'accenture',
    'accenture',
    'Skyscanner',
    'mastercard',
    'NAVODITA INFOTECH'
  ];

  internships.forEach((src, index) => {
    const label = internLabels[index] || `Internship ${index + 1}`;
    internContainer.appendChild(createCard(src, label));
  });

  // Setup intersection observer triggers for dynamically loaded items
  const revealItems = document.querySelectorAll('.cert-card.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
})();


(function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  const toast = document.getElementById('form-toast');
  const emailjsServiceMeta = document.querySelector('meta[name="emailjs-service-id"]');
  const emailjsTemplateMeta = document.querySelector('meta[name="emailjs-template-id"]');
  const emailjsPublicKeyMeta = document.querySelector('meta[name="emailjs-public-key"]');
  const emailjsRecipientEmailMeta = document.querySelector('meta[name="emailjs-recipient-email"]');
  const emailjsRecipientNameMeta = document.querySelector('meta[name="emailjs-recipient-name"]');
  let emailjsInitialized = false;

  function showToast(message, type) {
    if (!toast) return;
    toast.textContent = message;
    toast.className = `form-toast show ${type}`;
    setTimeout(() => { toast.classList.remove('show'); }, 4000);
  }

  function getMetaContent(meta) {
    const value = meta ? meta.getAttribute('content') : '';
    return value ? value.trim() : '';
  }

  function hasConfiguredEmailJs() {
    return Boolean(getMetaContent(emailjsServiceMeta) && getMetaContent(emailjsTemplateMeta) && getMetaContent(emailjsPublicKeyMeta));
  }

  function initEmailJs(publicKey) {
    if (emailjsInitialized || !window.emailjs || !publicKey) return;
    try {
      window.emailjs.init({ publicKey });
    } catch (error) {
      try {
        window.emailjs.init(publicKey);
      } catch (fallbackError) {
        console.error('[EmailJS] init failed', error, fallbackError);
      }
    }
    emailjsInitialized = true;
  }

  async function saveToInbox(payload) {
    async function post(url) {
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    let res = null;
    try { res = await post('/api/contact'); } catch (_) { res = null; }

    if (!res || !res.ok) {
      try { res = await post('http://localhost:3000/api/contact'); } catch (_) { res = null; }
    }

    if (!res) return null;
    return res;
  }

  async function sendViaEmailJs(payload) {
    if (!hasConfiguredEmailJs() || !window.emailjs) return null;

    const serviceId = getMetaContent(emailjsServiceMeta);
    const templateId = getMetaContent(emailjsTemplateMeta);
    const publicKey = getMetaContent(emailjsPublicKeyMeta);
    const recipientEmail = getMetaContent(emailjsRecipientEmailMeta);
    const recipientName = getMetaContent(emailjsRecipientNameMeta);

    initEmailJs(publicKey);
    // Diagnostic flags for automated testing
    try { window.__emailJsRequestMade = false; window.__lastEmailJsError = null; } catch (e) {}

    const templateParams = {
      from_name: payload.name,
      from_email: payload.email,
      reply_to: payload.email,
      // Include sender name and email in the message body so recipient sees full context
      message: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
      to_name: recipientName || 'Harsh Kr. Choudhary',
      to_email: recipientEmail || 'kumarchoudharyharsh824@gmail.com',
      subject: `Portfolio contact from ${payload.name}`,
    };

    // Attempt send and normalize errors for better diagnostics
    try {
      try { window.__emailJsRequestMade = true; } catch (e) {}
      return await window.emailjs.send(serviceId, templateId, templateParams);
    } catch (err) {
      try { window.__lastEmailJsError = err; } catch (e) {}
      // EmailJS errors can be simple strings or objects with status/text
      try {
        console.error('[EmailJS] raw error:', err);
        // If err has a textual body, attach it to thrown error
        if (err && err.text) {
          const e = new Error(`EmailJS send failed: ${err.text}`);
          e.status = err.status || null;
          e.body = err.text;
          try { window.__lastEmailJsError = { message: e.message, status: e.status, body: e.body }; } catch (e2) {}
          throw e;
        }
        if (err && err.status) {
          const e2 = new Error(`EmailJS send failed (status ${err.status})`);
          e2.status = err.status;
          e2.body = JSON.stringify(err);
          try { window.__lastEmailJsError = { message: e2.message, status: e2.status, body: e2.body }; } catch (e2) {}
          throw e2;
        }
      } catch (wrapErr) {
        try { window.__lastEmailJsError = { message: String(wrapErr) }; } catch (e) {}
        throw wrapErr;
      }
      throw err;
    }
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    let valid = true;

    // Reset error text
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');

    if (!name.value.trim()) {
      document.getElementById('name-error').textContent = 'Name is required to unlock contact';
      valid = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      document.getElementById('email-error').textContent = 'A valid email is required';
      valid = false;
    }
    if (!message.value.trim()) {
      document.getElementById('message-error').textContent = 'Describe your challenge or collaboration goals';
      valid = false;
    }

    if (!valid) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');
      if (btnText) btnText.textContent = 'Sending...';
      if (btnSpinner) btnSpinner.hidden = false;
    }

    const payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
    };

    try {
      if (!hasConfiguredEmailJs()) {
        showToast('Message delivery is not configured. Please enable EmailJS or contact the site owner directly.', 'error');
        return;
      }

      // Try to send via EmailJS (client SDK). Do not save to the local inbox — removed per request.
      await sendViaEmailJs(payload);
      showToast('Message sent successfully. Thank you for contacting me — I will respond within 24 hours.', 'success');
      contactForm.reset();
    } catch (err) {
      console.error('[Contact] Submit error', err);
      // Surface EmailJS-specific diagnostics when available
      const diag = (err && (err.body || err.message)) ? ` (${err.body || err.message})` : '';
      showToast(`Could not send message via EmailJS${diag}. Please try again later.`, 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        const btnText = submitBtn.querySelector('.btn-text');
        const btnSpinner = submitBtn.querySelector('.btn-spinner');
        if (btnText) btnText.textContent = 'Send Message';
        if (btnSpinner) btnSpinner.hidden = true;
      }
    }
  });
})();


(function initContactInbox() {
  const inboxRoot = document.querySelector('[data-contact-inbox]');
  if (!inboxRoot) return;

  const list = document.getElementById('inboxList');
  const countEl = document.getElementById('inboxCount');
  const unreadEl = document.getElementById('unreadCount');
  const refreshedEl = document.getElementById('lastRefreshed');
  const emptyState = document.getElementById('inboxEmpty');
  const refreshBtn = document.getElementById('refreshInbox');
  const unreadOnlyToggle = document.getElementById('unreadOnlyToggle');
  const toast = document.getElementById('inboxToast');

  let currentMessages = [];

  function getApiBases() {
    const bases = [window.location.origin];
    if (!bases.includes('http://localhost:3000')) {
      bases.push('http://localhost:3000');
    }
    return bases;
  }

  async function fetchJson(pathname, options = {}) {
    let lastError = null;

    for (const base of getApiBases()) {
      try {
        const response = await fetch(`${base}${pathname}`, options);
        const data = await response.json().catch(() => ({}));
        return { response, data, base };
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error('Unable to reach API');
  }

  function showToast(message, type) {
    if (!toast) return;
    toast.textContent = message;
    toast.className = `form-toast show ${type}`;
    setTimeout(() => { toast.classList.remove('show'); }, 3500);
  }

  function escapeText(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function renderMessages(messages) {
    if (!list) return;
    list.innerHTML = '';

    if (!messages.length) {
      if (emptyState) emptyState.hidden = false;
      list.hidden = true;
      return;
    }

    if (emptyState) emptyState.hidden = true;
    list.hidden = false;

    messages.forEach((message) => {
      const card = document.createElement('article');
      card.className = `card inbox-message-card${message.read ? '' : ' unread'}`;
      card.innerHTML = `
        <div class="inbox-message-head">
          <div>
            <p class="summary-meta">${message.read ? 'Read' : 'Unread'}</p>
            <h3>${escapeText(message.name)}</h3>
          </div>
          <div class="inbox-message-actions">
            <span class="inbox-time">${new Date(message.timestamp).toLocaleString()}</span>
            ${message.read ? '' : `<button type="button" class="btn btn-secondary btn-mini-play inbox-mark-read" data-id="${escapeText(message.id)}">Mark read</button>`}
          </div>
        </div>
        <p class="page-note">${escapeText(message.email)}</p>
        <p class="inbox-message-body">${escapeText(message.message).replace(/\n/g, '<br>')}</p>
        <div class="movie-tags"><span>ID: ${escapeText(message.id)}</span><span>${escapeText(message.ip || 'unknown IP')}</span></div>
      `;
      list.appendChild(card);
    });

    list.querySelectorAll('.inbox-mark-read').forEach((button) => {
      button.addEventListener('click', async () => {
        const messageId = button.dataset.id;
        if (!messageId) return;

        button.disabled = true;
        try {
          const { response, data } = await fetchJson(`/api/contact/${encodeURIComponent(messageId)}/read`, { method: 'PATCH' });

          if (!response.ok) {
            throw new Error(data.error || 'Failed to update message');
          }

          showToast('Message marked as read.', 'success');
          await loadMessages();
        } catch (error) {
          console.error('[Inbox] Mark read failed', error);
          showToast('Could not update message status.', 'error');
        } finally {
          button.disabled = false;
        }
      });
    });
  }

  async function loadMessages() {
    if (!list) return;
    list.hidden = false;

    const unreadOnly = unreadOnlyToggle ? unreadOnlyToggle.checked : false;
    const pathname = `/api/contact/messages?limit=100${unreadOnly ? '&unread=true' : ''}`;

    list.innerHTML = '<div class="inbox-loading">Loading received messages...</div>';

    try {
      const { response, data } = await fetchJson(pathname);

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to load inbox');
      }

      currentMessages = data.messages || [];
      renderMessages(currentMessages);

      if (countEl) countEl.textContent = String(data.count ?? currentMessages.length);
      if (unreadEl) unreadEl.textContent = String(currentMessages.filter((message) => !message.read).length);
      if (refreshedEl) refreshedEl.textContent = new Date().toLocaleString();
    } catch (error) {
      console.error('[Inbox] Load failed', error);
      list.innerHTML = '<div class="inbox-loading inbox-error">Could not load messages. Start the backend server and try again.</div>';
      showToast('Failed to load inbox messages.', 'error');
    }
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', loadMessages);
  }

  if (unreadOnlyToggle) {
    unreadOnlyToggle.addEventListener('change', loadMessages);
  }

  loadMessages();
})();

/* ============================================================
   🍿 PAGE TRANSITIONS & ROUTE-AWARE NAVIGATION
   ============================================================ */
(function initPageTransitions() {
  const body = document.body;
  const navLinks = document.querySelectorAll('.menu-netflix a[data-page]');
  const currentPage = body.dataset.page || 'home';

  function setActiveNav() {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.page === currentPage);
    });
  }

  function getTransitionTarget(link) {
    try {
      const url = new URL(link.href, window.location.href);

      if (url.origin !== window.location.origin) return null;
      if (link.target === '_blank' || link.hasAttribute('download')) return null;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return null;

      return url.toString();
    } catch {
      return null;
    }
  }

  window.requestAnimationFrame(() => body.classList.add('page-loaded'));
  setActiveNav();

  window.addEventListener('pageshow', () => {
    body.classList.remove('page-leaving');
    body.classList.add('page-loaded');
    setActiveNav();
  });

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const targetUrl = getTransitionTarget(link);
    if (!targetUrl) return;

    event.preventDefault();
    body.classList.add('page-leaving');
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 220);
  });
})();
