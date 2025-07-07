"use strict";
function clearInputs(formId) {
    const form = document.getElementById(formId);
    form === null || form === void 0 ? void 0 : form.reset();
}
const btn_login = document.getElementById('btn-login');
const login_modal = document.getElementById('login-modal');
const btn_register = document.getElementById('btn-register');
const register_modal = document.getElementById('register-modal');
btn_login === null || btn_login === void 0 ? void 0 : btn_login.addEventListener('click', () => {
    if (login_modal) {
        login_modal.classList.remove('hidden');
        if (register_modal)
            register_modal.classList.add('hidden');
    }
});
const btn_close_login = document.getElementById('btn-close-login');
btn_close_login === null || btn_close_login === void 0 ? void 0 : btn_close_login.addEventListener('click', () => {
    if (login_modal)
        login_modal.classList.add('hidden');
});
function loginUser(login, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.login === login);
    if (!user) {
        alert('User Not Found');
        return false;
    }
    if (user.password !== password) {
        alert('Incorrect Password');
        return false;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (login_modal)
        login_modal.classList.add('hidden');
    alert("Success");
    return true;
}
const btn_send_login = document.getElementById('btn-send-login');
btn_send_login === null || btn_send_login === void 0 ? void 0 : btn_send_login.addEventListener('click', () => {
    const input_login_login = document.getElementById('input-login-login').value;
    const input_login_password = document.getElementById('input-login-password').value;
    if (loginUser(input_login_login, input_login_password)) {
        console.log("connexion");
    }
});
btn_register === null || btn_register === void 0 ? void 0 : btn_register.addEventListener('click', () => {
    if (register_modal) {
        register_modal.classList.remove('hidden');
        if (login_modal)
            login_modal.classList.add('hidden');
    }
});
const btn_close_register = document.getElementById('btn-close-register');
btn_close_register === null || btn_close_register === void 0 ? void 0 : btn_close_register.addEventListener('click', () => {
    if (register_modal)
        register_modal.classList.add('hidden');
});
function registerUser(login, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some(user => user.login === login);
    if (userExists) {
        alert('User already exists');
        return false;
    }
    const newUser = { login, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    if (register_modal)
        register_modal.classList.add('hidden');
    return true;
}
const btn_send_register = document.getElementById('btn-send-register');
btn_send_register === null || btn_send_register === void 0 ? void 0 : btn_send_register.addEventListener('click', () => {
    const input_register_login = document.getElementById('input-register-login').value;
    const input_register_password = document.getElementById('input-register-password').value;
    if (registerUser(input_register_login, input_register_password)) {
        alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
    }
});
