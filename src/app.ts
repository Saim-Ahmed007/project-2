import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import httpStatus from 'http-status';
import cors from 'cors';

import { UserRoutes } from './modules/user/user.route';
import {} from 'express';
import { academicSemesterRoutes } from './modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from './modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from './modules/academicDepartment/academicDepartment.route';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from './app/interface/error';
import config from './app/config';
import { handleZodError } from './app/errors/handleZodError';
import { handleValidationError } from './app/errors/handleValidationError';
import { handleCastError } from './app/errors/handleCastError';
import { handleDuplicateError } from './app/errors/handleDuplicateError';
import AppError from './app/errors/AppError';
import notFound from './app/middlewares/not found';
import { FacultyRoutes } from './modules/Faculty/faculty.route';
import { AdminRoutes } from './modules/Admin/admin.route';
import { StudentRoutes } from './modules/student/student.route';
import { CourseRoutes } from './modules/Course/course.router';
import { semesterRegistrationRoutes } from './modules/semesterRegistration/semesterRegistration.route';

const app = express();

// parsers
app.use(cors());
app.use(express.json());


//application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/faculties', FacultyRoutes);
app.use('/api/v1/admins', AdminRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semesters', academicSemesterRoutes);
app.use('/api/v1/academic-faculties', AcademicFacultyRoutes);
app.use('/api/v1/academic-departments', AcademicDepartmentRoutes);
app.use('/api/v1/courses', CourseRoutes);
app.use('/api/v1/semseter-registrations', semesterRegistrationRoutes);

//global error handler
const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'something went wrong';


  let errorSources:TErrorSource = [{
    path: '',
    message: 'Something went Wrong!'
  }]
  
  if(error instanceof ZodError){
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if(error?.name === "ValidationError"){
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if(error?.name === "CastError"){
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if(error?.code === 11000){
    const simplifiedError = handleDuplicateError(error)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if(error instanceof AppError){
    statusCode = error?.statusCode
    message = error.message
    errorSources = [{
      path : '',
      message : error?.message
    }]
  } else if(error instanceof Error){
    message = error.message
    errorSources = [{
      path : '',
      message : error?.message
    }]
  }
   //ultimate return
   return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error,
    stack: config.NODE_ENV === 'development' ? error?.stack : null
  });
 
};
app.use(globalErrorHandler);

const test = async(req: Request, res: Response)=>{
  
}
app.get('/',test)
app.use(notFound)

export default app;
