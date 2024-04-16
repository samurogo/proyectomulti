const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
    try {
        const { descripcion, oferta, userId, productId } = req.body; // Obtener userId y productId del cuerpo de la solicitud
        const newComment = new Comment({ descripcion, oferta, userId, productId }); // Crear un nuevo comentario con userId y productId
        await newComment.save();
        res.status(201).json({ message: "Comentario creado exitosamente." });
    } catch (error) {
        console.error("Error al crear comentario:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado." });
        }
        res.json(comment);
    } catch (error) {
        console.error("Error al obtener comentario por ID:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

exports.updateCommentById = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { descripcion, oferta, userId, productId } = req.body; // Obtener userId y productId del cuerpo de la solicitud
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { descripcion, oferta, userId, productId }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: "Comentario no encontrado." });
        }
        res.json({ message: "Comentario actualizado exitosamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCommentById = async (req, res) => {
    try {
        const commentId = req.params.id;
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ message: "Comentario no encontrado." });
        }
        res.json({ message: "Comentario eliminado exitosamente." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};