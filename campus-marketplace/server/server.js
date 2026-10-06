require('dotenv').config();
const express=require('express');
const cors=require('cors');
const path=require('path');
const connectDB=require('./config/db');
const authRoutes=require('./routes/authRoutes');
const itemRoutes=require('./routes/itemRoutes');
const reportRoutes=require('./routes/reportRoutes');
const adminRoutes=require('./routes/adminRoutes');
const {notFound,errorHandler}=require('./middleware/error');
const app=express();
app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}));

app.use(express.json());app.use(express.urlencoded({extended:true}));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.get('/api/health',(req,res)=>res.json({success:true,message:'CampusMart API is running'}));
app.use('/api/auth',authRoutes);
app.use('/api/items',itemRoutes);
app.use('/api/reports',reportRoutes);
app.use('/api/admin',adminRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT||5000;
connectDB().then(()=>app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))).catch(err=>{console.error('Database connection failed',err.message);process.exit(1)});
