import {z} from 'zod';

const UserValidationSchema = z.object({
  
  password : z.string({
    invalid_type_error: 'password must be string'
  }).max(20, {message : 'password not more than than 20 craracters'}),
})

export const UserValidation = {
    UserValidationSchema,
}