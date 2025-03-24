import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import path from 'path';



// Routes
import authRoutes from './routes/auth.route.js'
import teacherDashboard from './routes/teacherDashboard.route.js'
import studentDashboard from './routes/studentDashboard.route.js'
import adminDashboard from './routes/adminDashboard.route.js'
import chatbotRoute from './routes/chatbot.route.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


app.use(express.json());
app.use(cookieParser());



app.use('/api/auth',authRoutes);
app.use('/api/teacher-dashboard',teacherDashboard);
app.use('/api/student-dashboard',studentDashboard);
app.use('/api/admin-dashboard',adminDashboard);
app.use('/api/chatbot',chatbotRoute);


if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'/frontend/dist')));

  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))});
}

app.listen(PORT, () => {
  console.log("Sever is running on http://localhost:" + PORT + "/api");
  connectDB();
});