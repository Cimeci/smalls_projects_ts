const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route d'inscription
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Créer un nouvel utilisateur
        const newUser = await User.create({ username, email, password });
        
        res.status(201).json({ 
            message: 'Utilisateur créé avec succès',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du compte' });
    }
});

// Route de connexion
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Trouver l'utilisateur
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérifier le mot de passe
        const isMatch = await user.validPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        res.json({ 
            message: 'Connexion réussie',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
});

module.exports = router;