import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";



// Routes
import authRoutes from './routes/auth.route.js'
import teacherDashboard from './routes/teacherDashboard.route.js'
import studentDashboard from './routes/studentDashboard.route.js'
import adminDashboard from './routes/adminDashboard.route.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRoutes);
app.use('/api/teacher-dashboard',teacherDashboard);
app.use('/api/student-dashboard',studentDashboard);
app.use('/api/admin-dashboard',adminDashboard);




app.listen(PORT, () => {
  console.log("Sever is running on http://localhost:" + PORT + "/api");
  connectDB();
});