import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import adminRouter from './routes/admin.js';
import apiRouter from './routes/api.js';
import cors from "cors";
app.use(cors());



dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 3000;


const uri = process.env.MONGODB_URI || process.env.MONGO_URI;


if (!uri) {
console.error('\
[ERROR] MONGODB_URI missing in .env');
process.exit(1);
}
mongoose
.connect(uri)
.then(() => console.log('MongoDB connected'))
.catch((err) => {
console.error('MongoDB connection error:', err.message);
process.exit(1);
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use(cors({
  origin: "*",   // allow all for now
  methods: ["GET", "POST", "PUT", "DELETE"]
}));



app.use((req, res) => {
if (req.originalUrl.startsWith('/api')) {
return res.status(404).json({ error: 'Not found' });
}
res.status(404).render('admin_home', { title: 'Not Found', message: 'Page not found.' });
});


app.listen(PORT, () => console.log(`Server running → http://localhost:${PORT}`));