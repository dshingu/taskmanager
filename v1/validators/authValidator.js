const yup = require('yup');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const schemaValidator = yup.object({
    email: yup.string()
                .email('Not a valid email address.')
                .test('unique', '${value} is already taken.', asyncHandler(async (value, object) => {
                  const duplicate = await User.findOne({email:value}).select('-password').lean();
  
                  if (duplicate) {
                    return false;
                  }
                  return true;
                }))
                .test('whitespace', 'No whitespace(s) allowed.', (value, object) =>  !(/\s/.test(value)))
                .required(),
    password: yup.string()
                .min(8, "Should at least contain 8 characters.")
                .test('complex', 'Password is not strong enough.', (value, object) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(value))
                .required()
});

const resetSchemaValidator = yup.object({

  password: yup.string()
              .min(8, "Should at least contain 8 characters.")
              .test('complex', 'Password is not strong enough.', (value, object) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(value))
              .required(),
confirm_password: yup.string()
                    .oneOf([yup.ref('password'), null], 'Passwords must match.')
});



module.exports = {
  authValidator: schemaValidator,
  resetValidator: resetSchemaValidator
};
