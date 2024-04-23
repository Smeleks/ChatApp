const socket = io();

// Get token from URL search parameters
const params = new URLSearchParams(window.location.search);
const token = params.get("token");

// Save token to localStorage if present
if (token) {
  localStorage.setItem("token", token);
}

// Set room name in UI when joined
socket.on("roomJoined", (room) => {
  const roomElement = document.getElementById('room-name');
  if (roomElement) {
    roomElement.textContent = room;
  }
});

// Redirect if token is not valid or missing
const tokenInStorage = localStorage.getItem("token");
if (tokenInStorage === "null") {
  const message = "You are not authorized to access this page.";
  window.location.href = `../index.html?message=${message}&status=fail`;
}

// Elements from the DOM
const chatForm = document.getElementById("chat-form");
const messagesContainer = document.querySelector(".chat-messages");

// Function to display a message in the UI
function outputMsg(data) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="nickname">${data.username}</p>
                  <p class="text">${data.message}</p>
                  <span class="time">${data.time}</span>`;
  messagesContainer.appendChild(div);
}

// Submit new message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
  socket.emit("chatMsg", { msg, token });
});

// Receive and display messages
socket.on("message", (data) => {
  const currentTokenInStorage = localStorage.getItem("token");
  if (!currentTokenInStorage) {
    const message = "You are not authorized to access this page.";
    return (window.location.href = `../index.html?message=${message}&status=fail`);
  }
  outputMsg(data);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Leave chat confirmation
document.getElementById("leave-btn").addEventListener("click", () => {
  const conf = confirm("Are you sure, you want to leave the chat?");
  if (conf) {
    window.location.href = "../";
  }
});

// Emit join room event
socket.emit("joinRoom", token);

// Update room and users in UI
const roomName = document.getElementById("room-name");
const usersList = document.getElementById("users");

const outputRoom = (room) => {
  roomName.innerText = room;
};

const outputUsers = (users) => {
  usersList.innerHTML = `${users.map((user) => `<li>${user.username}</li>`).join("")}`;
};

socket.on("usersInRoom", (data) => {
  outputRoom(data.room);
  outputUsers(data.usersList);
});