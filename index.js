const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const cityRoutes = require('./routes/cityRoutes');
const dishRoutes = require('./routes/dishRoutes');
const districtRoutes = require('./routes/districtRoutes');
const evaluateDishesRoutes = require('./routes/evaluateDishesRoutes');
const evaluateResRoutes = require('./routes/evaluateResRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const dashboardRestRoutes = require('./routes/dashboardRestRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const db = require('./config/db');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Cho phép gọi từ frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Nếu bạn dùng cookie/token có xác thực
}));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/evaluate/dishes', evaluateDishesRoutes);
app.use('/api/evaluate/restaurants', evaluateResRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/restDashboard', dashboardRestRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
