const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');


const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');
const jobRoutes = require('./routes/job.routes');


dotenv.config();


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const app = express();


app.use(express.json());


app.use('/auth', authRoutes);        
app.use('/admin', adminRoutes);     
app.use('/user', userRoutes);        
app.use('/jobs', jobRoutes);         

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Recruitment Management System API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});