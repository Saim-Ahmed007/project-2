import { Types } from 'mongoose';

export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TStudent = {
  id: string;
  user : Types.ObjectId;
  name: UserName;
  gender: 'male' | 'female' | 'other';
  email: string;
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  gurdian: Gurdian;
  profileImage?: string;
  isDeleted: boolean;
  admissionSemester : Types.ObjectId;
};
