import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import './config';
import dbConnect from './db';
import authCheck from './middleware/authCheck';
import routes from './routes';

const PORT = process.env.APP_PORT || 3002;
const app = express();

const corsOptions = {
	origin: process.env.APP_CLIENT_URL,
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser(process.env.APP_KEY!));
app.use(authCheck);

dbConnect();

app.use('/api', routes);

app.listen(PORT, () => {
	console.log(`Server starting http://localhost:${PORT}`);
});
