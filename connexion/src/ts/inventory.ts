import { User, Cosmetic } from './types';

document.addEventListener('DOMContentLoaded', () => { 

	const currentUser = getCurrentUser();

	initInventory(currentUser);

	setupEventListeners();
});

function getCurrentUser(): User | null {
	const userData = localStorage.getItem('currentUser');
	return userData ? JSON.parse(userData) : null;
}

function initInventory(user : User | null): void {
	if (!user)
		return;
	if (!user.cosmetics || user.cosmetics.length === 0) {
		user.cosmetics = [
			{
				id: 'default-bar',
				name: 'Barre Défaut',
				type: 'bar',
				imagePath: 'img/default_bar.png',
				equipped: true
			},
			{
				id: 'default-ball',
				name: 'Balle Défaut',
				type: 'ball',
				imagePath: 'img/default_ball.png',
				equipped: true
			},
			{
				id: 'fire-bar',
				name: 'Barre de Feu',
				type: 'bar',
				imagePath: 'img/fire_bar.png',
				equipped: false
			},
			{
				id: 'ice-bar',
				name: 'Barre de Glace',
				type: 'bar',
				imagePath: 'img/ice_bar.png',
				equipped: false
			}
		];
		saveUser(user);
	}
	updateCurrentEquipmentDisplay(user);
}

function setupEventListeners(): void {
    document.querySelectorAll('.btn-change').forEach(button => {
        button.addEventListener('click', (e) => {
            const type = (e.currentTarget as HTMLElement).closest('.equipment-box')?.getAttribute('data-type');
            if (type)
				showInventoryForType(type as 'bar' | 'ball');
        });
    });
	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		if (target.classList.contains('btn-equip')) {
            const itemId = target.closest('.inventory-item')?.getAttribute('data-id');
            const type = target.closest('.inventory-item')?.getAttribute('data-type');
            if (itemId && type) equipItem(itemId, type as 'bar' | 'ball');
		}
	})

	const backButton = document.getElementById('btn-back-inventory');
    backButton?.addEventListener('click', showCurrentEquipment);
}

function showInventoryForType(type: 'bar' | 'ball'): void {
	const user = getCurrentUser();
	if (!user)
		return;

	document.querySelector('.current-equipment')?.classList.add('hidden');
	
	const inventoryView = document.getElementById('inventory-view');
	const inventoryTitle = document.getElementById('inventory-title');
	const inventoryGrid = document.getElementById('inventory-grid');
	
	if (inventoryView && inventoryTitle && inventoryGrid) {
		inventoryTitle.textContent = `INVENTAIRE - ${type.toUpperCase()}`;
		inventoryGrid.innerHTML = '';
		
		const items = user.cosmetics.filter(c => c.type === type);
		
		items.forEach(item => {
			const itemElement = document.createElement('div');
			itemElement.className = `inventory-item ${item.equipped ? 'equipped' : ''}`;
			itemElement.setAttribute('data-id', item.id);
			itemElement.setAttribute('data-type', item.type);
			
			itemElement.innerHTML = `
				<img src="${item.imagePath}" alt="${item.name}"/>
				<p>${item.name}</p>
				${!item.equipped ? `<button class="btn-equip">Équiper</button>` : ''}
			`;
			
			inventoryGrid.appendChild(itemElement);
		});
		
		inventoryView.classList.remove('hidden');
	}
}

function equipItem(itemId: string, type: 'bar' | 'ball'): void {
	const user = getCurrentUser();
	if (!user) return;

	user.cosmetics.forEach(item => {
		if (item.type === type) item.equipped = false;
	});

	const itemToEquip = user.cosmetics.find(item => item.id === itemId);
	if (itemToEquip) {
		itemToEquip.equipped = true;
		saveUser(user);
		updateCurrentEquipmentDisplay(user);
		showInventoryForType(type); // Rafraîchir l'affichage
	}
}

function showCurrentEquipment(): void {
	document.querySelector('.current-equipment')?.classList.remove('hidden');
	document.getElementById('inventory-view')?.classList.add('hidden');
}

function updateCurrentEquipmentDisplay(user: User): void {

	const equippedBar = user.cosmetics.find(c => c.type === 'bar' && c.equipped);
	if (equippedBar) {
		const barImg = document.getElementById('current-bar-img') as HTMLImageElement;
		const barName = document.getElementById('current-bar-name');
		if (barImg) barImg.src = equippedBar.imagePath;
		if (barName) barName.textContent = equippedBar.name;
	}
	
	const equippedBall = user.cosmetics.find(c => c.type === 'ball' && c.equipped);
	if (equippedBall) {
		const ballImg = document.getElementById('current-ball-img') as HTMLImageElement;
		const ballName = document.getElementById('current-ball-name');
		if (ballImg) ballImg.src = equippedBall.imagePath;
		if (ballName) ballName.textContent = equippedBall.name;
	}
}

function saveUser(user: User): void {
	localStorage.setItem('currentUser', JSON.stringify(user));
	
	const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
	const userIndex = users.findIndex(u => u.login === user?.login);
	if (userIndex !== -1) {
		users[userIndex] = user;
		localStorage.setItem('users', JSON.stringify(users));
	}
}