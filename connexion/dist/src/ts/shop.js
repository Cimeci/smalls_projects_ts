document.addEventListener('DOMContentLoaded', () => {
    const btn_buy_fire_bar = document.getElementById('btn-buy-fire-bar');
    const btn_buy_ice_bar = document.getElementById('btn-buy-ice-bar');
    // const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement
    // const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement
    // const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement
    // const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement
    // const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement
    const user = getCurrentUser();
    if (user && user.wallet === undefined) {
        user.wallet = 0;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    updateWalletDisplay();
    function getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }
    function updateWalletDisplay() {
        var _a;
        const user = getCurrentUser();
        const walletDisplay = document.getElementById('wallet-amount');
        if (walletDisplay && user) {
            walletDisplay.textContent = ((_a = user.wallet) === null || _a === void 0 ? void 0 : _a.toString()) || '0';
        }
    }
    document.addEventListener('DOMContentLoaded', updateWalletDisplay);
    function addToWallet(button, amount) {
        const user = getCurrentUser();
        if (!user)
            return;
        user.wallet = user.wallet || 0;
        if (amount < 0 && user.wallet < Math.abs(amount)) {
            triggerShake(button);
            return;
        }
        user.wallet += amount;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateWalletDisplay();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.login === user.login);
        if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
    btn_buy_fire_bar === null || btn_buy_fire_bar === void 0 ? void 0 : btn_buy_fire_bar.addEventListener('click', () => {
        addToWallet(btn_buy_fire_bar, -50);
    });
    btn_buy_ice_bar === null || btn_buy_ice_bar === void 0 ? void 0 : btn_buy_ice_bar.addEventListener('click', () => {
        addToWallet(btn_buy_ice_bar, 25);
    });
    function triggerShake(button) {
        button.classList.remove("button-error");
        void button.offsetWidth;
        button.classList.add("button-error");
    }
});
export {};
