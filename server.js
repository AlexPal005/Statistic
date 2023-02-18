import express from 'express';
import mainRoutes from './routes/main.js';
import authRoutes from './routes/auth.js';
import pollsRoutes from './routes/account.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use('/api/main', mainRoutes );
app.use('/api/auth', authRoutes );
app.use('/api/polls', pollsRoutes);

//start server
app.listen(PORT, (err) => {
    if(err){
        console.log(err)
    }
    console.log(`Server started on port ${PORT}`);
});

