/* ============================================================
   QUWWA GYM — Trainers & Gallery JS
   Person 3
   ============================================================ */

/* ── Trainer photos (Unsplash) ── */
const TRAINER_PHOTOS = {
  1: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80', // Sara
  2: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80', // Mike
  3: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', // Layla
  4: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80', // Omar
};

/* ── Gallery images (Unsplash) ── */
const GALLERY_ITEMS = [
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80',  caption: 'Main Training Floor' },
  { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=700&q=80',  caption: 'Cardio Zone' },
  { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80',  caption: 'Weight Room' },
  { src: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=700&q=80',     caption: 'Boxing Ring' },
  { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80',     caption: 'Yoga Studio' },
  { src: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=700&q=80',  caption: 'Personal Training' },
  { src: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=700&q=80',  caption: 'Group Classes' },
  { src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&q=80',  caption: 'Rooftop Training Deck' },
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
    <div class="trainer-card" data-spec="${t.specialization}" onclick="openTrainerModal(${t.id})">
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
