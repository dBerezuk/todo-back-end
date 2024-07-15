import { Response } from 'express';
import { IError } from '../types/errors.types';

class WebError {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export class Unprocessable extends WebError {
  // использовать например - валидация дала ошибку
  constructor(message: string) {
    super(422, message);
  }
}

export class Conflict extends WebError {
  // использовать например - создания ресурса, который уже существует (примеры: email уже занят)
  constructor(error: string) {
    super(409, error);
  }
}

export class NotFound extends WebError {
  // использовать например - когда не найдено (пример: пользователь не найден)
  constructor(error: string) {
    super(404, error);
  }
}

export class Forbidden extends WebError {
  // использовать например - когда у пользователя нет прав на этот запрос
  constructor(error: string) {
    super(403, error);
  }
}

export class Unauthorized extends WebError {
  // использовать например - когда клиент не предоставил или предоставил неверные учетные данные для доступа к защищенному ресурсу (например истек токен или его нет)
  constructor(error: string) {
    super(401, error);
  }
}

export class BadRequest extends WebError {
  // использовать например - ошибка от сервера 400
  constructor(error: string) {
    super(400, error);
  }
}

class ErrorUtils {
  static catchError(res: Response, error: IError) {
    if (process.env.APP_DEV === 'true') console.error(error);

    return res.status(error.status || 500).json({
      error: error.message || 'Что-то пошло не так, попробуйте ещё раз',
    });
  }
}

export default ErrorUtils;
