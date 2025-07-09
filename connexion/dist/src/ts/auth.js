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
    if (login_modal && (register_modal === null || register_modal === void 0 ? void 0 : register_modal.classList.contains('hidden'))) {
        login_modal.classList.remove('hidden');
    }
});
const btn_close_login = document.getElementById('btn-close-login');
btn_close_login === null || btn_close_login === void 0 ? void 0 : btn_close_login.addEventListener('click', () => {
    if (login_modal) {
        login_modal.classList.add('hidden');
    }
});
function loginUser(login, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!login || !password) {
        alert('Empty Inputs');
        return false;
    }
    const user = users.find(user => user.login === login);
    if (!user) {
        alert('User Not Found');
        return false;
    }
    if (user.password !== password) {
        alert('Incorrect Password');
        return false;
    }
    console.log("Succes Login");
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
}
const loginForm = document.getElementById('login-form');
loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input_login_login = document.getElementById('input-login-login').value;
    const input_login_password = document.getElementById('input-login-password').value;
    if (loginUser(input_login_login, input_login_password)) {
        alert("Succes login");
        window.location.href = 'home.html';
    }
});
btn_register === null || btn_register === void 0 ? void 0 : btn_register.addEventListener('click', () => {
    if (register_modal && (login_modal === null || login_modal === void 0 ? void 0 : login_modal.classList.contains('hidden'))) {
        register_modal.classList.remove('hidden');
    }
});
const btn_close_register = document.getElementById('btn-close-register');
btn_close_register === null || btn_close_register === void 0 ? void 0 : btn_close_register.addEventListener('click', () => {
    if (register_modal) {
        register_modal.classList.add('hidden');
    }
});
function registerUser(login, password, confirm_password) {
    if (!login || !password || !confirm_password) {
        alert('Empty Inputs');
        return false;
    }
    if (password != confirm_password) {
        alert('Password and confirm password are differents');
        return false;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some(user => user.login === login);
    if (userExists) {
        alert('User already exists');
        return false;
    }
    const newUser = { login, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}
const registerForm = document.getElementById('register-form');
registerForm === null || registerForm === void 0 ? void 0 : registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input_register_login = document.getElementById('input-register-login').value;
    const input_register_password = document.getElementById('input-register-password').value;
    const input_register_confirm_password = document.getElementById('input-register-confirm-password').value;
    if (registerUser(input_register_login, input_register_password, input_register_confirm_password)) {
        alert('Succes register');
        clearInputs('register-form');
        register_modal === null || register_modal === void 0 ? void 0 : register_modal.classList.add('hidden');
    }
});
