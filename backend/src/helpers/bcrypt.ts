import bcrypt from 'bcrypt';

export const genHash = async (
  plainText: string,
  saltRounds = 10,
): Promise<string> => {
  return await bcrypt.hash(plainText, saltRounds);
};

export const comparePlainWithHash = async (
  plainText: string,
  encrypted: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainText, encrypted);
};
