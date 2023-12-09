import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './router.js';

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

function startApp() {
    try {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port : ${process.env.PORT || 3000}`);
        })
    } catch (error) {
        console.log(error);
    }
} 

startApp();