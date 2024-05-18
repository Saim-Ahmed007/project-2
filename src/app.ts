import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// parsers
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Root hitted successfully' });
});

app.post('/create-student', (req: Request, res: Response) => {
  try {
    var studentData = req.body;

    res.status(200).json({
      success: true,
      data: studentData,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

export default app;
