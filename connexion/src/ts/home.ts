const navbar = document.getElementById('navbar')
const btn_navbar = document.getElementById('btn-navbar') as HTMLButtonElement

const btn_game_navbar = document.getElementById('btn-game-navbar') as HTMLButtonElement
const btn_shop_navbar = document.getElementById('btn-shop-navbar') as HTMLButtonElement
const btn_friends_navbar = document.getElementById('btn-friends-navbar') as HTMLButtonElement
const btn_settings_navbar = document.getElementById('btn-settings-navbar') as HTMLButtonElement
const btn_credits_navbar = document.getElementById('btn-credits-navbar') as HTMLButtonElement
const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement

btn_navbar?.addEventListener('click', () => {
    if (navbar){
        navbar.classList.remove('hidden')
    }
})