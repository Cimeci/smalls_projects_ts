import { User, Cosmetic } from './types';

document.addEventListener('DOMContentLoaded', () => {
    const btn_buy_fire_bar = document.getElementById('btn-buy-fire-bar') as HTMLButtonElement;
    const btn_buy_ice_bar = document.getElementById('btn-buy-ice-bar') as HTMLButtonElement;
    const btn_buy_work = document.getElementById('btn-buy-work') as HTMLButtonElement 

    const user = getCurrentUser();
    if (user && user.wallet === undefined) {
        user.wallet = 0;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    updateWalletDisplay();

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

    function addToWallet(button: HTMLButtonElement, amount: number, item?: Cosmetic): void {
        const user = getCurrentUser();
        if (!user) return;

        user.wallet = user.wallet || 0;

        // Si c'est un achat (montant négatif)
        if (amount < 0) {
            // Vérifier si l'utilisateur a déjà l'item
            if (item && user.cosmetics.some(c => c.id === item.id)) {
                alert('You already own this item!');
                return;
            }

            if (user.wallet < Math.abs(amount)) {
                triggerShake(button);
                return;
            }

            // Ajouter l'item à l'inventaire si c'est un achat
            if (item) {
                if (!user.cosmetics) user.cosmetics = [];
                user.cosmetics.push({...item, equipped: false});
            }
        }

        user.wallet += amount;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateWalletDisplay();

        // Mettre à jour la liste des users
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.login === user.login);
        if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem('users', JSON.stringify(users));
        }

        if (amount < 0 && item) {
            alert(`You bought ${item.name}!`);
        }
    }

    // Définir les items du shop
    const shopItems: Cosmetic[] = [
        {
            id: 'fire-bar',
            name: 'fire-bar',
            type: 'bar',
            imagePath: 'img/fire_bar.png',
            equipped: false,
            price: 50
        },
        {
            id: 'ice-bar',
            name: 'ice-bar',
            type: 'bar',
            imagePath: 'img/ice_bar.png',
            equipped: false,
            price: 50
        }
    ];

    btn_buy_fire_bar?.addEventListener('click', () => {
        addToWallet(btn_buy_fire_bar, -50, shopItems[0]);
    });

    btn_buy_ice_bar?.addEventListener('click', () => {
        addToWallet(btn_buy_ice_bar, -50, shopItems[1]);
    });

    btn_buy_work?.addEventListener('click', () => {
        addToWallet(btn_buy_work, 50, shopItems[2]);
    });

    function triggerShake(button: HTMLButtonElement) {
        button.classList.remove("button-error");
        void button.offsetWidth;
        button.classList.add("button-error");
    }
});