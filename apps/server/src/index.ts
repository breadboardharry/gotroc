import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './routes/router';

const app = express();
const port = process.env.PORT || 3000;

app.use(router);

app.listen(port, () => {
  console.log(`[*] Server is running at http://localhost:${port}`);
});