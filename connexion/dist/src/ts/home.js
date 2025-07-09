"use strict";
const navbar = document.getElementById('navbar');
const btn_navbar = document.getElementById('btn-navbar');
const btn_game_navbar = document.getElementById('btn-game-navbar');
const btn_shop_navbar = document.getElementById('btn-shop-navbar');
const btn_friends_navbar = document.getElementById('btn-friends-navbar');
const btn_settings_navbar = document.getElementById('btn-settings-navbar');
const btn_credits_navbar = document.getElementById('btn-credits-navbar');
const btn_logout_navbar = document.getElementById('btn-logout-navbar');
btn_navbar === null || btn_navbar === void 0 ? void 0 : btn_navbar.addEventListener('click', () => {
    if (navbar) {
        navbar.classList.remove('hidden');
    }
});
