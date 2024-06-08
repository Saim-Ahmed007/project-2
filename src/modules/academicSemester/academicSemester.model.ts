import { Schema, model } from 'mongoose';
import {TAcademicSemester} from './academicSemester.interface';
import {
  Months,
  academicSemesterCode,
  academicSemesterName,
} from './academicSemester.constant';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: academicSemesterName,
      required: true,
    },

    code: {
      type: String, 
      enum: academicSemesterCode,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },

    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//check is same semester exist same year one semester exist for 1 year like autum is exist for 1 year
academicSemesterSchema.pre('save', async function (next) {
  const isSemseterExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemseterExist) {
    throw new AppError(httpStatus.NOT_FOUND,'Semester already exist !', '');
  } else {
    next();
  }
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
