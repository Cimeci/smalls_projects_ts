import { User } from './types';

function clearInputs(formId: string): void {
    const form = document.getElementById(formId) as HTMLFormElement;
    form?.reset();
}

const btn_login = document.getElementById('btn-login') as HTMLButtonElement;
const login_modal = document.getElementById('login-modal');
const btn_register = document.getElementById('btn-register') as HTMLButtonElement;
const register_modal = document.getElementById('register-modal');

btn_login?.addEventListener('click', () => {
    if (login_modal && (register_modal?.classList.contains('hidden'))) {
        login_modal.classList.remove('hidden');
    }
});

const btn_close_login = document.getElementById('btn-close-login') as HTMLButtonElement;
btn_close_login?.addEventListener('click', (e) => {
    e.preventDefault();
    if (login_modal) {
        login_modal.classList.add('hidden');
    }
});

function loginUser(login: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

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

const loginForm = document.getElementById('login-form') as HTMLFormElement;
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input_login_login = (document.getElementById('input-login-login') as HTMLInputElement).value;
    const input_login_password = (document.getElementById('input-login-password') as HTMLInputElement).value;

    if (loginUser(input_login_login, input_login_password)) {
        // alert("Succes login");
        window.location.href = 'home.html';
    }
});

btn_register?.addEventListener('click', () => {
    if (register_modal && (login_modal?.classList.contains('hidden'))) {
        register_modal.classList.remove('hidden');
    }
});

const btn_close_register = document.getElementById('btn-close-register') as HTMLButtonElement;
btn_close_register?.addEventListener('click', (e) => {
    e.preventDefault();
    if (register_modal) {
        register_modal.classList.add('hidden');
    }
});

function registerUser(login: string, password: string, confirm_password: string): boolean {
    if (!login || !password || !confirm_password) {
        alert('Empty Inputs');
        return false;
    }

    if (password != confirm_password) {
        alert('Password and confirm password are differents');
        return false;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = users.some(user => user.login === login);
    if (userExists) {
        alert('User already exists');
        return false;
    }

    const newUser: User = { login, password };
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

const registerForm = document.getElementById('register-form') as HTMLFormElement;
registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input_register_login = (document.getElementById('input-register-login') as HTMLInputElement).value;
    const input_register_password = (document.getElementById('input-register-password') as HTMLInputElement).value;
    const input_register_confirm_password = (document.getElementById('input-register-confirm-password') as HTMLInputElement).value;

    if (registerUser(input_register_login, input_register_password, input_register_confirm_password)) {
        clearInputs('register-form');
        register_modal?.classList.add('hidden');
        window.location.href = 'home.html';
    }
});