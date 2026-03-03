const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/produtos', productRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/pedidos', orderRoutes);
app.use('/api/pagamentos', paymentRoutes);

module.exports = app;