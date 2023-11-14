import envVariables from '@Config/env-variables';
import * as bcrypt from 'bcrypt';

export async function encryptPassword(password: string): Promise<string> {
  const { jwt } = envVariables();
  return await bcrypt.hash(password, Number(jwt.salt));
}
