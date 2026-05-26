/* ============================================================
   QUWWA GYM — Shared JavaScript
   Handles: navbar injection, footer injection,
            active nav link, mobile menu toggle
   ============================================================ */

/* ---------- Navbar HTML ---------- */
const NAVBAR_HTML = `
<nav class="navbar">
  <div class="container">
    <a href="index.html" class="nav-logo">QUWWA</a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html">Home</a></li>
      <li><a href="classes.html">Classes</a></li>
      <li><a href="trainers.html">Trainers</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="classes.html#booking" class="btn btn-primary">Join Now</a></li>
    </ul>
    <div class="hamburger" id="hamburger" onclick="toggleMenu()">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>
`;

/* ---------- Footer HTML ---------- */
const FOOTER_HTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="nav-logo">QUWWA</a>
        <p class="mt-2">Built for those who refuse to stop. Train harder, live stronger, be unstoppable.</p>
      </div>
      <div>
        <h4>Pages</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="classes.html">Classes</a></li>
          <li><a href="trainers.html">Trainers & Gallery</a></li>
          <li><a href="contact.html">Contact & Reviews</a></li>
        </ul>
      </div>
      <div>
        <h4>Programs</h4>
        <ul>
          <li><a href="classes.html">Strength Training</a></li>
          <li><a href="classes.html">HIIT Cardio</a></li>
          <li><a href="classes.html">Yoga & Recovery</a></li>
          <li><a href="classes.html">Boxing</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="contact.html">Dubai Marina Branch</a></li>
          <li><a href="contact.html">JLT Branch</a></li>
          <li><a href="mailto:hello@quwwa.ae">hello@quwwa.ae</a></li>
          <li><a href="tel:+97141234567">+971 4 123 4567</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 QUWWA Gym. All rights reserved.</p>
    </div>
  </div>
</footer>
`;

/* ---------- Inject on DOM ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Inject navbar
  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) navPlaceholder.innerHTML = NAVBAR_HTML;

  // Inject footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;

  // Highlight active nav link
  setActiveLink();
});

/* ---------- Highlight current page link ---------- */
function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('#')[0];
    if (href === currentPage) link.classList.add('active');
  });
}

/* ---------- Mobile menu toggle ---------- */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* ---------- Utility: fetch JSON data ---------- */
async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return await res.json();
  } catch (err) {
    console.error('loadJSON error:', err);
    return null;
  }
}

/* ---------- Utility: fetch from Node.js API ---------- */
async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`http://localhost:3000/api/${endpoint}`);
    if (!res.ok) throw new Error(`API error: ${endpoint}`);
    return await res.json();
  } catch (err) {
    console.error('fetchAPI error:', err);
    return null;
  }
}

/* ---------- Utility: form validation helpers ---------- */
function validateRequired(inputEl, errorEl, message = 'This field is required.') {
  if (!inputEl.value.trim()) {
    showError(errorEl, message);
    return false;
  }
  hideError(errorEl);
  return true;
}

function validateEmail(inputEl, errorEl) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inputEl.value.trim())) {
    showError(errorEl, 'Please enter a valid email address.');
    return false;
  }
  hideError(errorEl);
  return true;
}

function validatePhone(inputEl, errorEl) {
  const phoneRegex = /^\+?[\d\s\-]{7,15}$/;
  if (!phoneRegex.test(inputEl.value.trim())) {
    showError(errorEl, 'Please enter a valid phone number.');
    return false;
  }
  hideError(errorEl);
  return true;
}

function showError(errorEl, message) {
  if (errorEl) { errorEl.textContent = message; errorEl.classList.add('show'); }
}

function hideError(errorEl) {
  if (errorEl) { errorEl.textContent = ''; errorEl.classList.remove('show'); }
}

/* ---------- Utility: render star rating ---------- */
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}
