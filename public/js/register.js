const registerHormHandler = async function (event) {
    event.preventDefault();
    const usernameEl = document.querySelector('#username-input-register').value.trim();
    const passwordEl = document.querySelector('#password-input-register').value.trim();

    if (passwordEl.length >= 10 && usernameEl) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username: usernameEl,
                passwprd: passwordEl,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Registration failed, do better');
        }
    } else {
        alert('You need a username AND a password, and your password needs to be at least 10 character long');
    }
};

document.querySelector('#register-form').addEventListener('submit', registerHormHandler);