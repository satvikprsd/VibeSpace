import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './components/db.js';
import userRoutes from './routes/user.route.js';
import serverRoutes from './routes/server.route.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: [process.env.URL,'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(cors(corsOptions));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/server', serverRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server at port ${PORT}`)
});
