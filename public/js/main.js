const socket = io();
const chatForm = document.getElementById("chat-form");

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

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

  div.innerHTML = `<p class='nickname'>${data.username}
<span class="time">${data.time}</span></p><p class='text'>${data.message}</p>`;
  container.appendChild(div);
}
socket.on("message", (data) => {
  outputMsg(data);
});

socket.emit('joinRoom', token);