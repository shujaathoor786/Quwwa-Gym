# QUWWA Gym — Group Project

## Team Structure
| Person | Pages | Key Files |
|--------|-------|-----------|
| Person 1 | Home (`index.html`) + About + Membership Plans | `css/home.css`, `js/home.js` |
| Person 2 | Classes (`classes.html`) + Schedule | `css/classes.css`, `js/classes.js` |
| Person 3 | Trainers (`trainers.html`) + Gallery | `css/trainers.css`, `js/trainers.js` |
| Person 4 | Contact (`contact.html`) + Reviews | `css/contact.css`, `js/contact.js` |

---

## File Structur
```
gym-website/
│
├── index.html          ← Person 1
├── classes.html        ← Person 2
├── trainers.html       ← Person 3
├── contact.html        ← Person 4
│
├── TEMPLATE.html       ← Copy this to start your page
│
├── css/
│   ├── shared.css      ← SHARED — do not edit without group agreement
│   ├── home.css        ← Person 1 only
│   ├── classes.css     ← Person 2 only
│   ├── trainers.css    ← Person 3 only
│   └── contact.css     ← Person 4 only
│
├── js/
│   ├── shared.js       ← SHARED — do not edit without group agreement
│   ├── home.js         ← Person 1 only
│   ├── classes.js      ← Person 2 only
│   ├── trainers.js     ← Person 3 only
│   └── contact.js      ← Person 4 only
│
├── data/
│   ├── gym-data.json   ← SHARED data file — read by everyone
│   ├── bookings.json   ← Created automatically when bookings are submitted
│   └── feedback.json   ← Created automatically when feedback is submitted
│
├── images/             ← Put all images here
│
└── server.js           ← Node.js backend — one person runs this
```

---

## How to Start Your Page
1. Copy `TEMPLATE.html` → rename it (e.g. `classes.html`)
2. Change the `<title>` tag
3. Add your page-specific CSS in `css/your-page.css`
4. Add your page-specific JS in `js/your-page.js`
5. Use `fetchAPI('endpoint')` to get data from the server
6. OR use `loadJSON('data/gym-data.json')` to read the JSON file directly

---

## Available API Endpoints
| Method | URL | Who uses it |
|--------|-----|-------------|
| GET | `/api/gym` | Person 1 |
| GET | `/api/history` | Person 1 |
| GET | `/api/awards` | Person 1 |
| GET | `/api/memberships` | Person 1 |
| GET | `/api/classes` | Person 2 |
| GET | `/api/classes?type=Cardio` | Person 2 |
| GET | `/api/schedule` | Person 2 |
| POST | `/api/bookings` | Person 2 |
| GET | `/api/trainers` | Person 3 |
| GET | `/api/trainers?specialization=Yoga` | Person 3 |
| GET | `/api/testimonials` | Person 4 |
| GET | `/api/faqs` | Person 4 |
| POST | `/api/feedback` | Person 4 |

---

## Running the Project
```bash
# Install dependencies (only once)
npm install express cors

# Start the server
node server.js

# Open in browser
http://localhost:3000/index.html
```

---

## Shared CSS Classes (use these in your HTML)
| Class | What it does |
|-------|-------------|
| `.container` | Centered max-width wrapper |
| `.btn .btn-primary` | Red gradient button |
| `.btn .btn-outline` | Outlined red button |
| `.card` | White card with hover effect |
| `.section-alt` | Light grey background section |
| `.section-title` | Centered heading |
| `.section-subtitle` | Centered subtext |
| `.divider` | Red gradient horizontal line |
| `.badge-red/orange/grey` | Colored badge pill |
| `.form-group` | Form field wrapper with label |

---

## Color Palette
| Variable | Value | Use |
|----------|-------|-----|
| `--red` | #E8320A | Primary accent |
| `--orange` | #FF6B2B | Secondary accent |
| `--black` | #111111 | Headings |
| `--mid` | #444444 | Body text |
| `--light-grey` | #F5F5F5 | Alt backgrounds |
| `--white` | #FFFFFF | Default background |

## Fonts
- **Display (headings):** Bebas Neue
- **Body:** DM Sans
