import express, { response } from 'express';
import * as dotenv from 'dotenv';
import Configuration from 'openai';
import OpenAIApi from 'openai';

dotenv.config();

const router = express.Router();

const configuraiton = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuraiton);

router.route('/').get((req, res) => {
    res.send('Hello from DALL-E!!');
});

router.route('/').post(async(req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
    }
    catch (err) {
        console.log(error);
        res.status(500).send(error?.resposne.data.error.message)
    }
})

export default router;