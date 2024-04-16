const Product = require('../models/product');

// Función para obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const { name, price, brand, size } = req.body;
        const newProduct = new Product({ name, price, brand, size });
        await newProduct.save();
        res.status(201).json({ message: "Producto creado exitosamente.", product: newProduct });
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Función para obtener un producto por su ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }
        res.status(200).json({ product });
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Función para actualizar un producto por su ID
exports.updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, brand, size } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, { name, price, brand, size }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }
        res.status(200).json({ message: "Producto actualizado exitosamente.", product: updatedProduct });
    } catch (error) {
        console.error("Error al actualizar producto por ID:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Función para eliminar un producto por su ID
exports.deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }
        res.status(200).json({ message: "Producto eliminado exitosamente." });
    } catch (error) {
        console.error("Error al eliminar producto por ID:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};
