import config from 'config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export function signJwt(object: Record<string, unknown>, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}
export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey) as JwtPayload;
    return {
      valid: true,
      expired: false,
      decoded: decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
}
