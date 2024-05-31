import { TStudent } from './student.interface';
import StudentModel from './../student.model';



const getStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
