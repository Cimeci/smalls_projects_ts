const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

// Initialisation de la base de données
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/db.sqlite'
});

// Définition du modèle User
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

// Méthode pour vérifier le mot de passe
User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Synchronisation du modèle avec la base de données
sequelize.sync()
    .then(() => {
        console.log('Base de données synchronisée');
    })
    .catch(err => {
        console.error('Erreur de synchronisation:', err);
    });

module.exports = User;