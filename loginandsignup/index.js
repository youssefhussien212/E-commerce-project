import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/user.js';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(cookieParser());
app.use("/auth", UserRouter);

mongoose.connect(process.env.MONGODB_URI);


// Change the port to avoid EADDRINUSE error
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Handle port already in use error
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is already in use`);
  } else {
    console.log(err);
  }
});
