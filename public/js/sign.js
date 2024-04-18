function togglePasswordVisibility(inputId) {
  var input = document.getElementById(inputId);
  var icon = input.nextElementSibling;
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("ri-eye-line");
    icon.classList.add("ri-eye-close-line");
  } else {
    input.type = "password";
    icon.classList.remove("ri-eye-close-line");
    icon.classList.add("ri-eye-line");
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('enter-chat');
  const displayMessage = document.getElementById('displayMessage');
  const passwordInput = document.getElementById('password');
  const repPasswordInput = document.getElementById('rep-password');

  form.addEventListener('submit', function(event) {
      if (passwordInput.value !== repPasswordInput.value) {
          event.preventDefault();
          displayMessage.textContent = "Passwords don't Match";
          displayMessage.style.color = 'red';
      } else {
          displayMessage.textContent = '';
      }
  });
});
