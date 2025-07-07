interface User {
    login: string;
    password: string;
}

function clearInputs(formId: string): void {
    const form = document.getElementById(formId) as HTMLFormElement;
    form?.reset();
}

const btn_login = document.getElementById('btn-login') as HTMLButtonElement
const login_modal = document.getElementById('login-modal')
const btn_register = document.getElementById('btn-register') as HTMLButtonElement
const register_modal = document.getElementById('register-modal')

btn_login?.addEventListener('click', () => {
    if (login_modal){
        login_modal.classList.remove('hidden');
        if (register_modal)
            register_modal.classList.add('hidden');
    }
});

const btn_close_login = document.getElementById('btn-close-login') as HTMLButtonElement
btn_close_login?.addEventListener('click', () => {
    if (login_modal)
        login_modal.classList.add('hidden');
});

function loginUser(login: string, password: string): boolean{
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

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
    alert("Success")
    return true;
}

const btn_send_login = document.getElementById('btn-send-login') as HTMLButtonElement
btn_send_login?.addEventListener('click', () => {
    const input_login_login = (document.getElementById('input-login-login') as HTMLInputElement).value;
    const input_login_password = (document.getElementById('input-login-password') as HTMLInputElement).value;

    if (loginUser(input_login_login, input_login_password)){
        console.log("connexion")
    }

})

btn_register?.addEventListener('click', () => {
    if (register_modal){
        register_modal.classList.remove('hidden');
        if (login_modal)
            login_modal.classList.add('hidden');
    }
});

const btn_close_register = document.getElementById('btn-close-register') as HTMLButtonElement
btn_close_register?.addEventListener('click', () => {
    if (register_modal)
        register_modal.classList.add('hidden');
});

function registerUser(login: string, password: string): boolean{
     const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = users.some(user => user.login === login);
    if (userExists) {
        alert('User already exists');
        return false;
    }

    const newUser: User = { login, password };
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));
    if (register_modal)
        register_modal.classList.add('hidden');
    return true;
}

const   btn_send_register = document.getElementById('btn-send-register') as HTMLButtonElement

btn_send_register?.addEventListener('click', () => {
    const input_register_login = (document.getElementById('input-register-login') as HTMLInputElement).value;
    const input_register_password = (document.getElementById('input-register-password') as HTMLInputElement).value;
    
    if (registerUser(input_register_login, input_register_password)) {
        alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
    }
})