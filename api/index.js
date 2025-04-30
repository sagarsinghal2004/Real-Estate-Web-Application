import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();

  // const allowedOrigins = ['https://estateverse.vercel.app']; 

const app = express();

// const prodOrigin = [process.env.ORIGIN]; // Replace with your actual frontend domain
// const devOrigin = ['http://localhost:5173']
// const allowedOrigins = process.env.NODE_ENV === 'production' ? prodOrigin : devOrigin;
//   app.use(cors({
//     origin: (origin, callback) => {
//       if(allowedOrigins.includes(origin)){
//         console.log(origin, allowedOrigins)
//         callback(null, true);
//       }else{
//         callback(new Error('Not allowed by cors'));
//       }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   }));

app.use(cors());
// app.use(cors({
//   origin: 'https://estateverse.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowHeaders: ['Content-Type']
// }));
 
app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
