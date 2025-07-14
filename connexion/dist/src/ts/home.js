const navbar = document.getElementById('navbar'); // nav element
const btn_navbar = document.getElementById('btn-navbar');
const btn_game_navbar = document.getElementById('btn-game-navbar');
const btn_shop_navbar = document.getElementById('btn-shop-navbar');
const btn_friends_navbar = document.getElementById('btn-friends-navbar');
const btn_settings_navbar = document.getElementById('btn-settings-navbar');
const btn_credits_navbar = document.getElementById('btn-credits-navbar');
const btn_logout_navbar = document.getElementById('btn-logout-navbar');
const shop = document.getElementById('div-shop');
btn_game_navbar === null || btn_game_navbar === void 0 ? void 0 : btn_game_navbar.addEventListener('click', () => {
    window.location.href = 'game.html';
});
btn_shop_navbar === null || btn_shop_navbar === void 0 ? void 0 : btn_shop_navbar.addEventListener('click', () => {
    shop === null || shop === void 0 ? void 0 : shop.classList.toggle('visible');
    navbar === null || navbar === void 0 ? void 0 : navbar.classList.remove('visible');
});
btn_friends_navbar === null || btn_friends_navbar === void 0 ? void 0 : btn_friends_navbar.addEventListener('click', () => {
    window.location.href = 'friends.html';
});
btn_settings_navbar === null || btn_settings_navbar === void 0 ? void 0 : btn_settings_navbar.addEventListener('click', () => {
    window.location.href = 'settings.html';
});
btn_credits_navbar === null || btn_credits_navbar === void 0 ? void 0 : btn_credits_navbar.addEventListener('click', () => {
    window.location.href = 'credits.html';
});
btn_logout_navbar === null || btn_logout_navbar === void 0 ? void 0 : btn_logout_navbar.addEventListener('click', () => {
    window.location.href = 'index.html';
});
btn_navbar === null || btn_navbar === void 0 ? void 0 : btn_navbar.addEventListener('click', () => {
    navbar === null || navbar === void 0 ? void 0 : navbar.classList.toggle('visible');
});
export {};
