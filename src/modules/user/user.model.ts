import { Schema, model, connect } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../app/config';
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
// userSchema.pre('save', async function (next) {
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// })

//post save middleware
userSchema.post('save', function(doc, next){
  doc.password = ''
  next()
})

export const UserModel = model<TUser>('User', userSchema);
