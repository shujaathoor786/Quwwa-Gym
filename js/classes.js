/* ============================================================
   QUWWA GYM — Lesson 2 Classes JavaScript
   This lesson loads class cards from a JSON file.
   ============================================================ */

// This array will store all class objects after they load from JSON.
let allClasses = [];

// This finds the grid where class cards will be displayed.
const classesGrid = document.getElementById("classesGrid");

// This finds the paragraph that shows the class count.
const classCount = document.getElementById("classCount");

// This finds the class type filter dropdown.
const typeFilter = document.getElementById("typeFilter");

// This finds the booking form class dropdown.
const classChoice = document.getElementById("classChoice");

// This finds the booking form.
const bookingForm = document.getElementById("bookingForm");

// This finds the paragraph used for the simple form message.
const formMessage = document.getElementById("formMessage");

// This starts loading data as soon as the script runs.
loadClasses();

// This listens for the booking form submit event.
bookingForm.addEventListener("submit", function (event) {
  // This stops the browser from refreshing the page.
  event.preventDefault();

  // This shows a simple message for Lesson 2.
  formMessage.textContent = "Button clicked. Full validation will be added in a later lesson.";
});

// This function loads classes from the JSON file.
async function loadClasses() {
  // This try block handles possible loading errors.
  try {
    // This asks the browser to load the JSON file.
    const response = await fetch("data/classes.json");

    // This checks if the file failed to load.
    if (response.ok === false) {
      // This creates an error when the file is not available.
      throw new Error("Could not load classes.json");
    }

    // This converts the JSON text into JavaScript objects.
    allClasses = await response.json();

    // This creates the class cards from the data.
    renderClassCards();

    // This fills the class type dropdown from the data.
    fillTypeFilter();

    // This fills the booking class dropdown from the data.
    fillClassChoice();
  } catch (error) {
    // This shows a friendly message if loading fails.
    classCount.textContent = "The class data could not be loaded.";

    // This clears the grid if there is an error.
    classesGrid.innerHTML = "";
  }
}

// This function creates all class cards.
function renderClassCards() {
  // This clears old cards before adding new cards.
  classesGrid.innerHTML = "";

  // This updates the text above the class cards.
  classCount.textContent = "Showing " + allClasses.length + " class(es) loaded from JSON.";

  // This loop runs once for every class object.
  allClasses.forEach(function (gymClass) {
    // This creates the outer card element.
    const card = document.createElement("article");

    // This adds the existing QUWWA card classes.
    card.className = "card class-card";

    // This creates the image area.
    const image = document.createElement("div");

    // This adds the CSS class for image sizing.
    image.className = "class-image";

    // This sets the card image from the JSON file.
    image.style.backgroundImage = "url('" + gymClass.image + "')";

    // This creates the card body wrapper.
    const body = document.createElement("div");

    // This adds the shared card body class.
    body.className = "card-body";

    // This creates the class type badge.
    const badge = document.createElement("span");

    // This adds existing QUWWA badge styles.
    badge.className = "badge badge-red";

    // This puts the class type inside the badge.
    badge.textContent = gymClass.type;

    // This creates the class name heading.
    const title = document.createElement("h3");

    // This puts the class name inside the heading.
    title.textContent = gymClass.name;

    // This creates the level paragraph.
    const level = document.createElement("p");

    // This writes the level text.
    level.innerHTML = "<strong>Level:</strong> " + gymClass.level;

    // This creates the duration paragraph.
    const duration = document.createElement("p");

    // This writes the duration text.
    duration.innerHTML = "<strong>Duration:</strong> " + gymClass.duration + " minutes";

    // This creates the trainer paragraph.
    const trainer = document.createElement("p");

    // This writes the trainer text.
    trainer.innerHTML = "<strong>Trainer:</strong> " + gymClass.trainer;

    // This creates the description paragraph.
    const description = document.createElement("p");

    // This writes the description text safely as normal text.
    description.textContent = gymClass.description;

    // This adds the badge to the card body.
    body.appendChild(badge);

    // This adds the title to the card body.
    body.appendChild(title);

    // This adds the level to the card body.
    body.appendChild(level);

    // This adds the duration to the card body.
    body.appendChild(duration);

    // This adds the trainer to the card body.
    body.appendChild(trainer);

    // This adds the description to the card body.
    body.appendChild(description);

    // This adds the image area to the card.
    card.appendChild(image);

    // This adds the body area to the card.
    card.appendChild(body);

    // This adds the finished card to the grid.
    classesGrid.appendChild(card);
  });
}

// This function fills the filter dropdown with unique class types.
function fillTypeFilter() {
  // This array will store class types without duplicates.
  const classTypes = [];

  // This loop checks every loaded class.
  allClasses.forEach(function (gymClass) {
    // This checks if the class type is not already saved.
    if (classTypes.includes(gymClass.type) === false) {
      // This adds the new class type to the array.
      classTypes.push(gymClass.type);
    }
  });

  // This loop creates one dropdown option for each class type.
  classTypes.forEach(function (type) {
    // This creates a new option element.
    const option = document.createElement("option");

    // This sets the option value.
    option.value = type;

    // This sets the visible option text.
    option.textContent = type;

    // This adds the option to the filter dropdown.
    typeFilter.appendChild(option);
  });
}

// This function fills the booking form class dropdown.
function fillClassChoice() {
  // This loop creates one dropdown option for each class.
  allClasses.forEach(function (gymClass) {
    // This creates a new option element.
    const option = document.createElement("option");

    // This sets the option value to the class id.
    option.value = gymClass.id;

    // This shows the class name to the user.
    option.textContent = gymClass.name;

    // This adds the option to the booking dropdown.
    classChoice.appendChild(option);
  });
}

