import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import OpenAI from "openai"
import dotenv from "dotenv"
import connectToMongoDb from "./db/dbConnection.js"
import Images from "./models/dalle.model.js"
import axios from "axios"
import fs from 'fs'
import bcrypt from "bcryptjs"

dotenv.config()

const app = express()
app.use(express.static('public'));

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API
})

app.use(cors())
app.use(bodyParser.json())

const downloadImage = async(url, localPath)=>{
    try {
        const response = await axios.get(url, { responseType: 'stream' });
        const writer = fs.createWriteStream(localPath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('Error downloading image:', error);
        throw error;
    }
}



app.post("/receivePrompt",async (req,res)=>{

    const prompt = req.body.prompt;
    const response = await openai.images.generate({prompt})

    var filename = prompt.replace(/\s/g,'-');
    filename = filename.replace(/\./g, "");
    const imageUrl = response.data[0].url
    const localPath = "./public/" + filename +".png"

    downloadImage(imageUrl, localPath)
    .then(() => {
        console.log('Image downloaded successfully.');
    })
    .catch((error) => {
        console.error('Error downloading image:', error);
    });

    const newImage = await Images({
        username : req.body.name,
        imageUrl : response.data[0].url,
        filePath : filename + ".png"
    })
    await newImage.save()

    res.send({imageData : response.data[0].url})
})

// app.post("/receivePrompt",async (req,res)=>{

//     const prompt = req.body.prompt;
//     console.log(prompt)
//     // const response = await openai.images.generate({prompt})

//     var result = prompt.replace(/\s/g,'-');
//     result = result.replace(/\./g, "");
//     console.log(result)
//     // const imageUrl = response.data[0].url
//     const localPath = "./public/" + result +".png"
//     console.log(localPath)

    // downloadImage(imageUrl, localPath)
    // .then(() => {
    //     console.log('Image downloaded successfully.');
    // })
    // .catch((error) => {
    //     console.error('Error downloading image:', error);
    // });

    // const newImage = await Images({
    //     username : req.body.name,
    //     imageUrl : localPath
    // })
    // await newImage.save()

    // res.send({imageData : response.data[0].url})
// })

app.post("/sendToCommunity",async (req,res)=>{

    const image = await Images.findOneAndUpdate({imageUrl : req.body.imageUrl},{community : true});
    await image.save()
    res.send({community : "Done"})    
})

app.get("/fetchImages",async (req,res)=>{

    const images = await Images.find();
    res.send({images})
    
})



app.get("/",(req,res)=>{
    res.send("Server")
})

app.listen(5000,()=>{
    console.log("Sever started on port 5000")
    connectToMongoDb();
})