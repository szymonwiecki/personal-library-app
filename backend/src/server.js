console.log('ENV:', process.env.MONGO_URI);

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');



const app = express();

// połączenie z bazą
connectDB();



// middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/books', bookRoutes);

// testowy endpoint
app.get('/', (req, res) => {
  res.send('📚 Personal Library API działa!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server działa na porcie ${PORT}`);
});

