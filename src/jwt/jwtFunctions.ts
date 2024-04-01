import { jwtOptions, jwtPayload, jwtSecret } from '@cTypes/jwtTypes';
import jwt from 'jsonwebtoken';

export class JwtFunctions {
  public sign = (payload: jwtPayload, secret: jwtSecret = "secret", options: jwtOptions  ) => {
    return jwt.sign(payload, secret, options);
  };

  public verify = (token: string, secret: jwtSecret = "secret") => {
    return jwt.verify(token, secret);
  }
}