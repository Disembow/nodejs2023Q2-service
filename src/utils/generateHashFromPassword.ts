import { genSalt, hash } from 'bcrypt';

const cryptSalt = Number(process.env.CRYPT_SALT) || 10;

export const generateHashFromPassword = async (password: string) => {
  const salt = await genSalt(cryptSalt);

  return await hash(password, salt);
};
