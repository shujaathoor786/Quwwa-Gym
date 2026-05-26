// ============================================================
//  QUWWA GYM — Node.js Backend Server
//  Run with: node server.js
//  Requires: npm install express cors
// ============================================================

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = 3000;

// ---------- Middleware ----------
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // serve all HTML/CSS/JS files

// ---------- Load JSON data ----------
const dataPath = path.join(__dirname, 'data', 'gym-data.json');
let gymData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// If using MySQL instead of JSON, replace gymData reads with DB queries.
// Each team member adds their own routes below.

// ============================================================
//  PERSON 1 ROUTES — Home / About / Membership
// ============================================================

// GET gym info (name, tagline, branches)
app.get('/api/gym', (req, res) => {
  res.json(gymData.gym);
});

// GET company history timeline
app.get('/api/history', (req, res) => {
  res.json(gymData.history);
});

// GET awards & achievements
app.get('/api/awards', (req, res) => {
  res.json(gymData.awards);
});

// GET membership plans
app.get('/api/memberships', (req, res) => {
  res.json(gymData.memberships);
});

// ============================================================
//  PERSON 2 ROUTES — Classes & Schedule
// ============================================================

// GET all classes (optional ?type=Cardio filter)
app.get('/api/classes', (req, res) => {
  let classes = gymData.classes;
  if (req.query.type) {
    classes = classes.filter(c => c.type.toLowerCase() === req.query.type.toLowerCase());
  }
  res.json(classes);
});

// GET weekly schedule
app.get('/api/schedule', (req, res) => {
  res.json(gymData.schedule);
});

// POST class booking/interest form — saves to bookings.json
app.post('/api/bookings', (req, res) => {
  const { name, email, phone, classId, message } = req.body;
  if (!name || !email || !classId) {
    return res.status(400).json({ error: 'name, email and classId are required.' });
  }
  const booking = { id: Date.now(), name, email, phone, classId, message, date: new Date().toISOString() };

  // Append to bookings.json
  const bPath = path.join(__dirname, 'data', 'bookings.json');
  let bookings = [];
  if (fs.existsSync(bPath)) bookings = JSON.parse(fs.readFileSync(bPath, 'utf-8'));
  bookings.push(booking);
  fs.writeFileSync(bPath, JSON.stringify(bookings, null, 2));

  res.status(201).json({ success: true, message: 'Booking received!', booking });
});

// ============================================================
//  PERSON 3 ROUTES — Trainers & Gallery
// ============================================================

// GET all trainers (optional ?specialization=Yoga filter)
app.get('/api/trainers', (req, res) => {
  let trainers = gymData.trainers;
  if (req.query.specialization) {
    trainers = trainers.filter(t => t.specialization.toLowerCase() === req.query.specialization.toLowerCase());
  }
  res.json(trainers);
});

// ============================================================
//  PERSON 4 ROUTES — Contact & Reviews
// ============================================================

// GET all testimonials
app.get('/api/testimonials', (req, res) => {
  res.json(gymData.testimonials);
});

// GET FAQs
app.get('/api/faqs', (req, res) => {
  res.json(gymData.faqs);
});

// POST feedback/review form — saves to feedback.json
app.post('/api/feedback', (req, res) => {
  const { name, email, rating, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required.' });
  }
  const entry = { id: Date.now(), name, email, rating: Number(rating) || 5, message, date: new Date().toISOString() };

  // Append to feedback.json
  const fPath = path.join(__dirname, 'data', 'feedback.json');
  let feedback = [];
  if (fs.existsSync(fPath)) feedback = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
  feedback.push(entry);
  fs.writeFileSync(fPath, JSON.stringify(feedback, null, 2));

  res.status(201).json({ success: true, message: 'Feedback received!', entry });
});

// ============================================================
//  Start server
// ============================================================
app.listen(PORT, () => {
  console.log(`QUWWA server running at http://localhost:${PORT}`);
});
