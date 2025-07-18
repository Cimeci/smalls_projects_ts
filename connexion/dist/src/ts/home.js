"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const btn_navbar = document.getElementById('btn-navbar');
    const shop = document.getElementById('div-shop');
    const inventory = document.getElementById('div-inventory');
    btn_navbar === null || btn_navbar === void 0 ? void 0 : btn_navbar.addEventListener('click', () => {
        navbar === null || navbar === void 0 ? void 0 : navbar.classList.toggle('visible');
    });
    function closeAllWindows() {
        navbar === null || navbar === void 0 ? void 0 : navbar.classList.remove('visible');
        shop === null || shop === void 0 ? void 0 : shop.classList.remove('visible');
        inventory === null || inventory === void 0 ? void 0 : inventory.classList.remove('visible');
    }
    function toggleWindow(element) {
        if (element === null || element === void 0 ? void 0 : element.classList.contains('visible')) {
            closeAllWindows();
        }
        else {
            closeAllWindows();
            element === null || element === void 0 ? void 0 : element.classList.add('visible');
        }
    }
    const btn_game_navbar = document.getElementById('btn-game-navbar');
    const btn_shop_navbar = document.getElementById('btn-shop-navbar');
    const btn_friends_navbar = document.getElementById('btn-friends-navbar');
    const btn_settings_navbar = document.getElementById('btn-settings-navbar');
    const btn_inventory_navbar = document.getElementById('btn-inventory-navbar');
    const btn_logout_navbar = document.getElementById('btn-logout-navbar');
    btn_game_navbar === null || btn_game_navbar === void 0 ? void 0 : btn_game_navbar.addEventListener('click', () => {
        // window.location.href = 'game.html';
        closeAllWindows();
    });
    btn_friends_navbar === null || btn_friends_navbar === void 0 ? void 0 : btn_friends_navbar.addEventListener('click', () => {
        closeAllWindows();
    });
    btn_shop_navbar === null || btn_shop_navbar === void 0 ? void 0 : btn_shop_navbar.addEventListener('click', () => {
        toggleWindow(shop);
    });
    btn_inventory_navbar === null || btn_inventory_navbar === void 0 ? void 0 : btn_inventory_navbar.addEventListener('click', () => {
        toggleWindow(inventory);
    });
    btn_settings_navbar === null || btn_settings_navbar === void 0 ? void 0 : btn_settings_navbar.addEventListener('click', () => {
        closeAllWindows();
    });
    btn_logout_navbar === null || btn_logout_navbar === void 0 ? void 0 : btn_logout_navbar.addEventListener('click', () => {
        closeAllWindows();
        window.location.href = 'index.html';
    });
});
