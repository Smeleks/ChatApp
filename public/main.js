const socket = io();

socket.on('message', (scoketData) => {
    console.log(scoketData);
});

const chatForm = document.getElementById('chat-form');

function outputMsg (m){ 
	const div = document.createElement('div') 
	const container = document.querySelector(".chat-messages"); 	
    div.classList.add('message');
	
    div.innerHTML = `<p class='meta'>John 	<span>12:20pm</span></p><p class='text'>${m}</p>`; 	container.appendChild(div) ;

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = e.target.elements.msg.value;
        e.target.elements.msg.value = '';
        socket.emit('chatMsg', msg)
    });
    
    socket.on('message', (scoketData) => {
        outputMsg(scoketData);
    });
};

