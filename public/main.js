const socket = io();

socket.on('message', (serverData)=>{
    console.log(serverData);
});