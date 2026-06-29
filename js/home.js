// ===============================
// QUWWA GYM - Home Page JavaScript
// Person 1
// ===============================

document.addEventListener("DOMContentLoaded", loadHomePage);

async function loadHomePage() {

    // Load data from gym-data.json
    const data = await loadJSON("data/gym-data.json");

    if (!data) {
        console.error("Could not load gym-data.json");
        return;
    }

    loadHistory(data.history);
    loadAwards(data.awards);
    loadMemberships(data.memberships);
}

// ===============================
// History Section
// ===============================
function loadHistory(history) {

    const container = document.getElementById("historyContainer");

    if (!container || !history) return;

    container.innerHTML = history.map(item => `
        <div class="timeline-item">
            <h3>${item.year}</h3>
            <p>${item.event}</p>
        </div>
    `).join("");
}

// ===============================
// Awards Section
// ===============================
function loadAwards(awards) {

    const container = document.getElementById("awardsContainer");

    if (!container || !awards) return;

    container.innerHTML = awards.map(award => `
        <div class="card">
            <div class="card-body">
                <h3>${award.title}</h3>
                <p>${award.issuer}</p>
                <strong>${award.year}</strong>
            </div>
        </div>
    `).join("");
}

// ===============================
// Membership Section
// ===============================
function loadMemberships(memberships) {

    const container = document.getElementById("membershipContainer");

    if (!container || !memberships) return;

    container.innerHTML = memberships.map(plan => `
        <div class="card">
            <div class="card-body">
                <h3>${plan.name}</h3>

                <p class="price">
                    AED ${plan.price}
                </p>

                <p>${plan.period}</p>

                <ul>
                    ${plan.features.map(feature => `
                        <li>${feature}</li>
                    `).join("")}
                </ul>
            </div>
        </div>
    `).join("");
}
