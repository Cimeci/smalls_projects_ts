import { User } from './types';

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const btn_navbar = document.getElementById('btn-navbar') as HTMLButtonElement;
    
    btn_navbar?.addEventListener('click', () => {
        navbar?.classList.toggle('visible');
    });

    const btn_game_navbar = document.getElementById('btn-game-navbar') as HTMLButtonElement
    const btn_shop_navbar = document.getElementById('btn-shop-navbar') as HTMLButtonElement
    const btn_friends_navbar = document.getElementById('btn-friends-navbar') as HTMLButtonElement
    const btn_settings_navbar = document.getElementById('btn-settings-navbar') as HTMLButtonElement
    const btn_credits_navbar = document.getElementById('btn-credits-navbar') as HTMLButtonElement
    const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement
    const shop = document.getElementById('div-shop') as HTMLDivElement
    
    btn_game_navbar?.addEventListener('click', () => {
        window.location.href = 'game.html';
    });
    
    btn_shop_navbar?.addEventListener('click', () => {
        shop?.classList.toggle('visible');
        navbar?.classList.remove('visible');
    });
    
    btn_friends_navbar?.addEventListener('click', () => {
        window.location.href = 'friends.html';
    });
    
    btn_settings_navbar?.addEventListener('click', () => {
        window.location.href = 'settings.html';
    });
    
    btn_credits_navbar?.addEventListener('click', () => {
        window.location.href = 'credits.html';
    });
    
    btn_logout_navbar?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

});
