const modal = document.getElementById("calendarModal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModalButton");
const confirmButton = document.getElementById("confirmButton");
const confirmationMessage = document.getElementById("confirmationMessage");
const confirmationMessageModal = document.getElementById("confirmationMessageModal");
const currentMonthDisplay = document.getElementById("currentMonth");
const monthSelector = document.getElementById("monthSelector");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const meetingList = document.getElementById("meetingList");
const calendarList = document.getElementById("calendar-list");
let selectedMeeting = null;
let currentDate = new Date(2023, 10); // November 2023

// Initialising of the meetings

let meetingsByMonth = {
  "2023-11": [
    { meeting: "Ministerraad 1", date: "2023-11-10" },
    { meeting: "Ministerraad 2", date: "2023-11-17" },
    { meeting: "Ministerraad 3", date: "2023-11-24" },
  ],
  "2023-12": [
    { meeting: "Ministerraad 1", date: "2023-12-01" },
    { meeting: "Ministerraad 2", date: "2023-12-08" },
    { meeting: "Ministerraad 3", date: "2023-12-15" },
    { meeting: "Ministerraad 4", date: "2023-12-22" },
    { meeting: "Ministerraad 5", date: "2023-12-29" },
  ],
  "2024-01": [
    { meeting: "Ministerraad 1", date: "2024-01-05" },
    { meeting: "Ministerraad 2", date: "2024-01-12" },
    { meeting: "Ministerraad 3", date: "2024-01-19" },
    { meeting: "Ministerraad 4", date: "2024-01-26" },
  ],
};

// Open and close modal logic

openModalButton.addEventListener("click", () => {
  modal.style.display = "block";
  updateMeetingList();
});

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Loading of the meetings

function loadMeetingsForMonth(month) {
  const meetings = meetingsByMonth[month] || [];
  const meetingList = document.getElementById("meetingList");
  meetingList.innerHTML = "";
  meetings.forEach((meeting) => {
    const meetingItem = document.createElement("li");
    meetingItem.className = "meeting-item";
    meetingItem.textContent = `${meeting.meeting} - ${meeting.date}`;
    meetingItem.addEventListener("click", () => selectMeeting(meetingItem));
    meetingList.appendChild(meetingItem);
  });
}

// Adding previous button if not in the current month (all the meetings are planned in the future)

function addPreviousMonthButton() {
  const prevMonthButtonExists = document.getElementById("prevMonth");
  if (!prevMonthButtonExists) {
    const prevMonthButton = document.createElement("button");
    prevMonthButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous Month';
    prevMonthButton.id = "prevMonth";
    prevMonthButton.classList.add("link");
    prevMonthButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateMeetingList();
    });
    monthSelector.insertBefore(prevMonthButton, currentMonthDisplay);
  }
}

function removePreviousMonthButton() {
  const prevMonthButton = document.getElementById("prevMonth");
  if (prevMonthButton) {
    prevMonthButton.remove();
  }
}

// Select meeting behavior

function selectMeeting(meetingItem) {
  if (selectedMeeting) {
    selectedMeeting.classList.remove("selected");
  }
  selectedMeeting = meetingItem;
  selectedMeeting.classList.add("selected");
  confirmButton.style.display = "block";
}

// Display of the confirmation message

confirmButton.addEventListener("click", () => {
  if (selectedMeeting) {
    const confirmationMessageText = `You have successfully attached the dossier to: ${selectedMeeting.textContent}`;
    showConfirmationMessage(confirmationMessageText);
  }
});

function showConfirmationMessage(message) {
  // Hide the modal content
  calendarList.style.display = "none";

  // Display the confirmation message
  confirmationMessageModal.style.display = "flex";
  const confirmationDescription = document.querySelector(".confirmation-description");
  confirmationDescription.textContent = message;

  // Define the behavior of the "Go Back" button
  goBackButtonModal.addEventListener("click", () => {

  // Hide the confirmation message
  confirmationMessageModal.style.display = "none";

  // Show the calendar content
  calendarList.style.display = "block";
  });
}

// Meetings list update

function updateMeetingList() {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentMonthString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}`;
  const isCurrentMonth = currentMonthString === new Date().toISOString().substr(0, 7);

  currentMonthDisplay.textContent = new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long' });

  if (isCurrentMonth) {
    removePreviousMonthButton();
  } else {
    addPreviousMonthButton();
  }

  loadMeetingsForMonth(currentMonthString);
}

updateMeetingList();

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateMeetingList();
});

// Close the modal when clicking outside the content area

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
