import config from '../../app/config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import StudentModel from '../student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';

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

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set auto id
    userData.id = await generateStudentId(admissionSemester);

    //create a user (transction-1)
    // transction use er karone newUser array hoia jaibo
    const newUser = await UserModel.create([userData], { session }); //array

    //create a user
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user', '');
    }
    //set id and _id as user
    payload.id = newUser[0].id; //embedding id
    payload.user = newUser[0]._id; //refference _id

    //create a student (transction-2)
    const newStudent = await StudentModel.create([payload], { session }); //array
    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create student',
        '',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create student',
      '',
    )
  }
};

export const UserServices = {
  createStudentIntoDB,
};
