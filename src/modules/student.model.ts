import { Schema, model, connect } from 'mongoose';
import { Gurdian, TStudent, UserName } from './student/student.interface';
import validator from 'validator';
import { strictObject } from 'zod';
import { string } from 'joi';
import AppError from '../app/errors/AppError';
import httpStatus from 'http-status';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    // validate : {
    //   validator : function(value:string){
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
    //     return  firstNameStr === value
    //   },
    //   message : "{VALUE} is not capitalize format",
    // }
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    // validate : {
    //   validator : (value:string) => validator.isAlpha(value),
    //   message : '{VALUE} is not valid'

    // }
  },
});

const gurdianSchema = new Schema<Gurdian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: true, unique: true },
    user : {
      type: Schema.Types.ObjectId,
      required: [true, 'user ID is required'],
      unique: true,
      ref: 'User'
    },
    name: {
      type: userNameSchema,
      required: [true, 'name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not supported',
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: { type: Date },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUES} is not supported',
      },
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    gurdian: {
      type: gurdianSchema,
      required: true,
    },
    profileImage: { type: String },

    admissionSemester :{
      type : Schema.Types.ObjectId,
      ref : 'AcademicSemester'
    },
    academicDepartment : {
      type : Schema.Types.ObjectId,
      ref : 'AcademicDepartment'
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// studentSchema.pre('save', async function(next){
//   const isStudentExist = await StudentModel.findOneAndUpdate({id : this.id})
//   if(!isStudentExist){
//     throw new AppError(httpStatus.NOT_FOUND, 'Student does not exist', '')
//   }
//   else{
//     next()
//   }
// })

studentSchema.virtual('fullname').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});


const StudentModel = model<TStudent>('Student', studentSchema);

export default StudentModel;
