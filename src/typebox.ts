import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

// Setup
const ajv = new Ajv({ allErrors: true, removeAdditional: true });
addFormats(ajv, ['email', 'time', 'uri'])
  .addKeyword('kind')
  .addKeyword('modifier');
addErrors(ajv);

// TypeBox
const User = Type.Object(
  {
    name: Type.String(),
    email: Type.String(),
  },
  {
    errorMessage: {
      properties: {
        name: 'current value is ${/name}',
      },
      required: {
        email: 'current value is ${/name}',
      },
      // additional,
      additionalProperties: 'not ',
    },
    additionalProperties: false,
  },
);

console.log(User);

const validate = ajv.compile(User);
let A = {
  name: 11,
  email: 'davedomain.coms',
  a: 1,
};
// Validate
const isValid = validate(A);

console.log(isValid);
console.log(validate.errors);
console.log(A);
