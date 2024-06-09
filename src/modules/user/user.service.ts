import config from '../../app/config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import StudentModel from '../student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';

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


//create faculty
const createFacultyIntoDB = async(password: string, payload: TFaculty)=>{

  //create user object
  const userData : Partial<TUser> = {}

  //if password is not given use default password
  userData.password = password || (config.default_password as string)

  //set role 
  userData.role = 'faculty'

  //find academicDepartment info
  const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment)

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found', '');
  }

  const session = await mongoose.startSession()

  try{
    session.startTransaction()

    //set auto generated id
    userData.id = await generateFacultyId();

    //create a user (transction-1)
    // transction use er karone newUser array hoia jaibo
    const newUser = await UserModel.create([userData], {session})

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user', '');
    }
    //set id and _id as user
    payload.id = newUser[0].id; //embedding id
    payload.user = newUser[0]._id; //refference _id

    //create a faculty (transction-2)
    const newFaculty = await Faculty.create([payload], { session }); //array

    if (!newFaculty.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create faculty',
        '',
      );
    }
    await session.commitTransaction()
    await session.endSession()
    return newFaculty

  }catch(error:any){

    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)

  }
}

//create Admin
const createAdminIntoDB = async(password: string, payload: TAdmin)=>{

  //create user object
  const userData:Partial<TUser> = {}

  //if password is not given use default password
  userData.password = password || (config.default_password as string)

  //set admin role
  userData.role = 'admin'

  //start session
  const session = await mongoose.startSession()
  try{
    session.startTransaction()

    //set generated id
    userData.id = await generateAdminId();

    //create user transction-1
    const newUser = await UserModel.create([userData], {session})

    //create a admin
    if(!newUser.length){
      throw new AppError(httpStatus.BAD_REQUEST, "failed to create admin", '')
    }

    //set id and _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    //create admin transction-2
    const newAdmin = await Admin.create([payload], {session})

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin', '');
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin

  }catch(error :any){
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
}

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
