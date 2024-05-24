import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.joi.validation';
import {z} from 'zod';
import StudentValidationSchema from './student.zod.validation';



const createStudent = async (req: Request, res: Response) => {
  try {


    const { student: StudentData } = req.body;

    //data validation using joi
    //const {error, value} = studentValidationSchema.validate(StudentData)

    //data validation using zod
    const zodParsedData = StudentValidationSchema.parse(StudentData)

     //will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);
  //  if(error){
  //   res.status(500).json({
  //     success : false,
  //     message : 'something went wrong',
  //     error : error.details
  //   })
  //  }
     
    //send response
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentID);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'student found successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
  })
}
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentID);
    res.status(200).json({
      success: true,
      message: 'student deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
  })
}
};

export const StudentController = {
  createStudent,
  getStudents,
  getSingleStudent,
  deleteStudent
};
