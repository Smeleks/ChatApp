const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (token) {
  localStorage.setItem("token", token);
}

const socket = io();

socket.on("roomJoined", (room) => {
  const roomElement = document.getElementById('room-name');
  if (roomElement) {
    roomElement.textContent = room;
  }
});

const chatForm = document.getElementById("chat-form");
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
  socket.emit("chatMsg", msg);
});

function outputMsg(data) {
  const div = document.createElement("div");
  const container = document.querySelector(".chat-messages");
  div.classList.add("message");

  div.innerHTML = `<p class="nickname">${data.username}</p>
                  <p class="text">${data.message}</p>
                  <span class="time">${data.time}</span>`;
  container.appendChild(div);
}

socket.on("message", (data) => {
  outputMsg(data);
});

socket.emit("joinRoom", token);