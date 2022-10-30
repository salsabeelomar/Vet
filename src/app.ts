import express, { Application, Request, Response } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import environment from './config/environment';
import cors from 'cors';
import router from './routes';
import { join } from 'path';
import CustomError from 'helpers/errorsHandling/CustomError';

class App {
  public app: Application;
  public nodeEnv: string;

  constructor() {
    this.app = express();
    this.nodeEnv = environment.nodeEnv;
    this.initializeMiddlwares();
  }

  private initializeMiddlwares(): void {
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(join(__dirname, '..', 'client', 'build')));
    this.app.use('/api/v1', router);

    this.app.use((err: CustomError, req: Request, res: Response) => {
      res.status(err.status).json({ msg: err.message });
    });
  }
}

const { app } = new App();

export default app;
