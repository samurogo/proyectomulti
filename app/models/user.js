// app/models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// Método para comparar la contraseña proporcionada con la contraseña almacenada
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema); // Modificar esta línea

module.exports = User; // Exportar el modelo User
