import { User } from './types';

document.addEventListener('DOMContentLoaded', () => {

                const btn_buy_fire_bar = document.getElementById('btn-buy-fire-bar') as HTMLButtonElement
                const btn_buy_ice_bar = document.getElementById('btn-buy-ice-bar') as HTMLButtonElement
                // const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement
                // const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement
                // const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement
                // const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement
                // const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement


function getCurrentUser(): User | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

function updateWalletDisplay(): void {
    const user = getCurrentUser();
    const walletDisplay = document.getElementById('wallet-amount');
    
    if (walletDisplay && user) {
        walletDisplay.textContent = user.wallet?.toString() || '0';
    }
}

document.addEventListener('DOMContentLoaded', updateWalletDisplay);

function addToWallet(amount: number): void {
    const user = getCurrentUser();
    if (!user) return;

    user.wallet = (user.wallet || 0) + amount;
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateWalletDisplay();

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.login === user.login);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

btn_buy_fire_bar?.addEventListener('click', () => {
    addToWallet(-50);
});

btn_buy_ice_bar?.addEventListener('click', () => {
    addToWallet(50);
});

});