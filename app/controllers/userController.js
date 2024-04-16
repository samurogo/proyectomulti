// app/controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya está registrado." });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10); // 10 es el costo de hashing

        // Crear un nuevo usuario con la contraseña encriptada
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Usuario registrado exitosamente." });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Función para generar un token JWT
function generateToken(user) {
    const token = jwt.sign({ id: user._id, email: user.email }, 'clave_secreta', { expiresIn: '10h' });
    return token;
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "El usuario no está registrado." });
        }

        // Depuración: Imprimir la contraseña proporcionada y la contraseña almacenada
        console.log('Contraseña proporcionada:', password);
        console.log('Contraseña almacenada:', user.password);

        // Verificar la contraseña
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        // Generar token JWT
        const token = generateToken(user);

        res.status(200).json({ 
            token,
            userId: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        res.json(user);
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Actualizar un usuario por su ID
exports.updateUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        res.json({ message: "Usuario actualizado exitosamente.", updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Verificar si el usuario existe en la base de datos
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "El usuario no existe." });
        }

        // Eliminar el usuario
        await user.remove();

        res.status(200).json({ message: "Usuario eliminado exitosamente." });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};
