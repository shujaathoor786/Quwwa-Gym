/* ============================================================
   QUWWA GYM — Trainers & Gallery JS
   Person 3
   ============================================================ */

/* ── Trainer photos (local images folder) ── */
const TRAINER_PHOTOS = {
  1:  'images/sara.jpg',
  2:  'images/mike.jpg',
  3:  'images/layla.jpg',
  4:  'images/omar.jpg',
  5:  'images/rania.jpg',
  6:  'images/james.jpg',
  7:  'images/nour.jpg',
  8:  'images/david.jpg',
  9:  'images/hana.jpg',
  10: 'images/tariq.jpg',
};

/* ── Gallery images (local images folder) ── */
const GALLERY_ITEMS = [
  { src: 'images/gym-main.jpg',    caption: 'Main Training Floor' },
  { src: 'images/cardio.jpg',      caption: 'Cardio Zone' },
  { src: 'images/boxing-ring.jpg', caption: 'Boxing Ring' },
  { src: 'images/yoga-studio.jpg', caption: 'Yoga Studio' },
  { src: 'images/pt-session.jpg',  caption: 'Personal Training' },
  { src: 'images/group-class.jpg', caption: 'Group Classes' },
  { src: 'images/rooftop.jpg',     caption: 'Rooftop — Dubai Skyline View' },
];

/* ── Branch map data ── */
const BRANCHES = {
  marina: {
    label: 'Dubai Marina Branch',
    address: 'Marina Walk, Dubai Marina, Dubai, UAE',
    hours: '6:00 AM – 11:00 PM daily',
    phone: '+971 4 123 4567',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.6!2d55.1388!3d25.0812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5b4e3a5e3b%3A0x1234567890abcdef!2sDubai+Marina+Mall!5e0!3m2!1sen!2sae!4v1685000000000',
  },
  jlt: {
    label: 'JLT Branch',
    address: 'Cluster O, Jumeirah Lake Towers, Dubai, UAE',
    hours: '6:00 AM – 10:00 PM daily',
    phone: '+971 4 765 4321',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.2!2d55.1432!3d25.0671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b8f9e0000ab%3A0xabcdef1234567890!2sJumeirah+Lake+Towers!5e0!3m2!1sen!2sae!4v1685000000001',
  },
};

/* ─────────────────────────────────────────
   TRAINERS
───────────────────────────────────────── */
let trainersData = [];

async function loadTrainers() {
  const data = await loadJSON('data/gym-data.json');
  if (!data) return;
  trainersData = data.trainers;
  renderTrainers(trainersData);
}

function renderTrainers(trainers) {
  const grid = document.getElementById('trainersGrid');
  if (!grid) return;

  grid.innerHTML = trainers.map(t => `
    <div class="trainer-card" data-spec="${t.specialization}" onclick="window.location.href='trainer-profile.html?id=${t.id}'">
      <div class="trainer-card-img-wrap">
        <img class="trainer-card-img" src="${TRAINER_PHOTOS[t.id] || ''}" alt="${t.name}" loading="lazy"/>
        <div class="trainer-card-overlay">
          <h3>${t.name}</h3>
          <span class="trainer-spec">${t.specialization}</span>
        </div>
      </div>
      <div class="trainer-card-body">
        <p>${t.bio}</p>
        <p class="trainer-view-more">View Profile →</p>
      </div>
    </div>
  `).join('');
}

/* ── Filter ── */
document.addEventListener('DOMContentLoaded', () => {
  loadTrainers();
  buildGallery();
  setupFilterBtns();
  setupBranchTabs();
  setupLightbox();
  setupModal();
});

function setupFilterBtns() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.trainer-card').forEach(card => {
        if (filter === 'all' || card.dataset.spec === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ─────────────────────────────────────────
   TRAINER MODAL
───────────────────────────────────────── */
function openTrainerModal(id) {
  const trainer = trainersData.find(t => t.id === id);
  if (!trainer) return;

  document.getElementById('modalImg').src    = TRAINER_PHOTOS[id] || '';
  document.getElementById('modalImg').alt    = trainer.name;
  document.getElementById('modalName').textContent  = trainer.name;
  document.getElementById('modalBio').textContent   = trainer.bio;
  document.getElementById('modalBadge').textContent = trainer.specialization;

  const certsEl = document.getElementById('modalCerts');
  certsEl.innerHTML = trainer.certifications
    .map(c => `<span class="cert-tag">${c}</span>`)
    .join('');

  document.getElementById('trainerModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function setupModal() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', closeModal);
}

function closeModal() {
  document.getElementById('trainerModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────
   GALLERY
───────────────────────────────────────── */
let currentGalleryIndex = 0;

function buildGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = GALLERY_ITEMS.map((item, i) => `
    <div class="gallery-item" onclick="openLightbox(${i})">
      <img src="${item.src}" alt="${item.caption}" loading="lazy"/>
      <div class="gallery-item-overlay">
        <span class="gallery-expand-icon">⊕</span>
      </div>
    </div>
  `).join('');
}

/* ── Lightbox ── */
function setupLightbox() {
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));

  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  });
}

function openLightbox(index) {
  currentGalleryIndex = index;
  updateLightboxImage();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentGalleryIndex = (currentGalleryIndex + direction + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const item = GALLERY_ITEMS[currentGalleryIndex];
  const img  = document.getElementById('lightboxImg');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = item.src;
    img.alt = item.caption;
    document.getElementById('lightboxCaption').textContent = item.caption;
    img.style.opacity = '1';
    img.style.transition = 'opacity 0.3s ease';
  }, 150);
}

/* ─────────────────────────────────────────
   BRANCH MAP TABS
───────────────────────────────────────── */
function setupBranchTabs() {
  document.querySelectorAll('.branch-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.branch-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const branch = BRANCHES[tab.dataset.branch];
      document.getElementById('mapFrame').src = branch.mapSrc;
      document.getElementById('branchInfo').innerHTML = `
        <div class="branch-detail">
          <h4>${branch.label}</h4>
          <p>📍 ${branch.address}</p>
          <p>⏰ ${branch.hours}</p>
          <p>📞 ${branch.phone}</p>
        </div>
      `;
    });
  });
}
