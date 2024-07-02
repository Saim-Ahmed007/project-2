import { Schema, model, connect } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../app/config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    passwordChangedAt: { type: Date },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'faculty', 'student'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

//pre save middleware hook
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post save middleware
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};
userSchema.statics.isUserDeleted = async function (isDeleted: boolean) {
  return await User.findOne({ isDeleted });
};
userSchema.statics.isUserBlocked = async function (status: string) {
  return await User.findOne({ status });
};
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};
userSchema.statics.isJwtIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp:Date,
  jwtIssuedTimestamp:number,
) {
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime()/1000
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
