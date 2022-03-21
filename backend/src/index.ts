import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { routes } from './routes';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
dotenv.config();

createConnection()
  .then(conn => {
    console.log(conn.driver.database + ' is connected...');
    const PORT = process.env.PORT || 5000;
    const app = express();
    app.use(express.json());

    app.use(cookieParser());

    app.use(
      cors({
        credentials: true,
        origin: ['http://localhost:3000'],
      })
    );

    routes(app);

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
