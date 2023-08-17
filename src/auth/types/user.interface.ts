export interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export type SafetyUser = Omit<IUser, 'password' | 'createdAt' | 'updatedAt'> & {
  createdAt: number;
  updatedAt: number;
};
