document.addEventListener("DOMContentLoaded", ()=>{
  const params = new URLSearchParams(window.location.search)
  const messageContainer = document.getElementById("displayMessage")
 
  const message = params.get("message")
  const status = params.get("status")
 console.log(message);
 console.log(status);
 if(message){
   if(status==="success"){
    messageContainer.style.color='green'
   }else{
    messageContainer.style.color='red'
   }
   messageContainer.innerText = message
   setTimeout(()=>{
    messageContainer.innerText = ''
   }, 3000)
 }

})