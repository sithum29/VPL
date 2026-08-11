/* ============================================================
   VPL SEASON 02 — Virtual Premier League (BBL 2026-27)
   Shared script for all pages
   ============================================================ */

/* ============================================================
   ⚙️  CONFIG — EDIT THESE TWO VALUES
   ============================================================ */

/* 1) OFFICIAL SEASON 02 LOGO
   Place your logo file in the SAME folder as this site (or a sub-folder)
   and update the file name below. The whole site will update automatically. */
const VPL_LOGO = 'logo2.png';

/* 2) FORMSPREE FORM ID (Team Registrations)
   1. Go to https://formspree.io and create a free account.
   2. Create a new form, copy its endpoint, e.g.  https://formspree.io/f/abcdwxyz
   3. Paste it below (replace YOUR_FORM_ID).
   Submissions (including the icon upload) will arrive in your email inbox. */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

/* ============================================================
   Helpers
   ============================================================ */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ============================================================
   Mobile menu toggle
   ============================================================ */
function toggleMobileMenu() {
  const menu = $('#mobile-menu');
  const icon = $('#menu-icon');
  if (!menu) return;
  const open = menu.classList.toggle('open');
  if (icon) icon.className = open ? 'fas fa-xmark' : 'fas fa-bars';
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = $('.menu-toggle');
  if (toggle) toggle.addEventListener('click', toggleMobileMenu);

  /* Close mobile menu when a link is tapped */
  $$('#mobile-menu a').forEach(link => link.addEventListener('click', () => {
    const menu = $('#mobile-menu');
    const icon = $('#menu-icon');
    menu && menu.classList.remove('open');
    if (icon) icon.className = 'fas fa-bars';
  }));
});

/* ============================================================
   Header shadow on scroll
   ============================================================ */
window.addEventListener('scroll', () => {
  const header = $('.glass-header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

/* ============================================================
   Logo fallback — if the logo image is missing or broken,
   show a styled shield placeholder instead of a broken icon.
   (Replace the file 'logo2.png' with your official logo.)
   ============================================================ */
const LOGO_FALLBACK_SVG =
  "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffd700"/><stop offset="1" stop-color="#b8860b"/>
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="24" fill="#072a19" stroke="#ffd700" stroke-width="3"/>
      <path d="M50 14 L84 26 V52 C84 74 69 86 50 92 C31 86 16 74 16 52 V26 Z" fill="none" stroke="#a3e635" stroke-width="2.5"/>
      <text x="50" y="50" font-family="Arial Black, sans-serif" font-weight="900" font-size="30" fill="url(#g)" text-anchor="middle" dominant-baseline="central">VPL</text>
      <text x="50" y="72" font-family="Arial, sans-serif" font-weight="bold" font-size="9" fill="#a3e635" text-anchor="middle" letter-spacing="2">SEASON 02</text>
    </svg>`);

function applyLogoFallback() {
  $$('img.vpl-logo').forEach(img => {
    img.addEventListener('error', () => {
      img.src = LOGO_FALLBACK_SVG;
      img.style.borderRadius = '14px';
      img.style.objectFit = 'cover';
      img.removeEventListener('error', () => {});
    });
    /* If src was never set, use the configured logo file */
    if (!img.src || img.src === window.location.href) {
      img.src = VPL_LOGO;
    }
  });
}

/* ============================================================
   Hero particles
   ============================================================ */
function spawnParticles() {
  const wrap = $('#particles');
  if (!wrap) return;
  const count = Math.min(34, Math.floor(window.innerWidth / 40));
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    dot.className = 'particle';
    const size = 2 + Math.random() * 4;
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left = (Math.random() * 100) + '%';
    dot.style.animationDuration = (7 + Math.random() * 10) + 's';
    dot.style.animationDelay = (Math.random() * 10) + 's';
    const gold = Math.random() > 0.55;
    dot.style.background = gold ? '#ffd700' : '#a3e635';
    dot.style.boxShadow = gold ? '0 0 8px rgba(255,215,0,.9)' : '0 0 8px rgba(0,240,255,.9)';
    wrap.appendChild(dot);
  }
}

/* ============================================================
   Animated counters
   ============================================================ */
function animateCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const dur = 1400;
      const start = performance.now();

      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * eased);
        el.textContent = prefix + String(val).padStart(2, '0') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });

  counters.forEach(c => io.observe(c));
}

/* ============================================================
   Scroll reveal
   ============================================================ */
function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
}

/* ============================================================
   TEAM REGISTRATION FORM (Formspree AJAX)
   ============================================================ */
function initRegistrationForm() {
  const form = $('#team-registration-form');
  if (!form) return;

  const alertBox   = $('#form-alert');
  const alertIcon  = $('#form-alert-icon');
  const alertText  = $('#form-alert-text');
  const submitBtn  = $('#form-submit-btn');
  const btnLabel   = $('#form-submit-label');
  const btnSpinner = $('#form-submit-spinner');
  const formBody   = $('#form-body');
  const successBox = $('#form-success');

  const setAlert = (type, icon, msg) => {
    alertBox.className = 'form-alert ' + type;
    alertIcon.className = icon;
    alertText.textContent = msg;
  };

  const clearAlert = () => { alertBox.className = 'form-alert'; };

  const setLoading = (loading) => {
    submitBtn.disabled = loading;
    btnLabel.textContent = loading ? 'Submitting...' : 'Submit Registration';
    btnSpinner.style.display = loading ? 'inline-block' : 'none';
  };

  /* --- Owner → Season 01 franchise auto-suggest --- */
  const ownerSel   = $('#owner_name');
  const prevSel    = $('#prev_franchise');
  const OWNER_PREV = {
    'Anuhas': 'Jaffna Sharks',
    'Faith': 'Rajasthan Stallions',
    'Kawidu': 'Royal Challengers Galle',
    'Rishel': 'Sunrisers Colombo',
    'Sithum': 'Apex Bolt Assassins'
  };
  if (ownerSel && prevSel) {
    ownerSel.addEventListener('change', () => {
      const prev = OWNER_PREV[ownerSel.value];
      if (prev) {
        [...prevSel.options].forEach(opt => { if (opt.value === prev) opt.selected = true; });
      }
    });
  }

  /* --- Colour picker → hex readout --- */
  const colourInput = $('#franchise_colour');
  const colourHex   = $('#colour-hex');
  if (colourInput && colourHex) {
    const sync = () => { colourHex.value = colourInput.value.toUpperCase(); };
    colourInput.addEventListener('input', sync);
    sync();
  }

  /* --- Icon file dropzone preview --- */
  const fileInput = $('#franchise_icon');
  const dropzone  = $('#file-drop');
  const preview   = $('#file-preview');
  const previewImg = $('#file-preview-img');
  const previewName = $('#file-preview-name');
  const removeBtn  = $('#file-preview-remove');

  if (fileInput && dropzone) {
    const MAX_MB = 5;
    const showPreview = () => {
      const file = fileInput.files[0];
      if (!file) { dropzone.classList.remove('has-file'); preview.style.display = 'none'; return; }
      dropzone.classList.add('has-file');
      previewName.textContent = file.name + ' (' + (file.size / 1024 / 1024).toFixed(1) + ' MB)';
      if (file.type.startsWith('image/')) {
        previewImg.src = URL.createObjectURL(file);
        previewImg.style.display = 'block';
      } else {
        previewImg.removeAttribute('src');
        previewImg.style.display = 'none';
      }
    };
    fileInput.addEventListener('change', showPreview);
    dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        showPreview();
      }
    });
    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.value = '';
        showPreview();
      });
    }
  }

  /* --- Submit via Formspree (AJAX, supports file upload) --- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert();

    if (!form.checkValidity()) { form.reportValidity(); return; }

    /* Icon size guard */
    if (fileInput && fileInput.files.length && fileInput.files[0].size > 5 * 1024 * 1024) {
      setAlert('error', 'fas fa-triangle-exclamation', 'Icon file is too large. Maximum size is 5 MB.');
      return;
    }

    /* Not configured yet? */
    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      setAlert('warn', 'fas fa-circle-info',
        'The registration form is not connected yet — the commissioner needs to add their Formspree form ID in js/main.js. (See README.md for the 2-minute setup.)');
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData(form);
      fd.append('_subject', 'VPL Season 02 Franchise Registration — ' + (form.franchise_name.value || 'New Franchise'));
      fd.append('_template', 'table');

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        if (fileInput) { fileInput.value = ''; if (dropzone) { dropzone.classList.remove('has-file'); } if (preview) { preview.style.display = 'none'; } }
        if (colourHex) colourHex.value = '#FFD700';
        formBody.style.display = 'none';
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const data = await res.json().catch(() => ({}));
        setAlert('error', 'fas fa-triangle-exclamation',
          (data && data.errors && data.errors.length) ? 'Form error: ' + data.errors[0].message : 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setAlert('error', 'fas fa-triangle-exclamation', 'Network error — could not reach the form service. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  /* Register another franchise */
  const againBtn = $('#form-again-btn');
  if (againBtn) {
    againBtn.addEventListener('click', () => {
      successBox.classList.remove('show');
      formBody.style.display = 'block';
      clearAlert();
    });
  }
}

/* ============================================================
   Footer year
   ============================================================ */
function setFooterYear() {
  $$('.js-year').forEach(el => { el.textContent = new Date().getFullYear(); });
}

/* ============================================================
   Boot
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  spawnParticles();
  applyLogoFallback();
  animateCounters();
  initReveal();
  initRegistrationForm();
  setFooterYear();
});
