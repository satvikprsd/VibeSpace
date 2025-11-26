import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './components/db.js';
import userRoutes from './routes/user.route.js';
import serverRoutes from './routes/server.route.js';
import authRoutes from './routes/auth.route.js';
import textChannelRoutes from './routes/text-channel.route.js';
import convoRoutes from './routes/convo.route.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: [process.env.FRONTEND_URL,'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(cors(corsOptions));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/servers', serverRoutes);
app.use('/api/v1/text-channels', textChannelRoutes);
app.use('/api/v1/convos', convoRoutes);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server at port ${PORT}`)
});
