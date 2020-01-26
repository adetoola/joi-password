import Joi from '@hapi/joi';

import passwordValidation from '../src';

const CustomJoi = Joi.extend(passwordValidation);

const schema = CustomJoi.object({
  password: CustomJoi.string().password()
});

describe('Joi Password Validation', () => {
  it('should fail if password is weak', () => {
    const { error } = schema.validate({
      password: 'r'
    });

    expect(error).toMatchSnapshot();
  });

  it('should pass when password is strong', () => {
    const { value } = schema.validate({
      password: 'r@@t !s Passw0r9'
    });

    expect(value).toMatchObject({
      password: 'r@@t !s Passw0r9'
    });
  });
});
