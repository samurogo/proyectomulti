// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const rateLimit = require('express-rate-limit');
const dbConfig = require('./app/config/database'); // Importamos la configuración de la base de datos
const mongoose = require('mongoose');
const userRoutes = require('./app/routes/userRoutes'); // Importamos userRoutes
const productRoutes = require('./app/routes/productRoutes');
const apartadoRoutes = require('./app/routes/apartadoRoutes');
const commentRoutes = require('./app/routes/commentRoutes');
const adminRoutes = require('./app/routes/adminRoutes');

// Construimos la URL de conexión usando la configuración
const url = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

// Conexión a la base de datos
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexión exitosa a MongoDB");
}).catch(err => {
    console.error("Error de conexión a MongoDB:", err);
    process.exit();
});

// Configuración para manejar la advertencia de deprecación
mongoose.set('strictQuery', false);

// Middleware
app.use(express.json());

// Definir los limitadores de tasa
const userLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 50000000000, // máximo 100 peticiones por IP durante el intervalo de tiempo
    message: "Demasiadas peticiones realizadas desde esta dirección IP, intenta nuevamente más tarde."
});

const productLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 50000000000, // máximo 50 peticiones por IP durante el intervalo de tiempo
    message: "Demasiadas peticiones realizadas desde esta dirección IP, intenta nuevamente más tarde."
});

const apartadoLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 50000000000,
    message: "Demasiadas peticiones realizadasa desde esta dirección IP, intenta nuevamente más tarde."
});

const commentLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 50000000000,
    message: "Demasiadas peticiones realizadas desde esta direccion IP, intenta nuevamente más tarde."
});

const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    message: "Demasiadas peticiones realizadas desde esta dirección IP, intenta nuevamente más tarde."
});

app.use(cors());
// Rutas
app.use('/api/user', userLimiter, userRoutes);
app.use('/api/product', productLimiter, productRoutes);
app.use('/api/apartado', apartadoLimiter, apartadoRoutes);
app.use('/api/comment', commentLimiter, commentRoutes);
app.use('/api/admin', adminRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));