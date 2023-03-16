require("dotenv").config();
const express = require("express");
const db = require("./Server/db");
const fileUpload = require('express-fileupload');
const download = require('image-downloader')
const cors = require("cors");
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const apiRouter = require("./apiRouter");
const MainRouter = require("./Server/Main/router");

const path = require('path');

// Getting the port number from env. variables or setting it to 5000 by default
// const port = process.env.PORT || 5000;
const port = process.env.PORT || 27017;
// Using express module to create the app
const app = express();

// Attempting to connect to the database
db.connect();

// Applying middlewre of helmet, CORS, JSON parser, and Cookie parser(Signs cookies with a key)
app.use(helmet());
// app.use(cors({origin: true,credentials: true}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(fileUpload());

app.use(cors({
  origin: ['https://bitbrowze.com', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionSuccessStatus: 200,
}));

// Attaching routers to the applications
app.use("/api/", apiRouter);
app.use("/main/", MainRouter);

// Handles any requests that don't match the ones above
app.use('/real-t', express.static(path.join(__dirname, 'Client/Real-T/build')));
app.get('/real-t/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/Client/Real-T/build/index.html'));
});

app.use('/xeries', express.static(path.join(__dirname, 'Client/Xeries/build')));
app.get('/xeries/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/Client/Xeries/build/index.html'));
});

app.use('/copyright', express.static(path.join(__dirname, 'Client/Copyright/build')));
app.get('/copyright/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/Client/Copyright/build/index.html'));
});

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(express.static(path.join(__dirname, 'Main_site')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/Main_site/Bitbrowze.html'));
});

// Upload Endpoint for local file
app.post('/uploadImage', (req, res) => {
  try{
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
    file.name = Date.now()+ '_' +file.name
    const imagePath = `${__dirname}/Client/Xeries/build/${file.name}`
    file.mv(imagePath, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
     res.json({ fileName: file.name, filePath: `https://bitbrowze.com/Xeries/${file.name}` })    
    });  
  }catch(e){
    res.json({error:e})
  }
});

// upload endpoint for an url link

app.post('/downloadImage',(req, res) => {

  const url = req.body.url;
  paramArr = url.split('/')
  const fileName = paramArr[paramArr.length-1]
  
  const options = {
    url: url,
    dest: `${__dirname}/Client/Xeries/build/${Date.now()+fileName}`
  }
   
  async function downloadIMG() {
    try {
      const { filename, image } = await download.image(options)
      console.log('download')
      return filename
      
    } catch (e) {
      console.error(e)
    }
  }


 downloadIMG()
 .then(r => res.json({fileName: r}))
  
})

// Starting listening
app.listen(port, (err) => {
  if (!err) console.log("started server successfully");
});
