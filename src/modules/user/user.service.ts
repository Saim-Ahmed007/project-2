import config from '../../app/config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import StudentModel from '../student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create user object
  const userData: Partial<TUser> = {};

  //if password is not given use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  //set auto id
  userData.id = await generateStudentId(admissionSemester);

  //create a user
  const newUser = await UserModel.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id and _id as user
    payload.id = newUser.id; //embedding id
    payload.user = newUser._id; //refference _id

    const newStudent = StudentModel.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
