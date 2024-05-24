import { Student } from './student.interface';
import StudentModel from './../student.model';

const createStudentIntoDB = async (studentData: Student) => {
  //const result = await StudentModel.create(student);//static built in method

  const student = new StudentModel(studentData) //built in instance method
  const result =  await student.save()
  return result;
};

const getStudentsFromDB = async () => {
  const result = await StudentModel.find(); 
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id }, {isDeleted : true});
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
