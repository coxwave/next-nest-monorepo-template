import jwt from 'jsonwebtoken';

interface SignTokenOption {
  expiresIn?: string | number;
}
export const signToken = (payload: object, secret: string, options?: SignTokenOption) => {
  return jwt.sign(payload, secret, { ...options });
};

interface VerifyTokenOption {
  ignoreExpired?: boolean;
}
export const verifyToken = <T extends object = any>(
  token: string,
  secret: string,
  options?: VerifyTokenOption,
): T => {
  try {
    return jwt.verify(token, secret) as jwt.JwtPayload as T;
  } catch (err) {
    if ((err as Error).name === 'TokenExpiredError') {
      if (options?.ignoreExpired) {
        return jwt.decode(token) as jwt.JwtPayload as T;
      }

      throw new Error('TOKEN_EXPIRED');
    }

    throw new Error('INVALID_TOKEN');
  }
};

export const renewToken = (token: string, secret: string): string => {
  const payload = verifyToken(token, secret, { ignoreExpired: true });
  return signToken(payload, secret);
};
