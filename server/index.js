import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fsPromise from 'fs/promises';

import Mail from './mail.js'

const pathDataBase = './database/database.json';

const app = express()

app.use(cors());

app.use(bodyParser.json())

app.get('/', (req, res) => res.send(`Requested from ${req.hostname} : <h1>Hello World</h1>`))

app.post('/mail', async (req, res) => {
    const {name, email, message} = req.body;
    return res.json({ result: await Mail.send(name, email, message) })
})

app.post('/mailing', async (req, res) => {
    const data = req.body;

    try {
        const existingData = await fsPromise.readFile(pathDataBase, null, 2);
            
        const dataArray = JSON.parse(existingData); 
        dataArray.push(data);
        
        const jsonData = JSON.stringify(dataArray, null, 2);

        fsPromise.writeFile(pathDataBase, jsonData);
        res.status(200).send('JSON-файл успешно записан');
    } catch(error) {
        res.status(500).send('Ошибка записи файла JSON');
        throw error;
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port : ${process.env.PORT || 3000}`)
})