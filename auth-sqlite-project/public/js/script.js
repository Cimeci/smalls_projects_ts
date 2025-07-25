document.addEventListener('DOMContentLoaded', () => {
    // Gestion des onglets
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Désactiver tous les onglets
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activer l'onglet sélectionné
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Gestion du formulaire d'inscription
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');
    
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showMessage(registerMessage, data.message, 'success');
                registerForm.reset();
            } else {
                showMessage(registerMessage, data.message, 'error');
            }
        } catch (error) {
            showMessage(registerMessage, 'Erreur lors de l\'inscription', 'error');
            console.error(error);
        }
    });
    
    // Gestion du formulaire de connexion
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showMessage(loginMessage, data.message, 'success');
                loginForm.reset();
                // Ici vous pourriez rediriger l'utilisateur ou stocker le token JWT
                console.log('Utilisateur connecté:', data.user);
            } else {
                showMessage(loginMessage, data.message, 'error');
            }
        } catch (error) {
            showMessage(loginMessage, 'Erreur lors de la connexion', 'error');
            console.error(error);
        }
    });
    
    // Fonction pour afficher les messages
    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = 'message ' + type;
    }
});