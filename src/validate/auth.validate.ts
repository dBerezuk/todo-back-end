import { body } from 'express-validator';
import userService from '../services/user.service';
import { IUserRequest } from '../types/user.types';

class AuthValidate {
  register() {
    return [
      body('email')
        .trim()
        .notEmpty()
        .withMessage('Введите ваш email')
        .isEmail()
        .withMessage('Enter correct email')
        .custom(async (value: IUserRequest['email']) => {
          const isUserWithCurrentEmail = !!(await userService.getByEmail(
            value
          ));

          if (isUserWithCurrentEmail)
            throw new Error('A user with this email already exists');
        }),
      body('password')
        .trim()
        .notEmpty()
        .withMessage('Введите пароль')
        .isLength({ min: 6 })
        .withMessage('Пароль должен быть не меньше 6 символов'),
    ];
  }
  login() {
    return [
      body('email').trim().notEmpty().withMessage('Введите ваш email'),
      body('password').trim().notEmpty().withMessage('Введите пароль'),
    ];
  }
}

export default new AuthValidate();
