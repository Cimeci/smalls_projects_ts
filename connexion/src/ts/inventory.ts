import { User, Cosmetic } from './types';

class InventoryManager {
    private currentUser: User | null;

    constructor() {
        this.currentUser = this.getCurrentUser();
        this.initInventory();
        this.setupEventListeners();
    }

    private getCurrentUser(): User | null {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    private initInventory(): void {
        if (!this.currentUser) return;

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

    private setupEventListeners(): void {
        // Boutons "Changer"
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            
            if (target.classList.contains('btn-change')) {
                const type = target.closest('.equipment-box')?.getAttribute('data-type');
                if (type) this.showInventoryForType(type as 'bar' | 'ball');
            }
            
            if (target.classList.contains('btn-equip')) {
                const itemId = target.closest('.inventory-item')?.getAttribute('data-id');
                const type = target.closest('.inventory-item')?.getAttribute('data-type');
                if (itemId && type) this.equipItem(itemId, type as 'bar' | 'ball');
            }
            
            if (target.id === 'btn-back-inventory') {
                this.showCurrentEquipment();
            }
        });
    }

    private showInventoryForType(type: 'bar' | 'ball'): void {
        if (!this.currentUser) return;

        // Masquer l'équipement actuel
        document.querySelector('.current-equipment')?.classList.add('hidden');
        
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

    private equipItem(itemId: string, type: 'bar' | 'ball'): void {
        if (!this.currentUser) return;

        // Déséquiper l'item actuel du même type
        this.currentUser.cosmetics.forEach(item => {
            if (item.type === type) item.equipped = false;
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

    private showCurrentEquipment(): void {
        document.querySelector('.current-equipment')?.classList.remove('hidden');
        document.getElementById('inventory-view')?.classList.add('hidden');
    }

    private updateCurrentEquipmentDisplay(): void {
        if (!this.currentUser) return;

        // Trouver les items équipés
        const equippedBar = this.currentUser.cosmetics.find(c => c.type === 'bar' && c.equipped);
        const equippedBall = this.currentUser.cosmetics.find(c => c.type === 'ball' && c.equipped);

        // Mettre à jour l'affichage
        if (equippedBar) {
            const barImg = document.getElementById('current-bar-img') as HTMLImageElement;
            const barName = document.getElementById('current-bar-name');
            if (barImg) barImg.src = equippedBar.imagePath;
            if (barName) barName.textContent = equippedBar.name;
        }

        if (equippedBall) {
            const ballImg = document.getElementById('current-ball-img') as HTMLImageElement;
            const ballName = document.getElementById('current-ball-name');
            if (ballImg) ballImg.src = equippedBall.imagePath;
            if (ballName) ballName.textContent = equippedBall.name;
        }
    }

    private saveUser(): void {
        if (!this.currentUser) return;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        // Mettre à jour aussi dans la liste des users
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.login === this.currentUser?.login);
        if (userIndex !== -1) {
            users[userIndex] = this.currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

// Initialisation quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new InventoryManager();
    
    // Gestion du bouton d'inventaire dans la navbar
    document.getElementById('btn-inventory-navbar')?.addEventListener('click', () => {
        const inventoryDiv = document.getElementById('div-inventory');
        inventoryDiv?.classList.toggle('hidden');
    });
});