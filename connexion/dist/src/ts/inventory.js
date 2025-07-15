class InventoryManager {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.initInventory();
        this.setupEventListeners();
    }
    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }
    initInventory() {
        if (!this.currentUser)
            return;
        // Initialisation des cosmétiques par défaut si nécessaire
        if (!this.currentUser.cosmetics || this.currentUser.cosmetics.length === 0) {
            this.currentUser.cosmetics = [
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
            this.saveUser();
        }
        this.updateCurrentEquipmentDisplay();
    }
    setupEventListeners() {
        // Boutons "Changer"
        document.addEventListener('click', (e) => {
            var _a, _b, _c;
            const target = e.target;
            if (target.classList.contains('btn-change')) {
                const type = (_a = target.closest('.equipment-box')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-type');
                if (type)
                    this.showInventoryForType(type);
            }
            if (target.classList.contains('btn-equip')) {
                const itemId = (_b = target.closest('.inventory-item')) === null || _b === void 0 ? void 0 : _b.getAttribute('data-id');
                const type = (_c = target.closest('.inventory-item')) === null || _c === void 0 ? void 0 : _c.getAttribute('data-type');
                if (itemId && type)
                    this.equipItem(itemId, type);
            }
            if (target.id === 'btn-back-inventory') {
                this.showCurrentEquipment();
            }
        });
    }
    showInventoryForType(type) {
        var _a;
        if (!this.currentUser)
            return;
        // Masquer l'équipement actuel
        (_a = document.querySelector('.current-equipment')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        // Afficher l'inventaire
        const inventoryView = document.getElementById('inventory-view');
        const inventoryTitle = document.getElementById('inventory-title');
        const inventoryGrid = document.getElementById('inventory-grid');
        if (inventoryView && inventoryTitle && inventoryGrid) {
            inventoryTitle.textContent = `INVENTAIRE - ${type.toUpperCase()}`;
            inventoryGrid.innerHTML = '';
            // Filtrer les cosmétiques par type
            const items = this.currentUser.cosmetics.filter(c => c.type === type);
            // Ajouter chaque item à la grille
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
    equipItem(itemId, type) {
        if (!this.currentUser)
            return;
        // Déséquiper l'item actuel du même type
        this.currentUser.cosmetics.forEach(item => {
            if (item.type === type)
                item.equipped = false;
        });
        // Équiper le nouvel item
        const itemToEquip = this.currentUser.cosmetics.find(item => item.id === itemId);
        if (itemToEquip) {
            itemToEquip.equipped = true;
            this.saveUser();
            this.updateCurrentEquipmentDisplay();
            this.showInventoryForType(type); // Rafraîchir l'affichage
        }
    }
    showCurrentEquipment() {
        var _a, _b;
        (_a = document.querySelector('.current-equipment')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        (_b = document.getElementById('inventory-view')) === null || _b === void 0 ? void 0 : _b.classList.add('hidden');
    }
    updateCurrentEquipmentDisplay() {
        if (!this.currentUser)
            return;
        // Trouver les items équipés
        const equippedBar = this.currentUser.cosmetics.find(c => c.type === 'bar' && c.equipped);
        const equippedBall = this.currentUser.cosmetics.find(c => c.type === 'ball' && c.equipped);
        // Mettre à jour l'affichage
        if (equippedBar) {
            const barImg = document.getElementById('current-bar-img');
            const barName = document.getElementById('current-bar-name');
            if (barImg)
                barImg.src = equippedBar.imagePath;
            if (barName)
                barName.textContent = equippedBar.name;
        }
        if (equippedBall) {
            const ballImg = document.getElementById('current-ball-img');
            const ballName = document.getElementById('current-ball-name');
            if (ballImg)
                ballImg.src = equippedBall.imagePath;
            if (ballName)
                ballName.textContent = equippedBall.name;
        }
    }
    saveUser() {
        if (!this.currentUser)
            return;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        // Mettre à jour aussi dans la liste des users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => { var _a; return u.login === ((_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.login); });
        if (userIndex !== -1) {
            users[userIndex] = this.currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}
// Initialisation quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    new InventoryManager();
    // Gestion du bouton d'inventaire dans la navbar
    (_a = document.getElementById('btn-inventory-navbar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const inventoryDiv = document.getElementById('div-inventory');
        inventoryDiv === null || inventoryDiv === void 0 ? void 0 : inventoryDiv.classList.toggle('hidden');
    });
});
export {};
