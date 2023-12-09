import Router from 'express';
import fsPromise from 'fs/promises';
import Mail from './mail.js';

const pathDataBase = './database/database.json';

const router = new Router();

router.post('/mail', async (req, res) => {
    const {name, email, message} = req.body;
    return res.json({ result: await Mail.send(name, email, message) })
})

router.post('/mailing', async (req, res) => {
    const data = req.body;

    try {
        const existingData = await fsPromise.readFile(pathDataBase, null, 2);
            
        const dataArray = JSON.parse(existingData); 
        dataArray.push(data);
        
        const jsonData = JSON.stringify(dataArray, null, 2);

        fsPromise.writeFile(pathDataBase, jsonData);
        res.status(200).send('JSON file has been writed');
    } catch(error) {
        res.status(500).send('JSON file hasn\'t been writed');
        throw error;
    }
})

export default router;