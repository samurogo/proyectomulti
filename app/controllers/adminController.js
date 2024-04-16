const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo administrador
exports.registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el administrador ya está registrado
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "El administrador ya está registrado." });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo administrador con la contraseña encriptada
        const newAdmin = new Admin({ username, email, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: "Administrador registrado exitosamente." });
    } catch (error) {
        console.error("Error al registrar administrador:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Función para generar un token JWT para el administrador
function generateAdminToken(admin) {
    const token = jwt.sign({ id: admin._id, email: admin.email }, 'clave_secreta', { expiresIn: '10h' });
    return token;
}

// Función para iniciar sesión como administrador
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el administrador existe en la base de datos
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "El administrador no está registrado." });
        }

        // Verificar la contraseña
        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        // Generar token JWT
        const token = generateAdminToken(admin);

         // Devolver los datos del administrador junto con el token
        res.status(200).json({ token, admin: { username: admin.username, email: admin.email, rol: admin.rol } });
    } catch (error) {
        console.error("Error al iniciar sesión como administrador:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Obtener todos los administradores
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un administrador por su ID
exports.getAdminById = async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Administrador no encontrado." });
        }
        res.json(admin);
    } catch (error) {
        console.error("Error al obtener administrador por ID:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Eliminar un administrador por su ID
exports.deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Administrador no encontrado." });
        }
        await admin.remove();
        res.status(200).json({ message: "Administrador eliminado exitosamente." });
    } catch (error) {
        console.error("Error al eliminar administrador:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};