import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { router } from './resources/index.js';
// Importing socket server
import './resources/sockets/index.js'
// Configure env variables
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});