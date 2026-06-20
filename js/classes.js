/* ============================================================
   QUWWA GYM — Classes JavaScript
   Finished student version: JSON, filter, schedule, validation.
   ============================================================ */

// This array will store all class objects after they load from JSON.
let allClasses = [];

// This array stores weekdays in the order we want to display them.
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// This finds the grid where class cards will be displayed.
const classesGrid = document.getElementById("classesGrid");

// This finds the paragraph that shows the class count.
const classCount = document.getElementById("classCount");

// This finds the class type filter dropdown.
const typeFilter = document.getElementById("typeFilter");

// This finds the button that clears the filter.
const clearFilterButton = document.getElementById("clearFilter");

// This finds the schedule table body.
const scheduleBody = document.getElementById("scheduleBody");

// This finds the paragraph above the schedule table.
const scheduleNote = document.getElementById("scheduleNote");

// This finds the booking form class dropdown.
const classChoice = document.getElementById("classChoice");

// This finds the booking form.
const bookingForm = document.getElementById("bookingForm");

// This finds the paragraph used for the form success message.
const formMessage = document.getElementById("formMessage");

// This starts loading data as soon as the script runs.
loadClasses();

// This listens for a change in the class type filter.
typeFilter.addEventListener("change", function () {
  // This redraws the class cards using the selected filter.
  renderClassCards();

  // This redraws the schedule using the selected filter.
  renderSchedule();
});

// This listens for clicks on the Clear button.
clearFilterButton.addEventListener("click", function () {
  // This resets the dropdown back to all classes.
  typeFilter.value = "All";

  // This redraws the class cards after clearing the filter.
  renderClassCards();

  // This redraws the schedule after clearing the filter.
  renderSchedule();
});

// This listens for the booking form submit event.
bookingForm.addEventListener("submit", function (event) {
  // This stops the browser from refreshing the page.
  event.preventDefault();

  // This clears the old success message.
  formMessage.textContent = "";

  // This validates the form and stores true or false.
  const formIsValid = validateForm();

  // This if statement runs only when the form is valid.
  if (formIsValid === true) {
    // This shows a simple success message.
    formMessage.textContent = "Thank you! Your interest form has been checked successfully.";

    // This clears the form fields after successful validation.
    bookingForm.reset();
  }
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

    // This fills the class type dropdown from the data.
    fillTypeFilter();

    // This fills the booking class dropdown from the data.
    fillClassChoice();

    // This creates the class cards from the data.
    renderClassCards();

    // This creates the schedule from the data.
    renderSchedule();
  } catch (error) {
    // This shows a friendly message if loading fails.
    classCount.textContent = "The class data could not be loaded.";

    // This clears the grid if there is an error.
    classesGrid.innerHTML = "";

    // This shows a friendly schedule error.
    scheduleNote.textContent = "The schedule could not be loaded.";

    // This clears the schedule table.
    scheduleBody.innerHTML = "";
  }
}

// This function returns the classes that match the current dropdown value.
function getVisibleClasses() {
  // This stores the currently selected type.
  const selectedType = typeFilter.value;

  // This returns all classes when the user selects all types.
  if (selectedType === "All") {
    // This gives back every class.
    return allClasses;
  }

  // This gives back only classes that match the selected type.
  return allClasses.filter(function (gymClass) {
    // This checks one class type.
    return gymClass.type === selectedType;
  });
}

// This function creates class cards.
function renderClassCards() {
  // This gets the classes that should currently be shown.
  const visibleClasses = getVisibleClasses();

  // This clears old cards before adding new cards.
  classesGrid.innerHTML = "";

  // This updates the text above the class cards.
  classCount.textContent = "Showing " + visibleClasses.length + " class(es).";

  // This if statement handles the case where no classes match.
  if (visibleClasses.length === 0) {
    // This shows a simple no-results message.
    classesGrid.innerHTML = "<p>No classes match this filter.</p>";

    // This stops the function because there are no cards to draw.
    return;
  }

  // This loop runs once for every visible class object.
  visibleClasses.forEach(function (gymClass) {
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

// This function creates the weekly schedule table.
function renderSchedule() {
  // This gets the classes that should currently be included in the schedule.
  const visibleClasses = getVisibleClasses();

  // This clears old schedule rows.
  scheduleBody.innerHTML = "";

  // This starts a counter for the number of schedule rows.
  let scheduleRowCount = 0;

  // This loop goes through every weekday in order.
  weekDays.forEach(function (day) {
    // This array stores sessions for the current day.
    const sessionsForDay = [];

    // This loop checks every visible class.
    visibleClasses.forEach(function (gymClass) {
      // This loop checks every schedule item for the current class.
      gymClass.schedule.forEach(function (session) {
        // This checks if this session is on the current day.
        if (session.day === day) {
          // This stores the session together with class information.
          sessionsForDay.push({
            day: day,
            time: session.time,
            className: gymClass.name,
            type: gymClass.type,
            room: session.room
          });
        }
      });
    });

    // This sorts the current day's sessions by time.
    sessionsForDay.sort(function (firstSession, secondSession) {
      // This compares time strings like 07:00 and 19:00.
      return firstSession.time.localeCompare(secondSession.time);
    });

    // This loop creates a table row for each session.
    sessionsForDay.forEach(function (session) {
      // This creates one table row.
      const row = document.createElement("tr");

      // This writes the row cells.
      row.innerHTML =
        "<td>" + session.day + "</td>" +
        "<td>" + session.time + "</td>" +
        "<td>" + session.className + "</td>" +
        "<td>" + session.type + "</td>" +
        "<td>" + session.room + "</td>";

      // This adds the row to the table.
      scheduleBody.appendChild(row);

      // This increases the schedule row counter.
      scheduleRowCount = scheduleRowCount + 1;
    });
  });

  // This updates the text above the schedule.
  scheduleNote.textContent = "Showing " + scheduleRowCount + " scheduled class time(s).";

  // This if statement handles a filter with no schedule rows.
  if (scheduleRowCount === 0) {
    // This creates one empty message row.
    scheduleBody.innerHTML = "<tr><td colspan='5'>No scheduled classes match this filter.</td></tr>";
  }
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

// This function validates the booking form.
function validateForm() {
  // This starts by assuming the form is valid.
  let isValid = true;

  // This clears old error messages.
  clearErrors();

  // This reads the name field and removes extra spaces.
  const name = document.getElementById("studentName").value.trim();

  // This reads the email field and removes extra spaces.
  const email = document.getElementById("studentEmail").value.trim();

  // This reads the phone field and removes extra spaces.
  const phone = document.getElementById("studentPhone").value.trim();

  // This reads the selected class.
  const selectedClass = document.getElementById("classChoice").value;

  // This reads the selected day.
  const selectedDay = document.getElementById("dayChoice").value;

  // This reads the message and removes extra spaces.
  const message = document.getElementById("studentMessage").value.trim();

  // This checks if the name is too short.
  if (name.length < 2) {
    // This shows a name error.
    showError("nameError", "Please enter your full name.");

    // This marks the form as invalid.
    isValid = false;
  }

  // This checks for a simple email shape.
  if (email.includes("@") === false || email.includes(".") === false) {
    // This shows an email error.
    showError("emailError", "Please enter a valid email address.");

    // This marks the form as invalid.
    isValid = false;
  }

  // This checks if the phone number is too short.
  if (phone.length < 7) {
    // This shows a phone error.
    showError("phoneError", "Please enter a phone number with at least 7 characters.");

    // This marks the form as invalid.
    isValid = false;
  }

  // This checks if no class was selected.
  if (selectedClass === "") {
    // This shows a class error.
    showError("classError", "Please choose a class.");

    // This marks the form as invalid.
    isValid = false;
  }

  // This checks if no day was selected.
  if (selectedDay === "") {
    // This shows a day error.
    showError("dayError", "Please choose a preferred day.");

    // This marks the form as invalid.
    isValid = false;
  }

  // This checks if the message is too short.
  if (message.length < 10) {
    // This shows a message error.
    showError("messageError", "Please write at least 10 characters.");

    // This marks the form as invalid.
    isValid = false;
  }

  // This returns true or false to the submit event.
  return isValid;
}

// This function clears all form error messages.
function clearErrors() {
  // This clears the name error.
  document.getElementById("nameError").textContent = "";

  // This clears the email error.
  document.getElementById("emailError").textContent = "";

  // This clears the phone error.
  document.getElementById("phoneError").textContent = "";

  // This clears the class error.
  document.getElementById("classError").textContent = "";

  // This clears the day error.
  document.getElementById("dayError").textContent = "";

  // This clears the message error.
  document.getElementById("messageError").textContent = "";
}

// This function shows one error message.
function showError(elementId, message) {
  // This finds the error paragraph by id.
  const errorElement = document.getElementById(elementId);

  // This puts the message inside the paragraph.
  errorElement.textContent = message;
}
