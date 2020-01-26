import zxcvbn from 'zxcvbn';

const passwordValidation = (joi: any) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'password.base': '"{{#label}}" must be a strong password'
  },
  rules: {
    password: {
      validate(value: string, helpers: any) {
        const result = zxcvbn(value);
        if (result.score < 3) {
          return helpers.error('password.base');
        }

        return value;
      }
    }
  }
});

export default passwordValidation;
