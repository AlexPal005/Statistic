import express from 'express';
import mainRoutes from './routes/main.js';
import authRoutes from './routes/auth.js';
//import userRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/main', mainRoutes );
app.use('/api/auth', authRoutes );
//app.use('/api/users', userRoutes );

//start server
app.listen(PORT, (err) => {
    if(err){
        console.log(err)
    }
    console.log(`Server started on port ${PORT}`);
});

