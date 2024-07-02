import { TStudent } from './student.interface';

import mongoose from 'mongoose';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { searchableFields } from './student.constant';
import StudentModel from './student.model';

const getStudentsFromDB = async (query: Record<string, unknown>) => {
  //{email : {$regex : query.searchTerm, $options : i}}
  // const searchableFields = ['email', 'name.firstname', 'presentAddress']

  // const queryObj = {...query} //copy
  // let searchTerm = '';
  // if(query?.searchTerm){
  //   searchTerm = query?.searchTerm as string
  // }
  // const searchQuery = StudentModel.find({
  //   $or :searchableItem.map((field)=>({
  //     [field] : {$regex : searchTerm, $options : 'i'}
  //   }))
  // })

  // //filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit','page','fields']
  // excludeFields.forEach((el)=> delete queryObj[el])

  // const filterQuery = searchQuery.find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicfaculty',
  //     },
  //   });

  //   let sort = '-createdAt'
  //   if(query.sort){
  //     sort = query.sort as string
  //   }
  //   const sortQuery =  filterQuery.sort(sort)

  //   //paginate query
  //   let limit = 1
  //   let page = 1
  //   let skip = 0
  //   if(query.limit){
  //     limit = Number(query.limit)
  //   }

  //   if(query.page){
  //     page = Number(query.page)
  //     skip = (page-1)*limit
  //   }
  //   const paginateQuery =  sortQuery.skip(skip)
  //   const limitQuery =  paginateQuery.limit(limit)

  //   //fields limiting
  //   //{fields : name,email}
  //   //it will be {field : name email}
  //    //limiting query
  //   let fields = '-__v'
  //   if(query.fields){
  //     fields = (query.fields as string).split(',').join(' ')
  //     console.log({fields});
  //   }
  //   const fieldQuery = await limitQuery.select(fields)

  // return fieldQuery;
  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicfaculty',
        },
      }),
    query,
  )
    .search(searchableFields)
    .filter()
    .paginate();
  // .fields()

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    });

  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, gurdian, ...remainingStudentData } = payload;
  const modifiedStudentData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
  to update non premmitive property 
  name.lastName = 'ahmed' name = keys
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudentData[`name.${key}`] = value;
    }
  }

  if (gurdian && Object.keys(gurdian).length) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedStudentData[`gurdian.${key}`] = value;
    }
  }

  const result = await StudentModel.findByIdAndUpdate(id, modifiedStudentData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await StudentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete student',
        '',
      );
    }

    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      { userId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user', '');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student', '');
  }
};



export const StudentServices = {
  getStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
