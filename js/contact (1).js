/* ============================================================
   QUWWA GYM — Contact Page JavaScript
   Person 4: contact.js
   Handles: testimonials, feedback form, FAQ accordion
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  await loadTestimonials();
  loadFAQs();
  initStarRating();
  initFeedbackForm();
});

/* ============================================================
   TESTIMONIALS — fetch from API and render
   ============================================================ */
async function loadTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  const testimonials = await fetchAPI('testimonials');

  if (!testimonials || testimonials.length === 0) {
    grid.innerHTML = '<p class="section-subtitle">No reviews yet. Be the first!</p>';
    return;
  }

  grid.innerHTML = testimonials.map(t => `
    <div class="card testimonial-card">
      <div class="testimonial-quote-mark">"</div>
      <div class="testimonial-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-footer">
        <div class="testimonial-info">
          <div class="testimonial-avatar">${t.name.charAt(0)}</div>
          <span class="testimonial-name">${t.name}</span>
        </div>
        <span class="badge-${getPlanBadge(t.plan)}">${t.plan}</span>
      </div>
    </div>
  `).join('');
}

function getPlanBadge(plan) {
  if (!plan) return 'grey';
  const p = plan.toLowerCase();
  if (p === 'elite') return 'orange';
  if (p === 'pro')   return 'red';
  return 'grey';
}

/* ============================================================
   FAQ ACCORDION — fetch from API and render
   ============================================================ */
async function loadFAQs() {
  const list = document.getElementById('faq-list');
  if (!list) return;

  const faqs = await fetchAPI('faqs');

  if (!faqs || faqs.length === 0) {
    list.innerHTML = '<p class="section-subtitle">No FAQs available.</p>';
    return;
  }

  list.innerHTML = faqs.map((faq, index) => `
    <div class="faq-item" id="faq-${index}">
      <div class="faq-question" onclick="toggleFAQ(${index})">
        <span>${faq.question}</span>
        <span class="faq-icon">+</span>
      </div>
      <div class="faq-answer">
        ${faq.answer}
      </div>
    </div>
  `).join('');
}

function toggleFAQ(index) {
  const item = document.getElementById(`faq-${index}`);
  const isOpen = item.classList.contains('open');

  // Close all open items
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));

  // Open clicked one if it was closed
  if (!isOpen) {
    item.classList.add('open');
  }
}

/* ============================================================
   STAR RATING — interactive click to select
   ============================================================ */
function initStarRating() {
  const stars = document.querySelectorAll('.star');
  const ratingInput = document.getElementById('feedback-rating');

  stars.forEach(star => {
    // Hover: highlight up to hovered star
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.value);
      stars.forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.value) <= val);
      });
    });

    // Mouse leave: revert to selected value
    star.addEventListener('mouseleave', () => {
      const selected = parseInt(ratingInput.value) || 0;
      stars.forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.value) <= selected);
      });
    });

    // Click: lock in the rating
    star.addEventListener('click', () => {
      const val = star.dataset.value;
      ratingInput.value = val;
      stars.forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.value) <= parseInt(val));
      });
      hideError(document.getElementById('error-rating'));
    });
  });
}

/* ============================================================
   FEEDBACK FORM — validation + POST to /api/feedback
   ============================================================ */
function initFeedbackForm() {
  const form = document.getElementById('feedback-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameEl    = document.getElementById('feedback-name');
    const emailEl   = document.getElementById('feedback-email');
    const ratingEl  = document.getElementById('feedback-rating');
    const messageEl = document.getElementById('feedback-message');

    const errName    = document.getElementById('error-name');
    const errEmail   = document.getElementById('error-email');
    const errRating  = document.getElementById('error-rating');
    const errMessage = document.getElementById('error-message');

    // Validate all fields
    const validName    = validateRequired(nameEl, errName, 'Please enter your name.');
    const validEmail   = validateEmail(emailEl, errEmail);
    const validMessage = validateRequired(messageEl, errMessage, 'Please write your review.');

    // Validate star rating manually
    let validRating = true;
    if (!ratingEl.value) {
      showError(errRating, 'Please select a star rating.');
      validRating = false;
    }

    // Add red border on invalid inputs
    [nameEl, emailEl, messageEl].forEach(el => {
      el.classList.toggle('input-error', !el.value.trim());
    });

    if (!validName || !validEmail || !validRating || !validMessage) return;

    // Submit
    const btn = document.getElementById('submit-btn');
    btn.textContent = 'Submitting...';
    btn.disabled = true;

    try {
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    nameEl.value.trim(),
          email:   emailEl.value.trim(),
          rating:  parseInt(ratingEl.value),
          message: messageEl.value.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        form.style.display = 'none';
        document.getElementById('form-success').classList.remove('hidden');
      } else {
        btn.textContent = 'Submit Review';
        btn.disabled = false;
        alert(data.error || 'Something went wrong. Please try again.');
      }

    } catch (err) {
      console.error('Feedback submission error:', err);
      btn.textContent = 'Submit Review';
      btn.disabled = false;
      alert('Could not connect to the server. Make sure it is running.');
    }
  });

  // Clear errors on input
  ['feedback-name', 'feedback-email', 'feedback-message'].forEach(id => {
    const el = document.getElementById(id);
    const errId = id.replace('feedback-', 'error-');
    el.addEventListener('input', () => {
      el.classList.remove('input-error');
      hideError(document.getElementById(errId));
    });
  });
}