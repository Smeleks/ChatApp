const socket = io();
const container = document.querySelector(".chat-messages");

socket.on('message', (data) => {
    outputMsg(data);
    container.scrollTop = container.scrollHeight;
});

const chatForm = document.getElementById("chat-form");

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.target.elements.msg.value) {
        let message = event.target.elements.msg.value;
        event.target.elements.msg.value = "";
        socket.emit("chat-msg", message);
    }
    else {
        alert("Please write a message before sending");
    }
});


function outputMsg(data) {

    const div = document.createElement('div');

    div.classList.add('message');

    div.innerHTML = `<p class='meta'>${data.username}
    <span>${data.time}</span></p><p class='text'>${data.message}</p>`;
    container.appendChild(div);

}
