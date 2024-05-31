import express, { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status'
import cors from 'cors';
import { StudentRoutes } from './modules/student.route';
import { UserRoutes } from './modules/user/user.route';
import { } from 'express';
import { academicSemesterRoutes } from './modules/academicSemester/academicSemester.route';

const app = express();

// parsers
app.use(cors());
app.use(express.json());


//application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semesters', academicSemesterRoutes)

//global error handler
app.use((error:any, req:Request, res:Response, next: NextFunction)=>{
    const statusCode = 500
    const message = error.message || 'something went wrong'

    return res.status(statusCode).json({
        success : false,
        message,
        error: error
    })
})

//not found route
const notFound = (req:Request, res:Response)=>{
    return res.status(httpStatus.NOT_FOUND).json({
        success : false,
        message : 'API not found',
        error : ''
    })
}
app.use(notFound)

export default app;
