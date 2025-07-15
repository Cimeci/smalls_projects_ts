"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const btn_navbar = document.getElementById('btn-navbar');
    btn_navbar === null || btn_navbar === void 0 ? void 0 : btn_navbar.addEventListener('click', () => {
        navbar === null || navbar === void 0 ? void 0 : navbar.classList.toggle('visible');
    });
    const btn_game_navbar = document.getElementById('btn-game-navbar');
    const btn_shop_navbar = document.getElementById('btn-shop-navbar');
    const btn_friends_navbar = document.getElementById('btn-friends-navbar');
    const btn_settings_navbar = document.getElementById('btn-settings-navbar');
    const btn_inventory_navbar = document.getElementById('btn-inventory-navbar');
    const btn_logout_navbar = document.getElementById('btn-logout-navbar');
    const shop = document.getElementById('div-shop');
    const inventory = document.getElementById('div-inventory');
    btn_game_navbar === null || btn_game_navbar === void 0 ? void 0 : btn_game_navbar.addEventListener('click', () => {
        window.location.href = 'game.html';
    });
    btn_friends_navbar === null || btn_friends_navbar === void 0 ? void 0 : btn_friends_navbar.addEventListener('click', () => {
        window.location.href = 'friends.html';
    });
    btn_shop_navbar === null || btn_shop_navbar === void 0 ? void 0 : btn_shop_navbar.addEventListener('click', () => {
        navbar === null || navbar === void 0 ? void 0 : navbar.classList.remove('visible');
        inventory === null || inventory === void 0 ? void 0 : inventory.classList.remove('visible');
        shop === null || shop === void 0 ? void 0 : shop.classList.toggle('visible');
    });
    btn_inventory_navbar === null || btn_inventory_navbar === void 0 ? void 0 : btn_inventory_navbar.addEventListener('click', () => {
        navbar === null || navbar === void 0 ? void 0 : navbar.classList.remove('visible');
        shop === null || shop === void 0 ? void 0 : shop.classList.remove('visible');
        inventory === null || inventory === void 0 ? void 0 : inventory.classList.toggle('visible');
    });
    btn_settings_navbar === null || btn_settings_navbar === void 0 ? void 0 : btn_settings_navbar.addEventListener('click', () => {
        window.location.href = 'settings.html';
    });
    btn_logout_navbar === null || btn_logout_navbar === void 0 ? void 0 : btn_logout_navbar.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
