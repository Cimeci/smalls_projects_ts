document.addEventListener('DOMContentLoaded', () => {
    const currentUser = getCurrentUser();
    initInventory(currentUser);
    setupEventListeners();
});
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}
function initInventory(user) {
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
function setupEventListeners() {
    document.querySelectorAll('.btn-change').forEach(button => {
        button.addEventListener('click', (e) => {
            var _a;
            const type = (_a = e.currentTarget.closest('.equipment-box')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-type');
            if (type)
                showInventoryForType(type);
        });
    });
    document.addEventListener('click', (e) => {
        var _a, _b;
        const target = e.target;
        if (target.classList.contains('btn-equip')) {
            const itemId = (_a = target.closest('.inventory-item')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-id');
            const type = (_b = target.closest('.inventory-item')) === null || _b === void 0 ? void 0 : _b.getAttribute('data-type');
            if (itemId && type)
                equipItem(itemId, type);
        }
    });
    const backButton = document.getElementById('btn-back-inventory');
    backButton === null || backButton === void 0 ? void 0 : backButton.addEventListener('click', showCurrentEquipment);
}
function showInventoryForType(type) {
    var _a;
    const user = getCurrentUser();
    if (!user)
        return;
    (_a = document.querySelector('.current-equipment')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
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
function equipItem(itemId, type) {
    const user = getCurrentUser();
    if (!user)
        return;
    user.cosmetics.forEach(item => {
        if (item.type === type)
            item.equipped = false;
    });
    const itemToEquip = user.cosmetics.find(item => item.id === itemId);
    if (itemToEquip) {
        itemToEquip.equipped = true;
        saveUser(user);
        updateCurrentEquipmentDisplay(user);
        showInventoryForType(type); // Rafraîchir l'affichage
    }
}
function showCurrentEquipment() {
    var _a, _b;
    (_a = document.querySelector('.current-equipment')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    (_b = document.getElementById('inventory-view')) === null || _b === void 0 ? void 0 : _b.classList.add('hidden');
}
function updateCurrentEquipmentDisplay(user) {
    const equippedBar = user.cosmetics.find(c => c.type === 'bar' && c.equipped);
    if (equippedBar) {
        const barImg = document.getElementById('current-bar-img');
        const barName = document.getElementById('current-bar-name');
        if (barImg)
            barImg.src = equippedBar.imagePath;
        if (barName)
            barName.textContent = equippedBar.name;
    }
    const equippedBall = user.cosmetics.find(c => c.type === 'ball' && c.equipped);
    if (equippedBall) {
        const ballImg = document.getElementById('current-ball-img');
        const ballName = document.getElementById('current-ball-name');
        if (ballImg)
            ballImg.src = equippedBall.imagePath;
        if (ballName)
            ballName.textContent = equippedBall.name;
    }
}
function saveUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.login === (user === null || user === void 0 ? void 0 : user.login));
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
}
export {};
