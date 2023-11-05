const modal = document.getElementById("calendarModal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModalButton");
const confirmButton = document.getElementById("confirmButton");
const confirmationMessage = document.getElementById("confirmationMessage");
const currentMonthDisplay = document.getElementById("currentMonth");
const monthSelector = document.getElementById("monthSelector");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const meetingList = document.getElementById("meetingList");
let selectedMeeting = null;
let currentDate = new Date(2023, 10); // November 2023 (JavaScript months are zero-based);
let meetingsByMonth = {
  "2023-11": [
    { meeting: "Meeting 1", date: "2023-11-10" },
    { meeting: "Meeting 2", date: "2023-11-15" },
    { meeting: "Meeting 3", date: "2023-11-20" },
  ],
  "2023-12": [
    { meeting: "Meeting 4", date: "2023-12-5" },
  ],
  "2024-01": [
    { meeting: "Meeting 5", date: "2024-01-10" },
  ],
};

openModalButton.addEventListener("click", () => {
  modal.style.display = "block";
  updateMeetingList();
});

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

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

function addPreviousMonthButton() {
  const prevMonthButtonExists = document.getElementById("prevMonth");
  if (!prevMonthButtonExists) {
    const prevMonthButton = document.createElement("button");
    prevMonthButton.textContent = "Previous Month";
    prevMonthButton.id = "prevMonth";
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

function selectMeeting(meetingItem) {
  if (selectedMeeting) {
    selectedMeeting.classList.remove("selected");
  }
  selectedMeeting = meetingItem;
  selectedMeeting.classList.add("selected");
  confirmButton.style.display = "block";
}

confirmButton.addEventListener("click", () => {
  if (selectedMeeting) {
    const confirmationMessageText = `You have confirmed: ${selectedMeeting.textContent}`;
    confirmationMessage.textContent = confirmationMessageText;
    confirmationMessage.style.display = "block";
    modal.style.display = "none";
  }
});

function updateMeetingList() {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentMonthString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}`;
  const isCurrentMonth = currentMonthString === new Date().toISOString().substr(0, 7);

  currentMonthDisplay.textContent = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

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