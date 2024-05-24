import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/student.route';

const app = express();

// parsers
app.use(cors());
app.use(express.json());

//application routes
app.use('/api/v1/students', StudentRoutes);

export default app;
