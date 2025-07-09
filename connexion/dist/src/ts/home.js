"use strict";
const navbar = document.getElementById('navbar');
const btn_navbar = document.getElementById('btn-navbar');
const btn_game_navbar = document.getElementById('btn-game-navbar');
const btn_shop_navbar = document.getElementById('btn-shop-navbar');
const btn_friends_navbar = document.getElementById('btn-friends-navbar');
const btn_settings_navbar = document.getElementById('btn-settings-navbar');
const btn_credits_navbar = document.getElementById('btn-credits-navbar');
const btn_logout_navbar = document.getElementById('btn-logout-navbar');
// btn_navbar?.addEventListener('click', () => {
//     if (navbar && navbar.classList.contains('hidden')){
//         navbar.classList.remove('hidden');
//     }
//     else if (navbar) {
//         navbar.classList.add('hidden');
//     }
// });
btn_logout_navbar === null || btn_logout_navbar === void 0 ? void 0 : btn_logout_navbar.addEventListener('click', () => {
    window.location.href = 'index.html';
});
btn_navbar === null || btn_navbar === void 0 ? void 0 : btn_navbar.addEventListener('click', () => {
    navbar === null || navbar === void 0 ? void 0 : navbar.classList.toggle('visible');
});
