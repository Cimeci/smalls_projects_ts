document.addEventListener('DOMContentLoaded', () => {
	const navbar = document.getElementById('navbar');
	const btn_navbar = document.getElementById('btn-navbar') as HTMLButtonElement;
	const shop = document.getElementById('div-shop') as HTMLDivElement
	const inventory = document.getElementById('div-inventory') as HTMLDivElement

	btn_navbar?.addEventListener('click', () => {
		navbar?.classList.toggle('visible');
	});

    function closeAllWindows() {
        navbar?.classList.remove('visible');
        shop?.classList.remove('visible');
        inventory?.classList.remove('visible');
    }

    function toggleWindow(element: HTMLElement | null) {
        if (element?.classList.contains('visible')) {
            closeAllWindows();
        } else {
            closeAllWindows();
            element?.classList.add('visible');
        }
    }

	const btn_game_navbar = document.getElementById('btn-game-navbar') as HTMLButtonElement
	const btn_shop_navbar = document.getElementById('btn-shop-navbar') as HTMLButtonElement
	const btn_friends_navbar = document.getElementById('btn-friends-navbar') as HTMLButtonElement
	const btn_settings_navbar = document.getElementById('btn-settings-navbar') as HTMLButtonElement
	const btn_inventory_navbar = document.getElementById('btn-inventory-navbar') as HTMLButtonElement
	const btn_logout_navbar = document.getElementById('btn-logout-navbar') as HTMLButtonElement

    btn_game_navbar?.addEventListener('click', () => {
        // window.location.href = 'game.html';
		closeAllWindows();
    });
    
    btn_friends_navbar?.addEventListener('click', () => {
		closeAllWindows();
    });

    btn_shop_navbar?.addEventListener('click', () => {
		toggleWindow(shop);
    });


    btn_inventory_navbar?.addEventListener('click', () => {
		toggleWindow(inventory);
    });
    
    btn_settings_navbar?.addEventListener('click', () => {
		closeAllWindows();
    });

    btn_logout_navbar?.addEventListener('click', () => {
		closeAllWindows();
        window.location.href = 'index.html';
	});
});
