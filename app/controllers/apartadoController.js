const Apartado = require('../models/apartado');

exports.createApartado = async (req, res) => {
    try {
        const { nombre, precio, marca, talla, descripcion, productId, cantidad } = req.body;
        
        // Obtener el ID del usuario autenticado desde el token
        const userId = req.user.id; // Suponiendo que el ID del usuario se encuentra en req.user.id
        
        // Crear el nuevo apartado con el ID del usuario y la cantidad especificada
        const apartado = new Apartado({ 
            nombre, 
            precio, 
            marca, 
            talla, 
            descripcion, 
            cantidad,
            userId,
            productId // Asignar el ID del usuario al campo userId
        });
        
        await apartado.save();
        res.status(201).json({ message: 'Apartado creado exitosamente.' });
    } catch (error) {
        console.error("Error al crear apartado:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

exports.getApartados = async (req, res) => {
    try {
        const apartados = await Apartado.find(); // Obtener todos los apartados
        res.json(apartados);
    } catch (error) {
        console.error("Error al obtener los apartados:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

exports.getApartadoById = async (req, res) => {
    try {
        const apartadoId = req.params.id;
        const apartado = await Apartado.findById(apartadoId);
        if (!apartado) {
            return res.status(404).json({ message: "Apartado no encontrado." });
        }
        res.json(apartado);
    } catch (error) {
        console.error("Error al obtener apartado por ID:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

exports.updateApartadoById = async (req, res) => {
    try {
        const { nombre, precio, marca, talla, descripcion, cantidad } = req.body;
        const updatedFields = { nombre, precio, marca, talla, descripcion };
        if (cantidad !== undefined) {
            updatedFields.cantidad = cantidad;
        }
        const updatedApartado = await Apartado.findByIdAndUpdate(req.params.id, 
            updatedFields,
            { new: true }
        );
        if (!updatedApartado) {
            return res.status(404).json({ message: "Apartado no encontrado." });
        }
        res.json({ message: 'Apartado actualizado exitosamente.', updatedApartado });
    } catch (error) {
        console.error("Error al actualizar apartado por ID:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

exports.deleteApartadoById = async (req, res) => {
    try {
        const deletedApartado = await Apartado.findByIdAndDelete(req.params.id);
        if (!deletedApartado) {
            return res.status(404).json({ message: "Apartado no encontrado." });
        }
        res.json({ message: 'Apartado eliminado exitosamente.' });
    } catch (error) {
        console.error("Error al eliminar apartado por ID:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};
