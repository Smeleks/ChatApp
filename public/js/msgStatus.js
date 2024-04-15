document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const messageContainer = document.getElementById('displayMessage');
    const message = params.get('message');
    const status = params.get('status');

    console.log(status);
    console.log(message);

    if (message) {
        if (status === 'Success') {
            messageContainer.style.color = 'green';
        }
        else if (status === 'Fail') {
            messageContainer.style.color = 'red';
        }
        else {
            messageContainer.style.color = 'blue';
        }

        messageContainer.innerHTML = message;
        setTimeout(() => {
            messageContainer.innerText = '';
        }, 10000);
    }
});