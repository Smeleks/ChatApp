fetch('/users.json')
    .then(response => response.json())
    .then(data => {
        const currentUser = data[data.length - 1];
        const avatarPath = currentUser.avatar;
        document.getElementById('user-avatar').src = avatarPath;
    })
    .catch(error => console.error('Error loading avatar:', error));