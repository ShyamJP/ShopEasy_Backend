import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { router } from './routes/index';
import { handleError } from './helpers/error';
dotenv.config();
import path from 'path';

const app = express();
const PORT = process.env.PORT;
// const avatarPath = 'E:/MERN_Projects/ShopEasy/ShopEasy_Backend/Images';
const avatarPath = path.join(__dirname + '/../' + '/Images');
console.log(avatarPath);

const corsOption = {
  credentials: true,
  origin: ['http://localhost:5173'],
};
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());

app.use('/', router);
app.use(handleError);

app.use('/avatar', express.static(avatarPath));

app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`);
});
