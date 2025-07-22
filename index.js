const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
