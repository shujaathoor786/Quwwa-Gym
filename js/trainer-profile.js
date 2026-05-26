/* ============================================================
   QUWWA GYM — Trainer Profile JS
   ============================================================ */

const TRAINER_PHOTOS = {
  1: 'images/sara.jpg',
  2: 'images/mike.jpg',
  3: 'images/layla.jpg',
  4: 'images/omar.jpg',
  5: 'images/rania.jpg',
  6: 'images/james.jpg',
  7: 'images/nour.jpg',
  8: 'images/david.jpg',
  9: 'images/hana.jpg',
  10: 'images/tariq.jpg',
};

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  const data = await loadJSON('data/gym-data.json');
  if (!data) return;

  const trainer = data.trainers.find(t => t.id === id);
  if (!trainer) {
    document.querySelector('main').innerHTML = '<div class="container" style="padding:6rem 0;text-align:center"><h2>Trainer not found</h2><a href="trainers.html" class="btn btn-primary mt-4">Back to Trainers</a></div>';
    return;
  }

  // Update page title
  document.title = `${trainer.name} — QUWWA Gym`;

  // Hero
  document.getElementById('heroImg').style.backgroundImage = `url('${TRAINER_PHOTOS[trainer.id]}')`;
  document.getElementById('heroSpec').textContent = trainer.specialization;
  document.getElementById('heroName').textContent = trainer.name;
  document.getElementById('heroTagline').textContent = `"${trainer.tagline}"`;

  document.getElementById('heroStats').innerHTML = `
    <div class="stat-item">
      <div class="stat-number">${trainer.experience}+</div>
      <div class="stat-label">Years Experience</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">${trainer.classes.length}</div>
      <div class="stat-label">Classes</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">${trainer.certifications.length}</div>
      <div class="stat-label">Certifications</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">${trainer.availability.length}</div>
      <div class="stat-label">Days/Week</div>
    </div>
  `;

  // Bio
  document.getElementById('profileBio').textContent = trainer.bio;

  // Photo
  document.getElementById('profilePhoto').src = TRAINER_PHOTOS[trainer.id];
  document.getElementById('profilePhoto').alt = trainer.name;
  document.getElementById('profileBadge').textContent = trainer.specialization;

  // Classes
  document.getElementById('profileClasses').innerHTML = trainer.classes
    .map(c => `<span class="class-pill">${c}</span>`)
    .join('');

  // Availability
  document.getElementById('profileAvailability').innerHTML = DAYS
    .map(day => {
      const active = trainer.availability.includes(day);
      return `<div class="day-pill ${active ? 'active' : 'inactive'}">${day.slice(0,3)}</div>`;
    }).join('');

  // Certifications
  document.getElementById('profileCerts').innerHTML = trainer.certifications
    .map(c => `<li>${c}</li>`)
    .join('');

  // Quote
  document.getElementById('profileQuote').innerHTML = `
    <p class="quote-text">${trainer.clientQuote.text}</p>
    <p class="quote-author">— ${trainer.clientQuote.author}</p>
  `;

  // Gallery
  document.getElementById('profileGallery').innerHTML = trainer.gallery
    .map(img => `
      <div class="profile-gallery-item">
        <img src="${img}" alt="Training" loading="lazy"/>
      </div>
    `).join('');

  // Other trainers (exclude current)
  const others = data.trainers.filter(t => t.id !== trainer.id).slice(0, 4);
  document.getElementById('otherTrainers').innerHTML = others
    .map(t => `
      <div class="other-trainer-card" onclick="window.location.href='trainer-profile.html?id=${t.id}'">
        <img src="${TRAINER_PHOTOS[t.id]}" alt="${t.name}" loading="lazy"/>
        <div class="other-trainer-info">
          <h4>${t.name}</h4>
          <span>${t.specialization}</span>
        </div>
      </div>
    `).join('');
});
