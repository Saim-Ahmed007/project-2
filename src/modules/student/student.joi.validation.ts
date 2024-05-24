import Joi from 'joi'
const userNameValidationSchema = Joi.object({
    firstName: Joi.string().required().trim().regex(/^[A-Z][a-z]*$/).messages({
      'string.pattern.base': '{#label} must start with an uppercase letter followed by lowercase letters',
      'any.required': '{#label} is required'
    }),
    middleName: Joi.string(),
    lastName: Joi.string().required().regex(/^[A-Za-z]+$/).messages({
      'string.pattern.base': '{#label} must only contain alphabets',
      'any.required': '{#label} is required'
    })
  });
  
  const gurdianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required()
  });
  
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required().messages({
      'any.required': 'Name is required'
    }),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({
      'any.only': '{#label} must be one of "male", "female", or "other"',
      'any.required': '{#label} is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),
    dateOfBirth: Joi.string(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').messages({
      'any.only': 'Blood group must be one of "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", or "O-"'
    }),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    gurdian: gurdianValidationSchema.required().messages({
      'any.required': 'Guardian information is required'
    }),
    profileImage: Joi.string(),
    isActive: Joi.string().valid('active', 'blocked').default('active')
  });

  export default studentValidationSchema