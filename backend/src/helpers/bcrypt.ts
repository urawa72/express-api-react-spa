import bcrypt from 'bcrypt';

export const genHash = async (
  plainText: string,
  saltRounds = 10,
): Promise<string> => {
  return await bcrypt.hash(plainText, saltRounds);
};
