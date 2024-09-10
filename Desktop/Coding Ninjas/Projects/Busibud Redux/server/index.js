import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import product_router from './src/routes/products.routes.js';
import UserRoute from './src/routes/user.routes.js';
import OrderRouter from './src/routes/orders.routes.js';
import { connectToMongoDB } from './src/database/mongo_connection.js';

dotenv.config();

let PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hee')
})

// product router
app.use('/products',product_router);
app.use('/users',UserRoute);
app.use('/orders',OrderRouter);


const startServer = async () => {
    try {
        await connectToMongoDB();
        app.listen(PORT, () => {
            console.log(`Listening to port ${PORT}`);
        });
    } catch (err) {
        console.error('Error starting the server:', err);
    }
};

startServer();